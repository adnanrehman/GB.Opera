using Commons;
using Companies;
using Dapper;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using OfficeOpenXml.Interfaces.Drawing.Text;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Volo.Abp.Application.Services;

namespace GB.Opera.OfficialsIndics
{
    public  class OfficialIndicsAppService : ApplicationService, IOfficialIndicsAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public OfficialIndicsAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<OfficialIndics>> GetOfficialIndics(DateTime PriceDate, Int16 StockMarketID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@Date", PriceDate, DbType.DateTime);
            parameters.Add("@StockMarketID ", StockMarketID, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<OfficialIndics>(
                sql: ProcedureNames.usp_getOfficialIndices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }
        public async Task<List<GulfbasePrices>> Getgulfbaseprices(DateTime PriceDate )
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@Date", PriceDate, DbType.DateTime);
            

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<GulfbasePrices>(
                sql: ProcedureNames.usp_getGBIndices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<List<GlobalIndices>> GetGlobalIndices(DateTime PriceDate)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@Date", PriceDate, DbType.DateTime);


            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<GlobalIndices>(
                sql: ProcedureNames.usp_getGlobalIndices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<List<MFundCompanies>>  GetMFundCompanies()
        {
            // Execute the stored procedure and retrieve MFundCompanies data using Dapper
            var data = (await _connection.QueryAsync<MFundCompanies>(
                sql: ProcedureNames.usp_getMFundCompanies, // Use the correct stored procedure name
                param: null,
                commandType: CommandType.StoredProcedure
            )).ToList();

            return data;
        }

        public async Task<List<MFunds>>  GetAllFunds(Int16 CompanyID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@CompanyID", CompanyID, DbType.Int16);


            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<MFunds>(
                sql: ProcedureNames.usp_getAllFunds,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }
        public async Task<List<MFundPrices>> GetAllFundPrices(Int64 MFundID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@MFundID", MFundID, DbType.Int16);


            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<MFundPrices>(
                sql: ProcedureNames.usp_getAllFundPrices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<string> ImportOfficialIndices(List<ImportOfficialIndicesDto> list)
        {
            _connection.Open();
            using (var transaction = _connection.BeginTransaction())
            {
                try
                {
                    var stockMarkets = await _connection.QueryAsync<StockMarketDto>($@"SELECT * FROM StockMarkets", transaction: transaction);
                    var Companies = await _connection.QueryAsync<SectorDto>($@"SELECT * FROM Sectors", transaction: transaction);


					foreach (var item in list)
					{
						if (!string.IsNullOrEmpty(item.Sector) && !string.IsNullOrEmpty(item.StockMarket))
						{
							var stockMarket = stockMarkets.Where(f => f.Abbr.ToUpper() == (item.StockMarket).ToUpper()).FirstOrDefault();
							if (stockMarket != null)
							{
								var ticker = Companies.Where(f => f.Sector.ToUpper() == (item.Sector).ToUpper()).FirstOrDefault();
								if (ticker != null)
								{
									var parameters = new DynamicParameters();
									parameters.Add("@StockMarket", item.StockMarket);
									parameters.Add("@Sector", item.Sector);
									parameters.Add("@Date", item.Date);
									parameters.Add("@Opening", item.Opening);
									parameters.Add("@Highest", item.Highest);
									parameters.Add("@Lowest", item.Lowest);
									parameters.Add("@Closing", item.Closing);
									parameters.Add("@Volume", item.Volume);
									parameters.Add("@Transactions", item.Transactions);
									parameters.Add("@TradingValue", item.TradingValue);
									parameters.Add("@PreviousClose", item.PreviousClose);
									parameters.Add("@LastUpdated", DateTime.Now);
									await _connection.ExecuteAsync(ProcedureNames.usp_InsertOfficialIndices, parameters, transaction: transaction, commandType: CommandType.StoredProcedure);
								}
								else
								{
									return $@"{item.Sector} not exist please first add this Sector";
									await transaction.RollbackAsync();
								}
							}
							else
							{
								return $@"{item.StockMarket} not exist please first add this Stock Market";
								await transaction.RollbackAsync();
							}
						}

					}
					await transaction.CommitAsync();
					return "1";
				}
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return ex.Message;
                }
            }

        }

        public async Task<string> ImportGlobalIndices(List<ImportGlobalIndicesDto> list)
        {
            
            _connection.Open();
            using (var transaction = _connection.BeginTransaction())
            {
                try
                {
						foreach (var item in list)
						{
						if (!string.IsNullOrEmpty(item.StockMarket))
						{
							var stockMarkets = await _connection.QueryAsync<StockMarketDto>($@"SELECT * FROM StockMarkets", transaction: transaction);
							var stockMarket = stockMarkets.Where(f => f.Abbr.ToUpper() == (item.StockMarket).ToUpper()).FirstOrDefault();
							if (stockMarket != null)
							{

								var parameters = new DynamicParameters();
								//parameters.Add("@StockMarket", worksheet.Cells[row, 2].Text);
								parameters.Add("@StockMarket", item.StockMarket);
								parameters.Add("@Date",item.Date);
								parameters.Add("@Open", item.Open);
								parameters.Add("@High", item.High);
								parameters.Add("@Low", item.Low);
								parameters.Add("@Close", item.Close);
								parameters.Add("@Volume", item.Volume);
								await _connection.ExecuteAsync(ProcedureNames.usp_InsertGlobalIndices, parameters, transaction: transaction, commandType: CommandType.StoredProcedure);

							}
							else
							{
								await transaction.RollbackAsync();
								return $@"{item.StockMarket} not exist please first add this Stock Market";
							}
						}

					}
					await transaction.CommitAsync();
					return "1";
				}
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return ex.Message;
                }
            }

        }
    }
}
