using Commons;
using Companies;
using Dapper;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            var data = await _connection.QueryAsync<MFundCompanies>(
                sql: ProcedureNames.usp_getMFundCompanies, // Use the correct stored procedure name
                param: null,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
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

        public async Task<string> ImportOfficialIndices(string filePath)
        {
            try
            {
                var stockMarkets = await _connection.QueryAsync<StockMarketDto>($@"SELECT * FROM StockMarkets");
                var Companies = await _connection.QueryAsync<SectorDto>($@"SELECT * FROM Sectors");

                using (var package = new ExcelPackage(new FileInfo(filePath)))
                {
                    var worksheet = package.Workbook.Worksheets[0];
                    var rowCount = worksheet.Dimension.Rows;
                    var colCount = worksheet.Dimension.Columns;

                    for (int row = 2; row <= rowCount; row++)
                    {
                        if (!string.IsNullOrEmpty(worksheet.Cells[row, 1].Text) && !string.IsNullOrEmpty(worksheet.Cells[row, 2].Text) && !string.IsNullOrEmpty(worksheet.Cells[row, 3].Text))
                        {
                            var stockMarket = stockMarkets.Where(f => f.Abbr.ToUpper() == (worksheet.Cells[row, 2].Text).ToUpper()).FirstOrDefault();
                            if (stockMarket != null)
                            {
                                var ticker = Companies.Where(f => f.Sector.ToUpper() == (worksheet.Cells[row, 1].Text).ToUpper()).FirstOrDefault();
                                if (ticker != null)
                                {
                                    var parameters = new DynamicParameters();
                                    parameters.Add("@StockMarket", worksheet.Cells[row, 2].Text);
                                    parameters.Add("@Sector", worksheet.Cells[row, 1].Text);
                                    parameters.Add("@Date", Convert.ToDateTime(worksheet.Cells[row, 3].Text));
                                    parameters.Add("@Opening", Convert.ToDecimal(worksheet.Cells[row, 4].Text));
                                    parameters.Add("@Highest", Convert.ToDecimal(worksheet.Cells[row, 5].Text));
                                    parameters.Add("@Lowest", Convert.ToDecimal(worksheet.Cells[row, 6].Text));
                                    parameters.Add("@Closing", Convert.ToDecimal(worksheet.Cells[row, 7].Text));
                                    parameters.Add("@Volume", Convert.ToDecimal((worksheet.Cells[row, 8].Text).Replace(",", "")));
                                    parameters.Add("@Transactions", Convert.ToDecimal((worksheet.Cells[row, 9].Text).Replace(",", "")));
                                    parameters.Add("@TradingValue", Convert.ToDecimal((worksheet.Cells[row, 10].Text).Replace(",", "")));
                                    parameters.Add("@PreviousClose", Convert.ToDecimal((worksheet.Cells[row, 11].Text).Replace(",", "")));
                                    parameters.Add("@LastUpdated", DateTime.Now);
                                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertOfficialIndices, parameters, commandType: CommandType.StoredProcedure);
                                }
                                else
                                {
                                    return $@"{worksheet.Cells[row, 4].Text} not exist please first add this Sector";
                                }
                            }
                            else
                            {
                                return $@"{worksheet.Cells[row, 5].Text} not exist please first add this Stock Market";
                            }
                        }

                    }
                    return "1";
                }
            }
            catch (Exception ex)
            {

                return ex.Message;
            }

        }
    }
}
