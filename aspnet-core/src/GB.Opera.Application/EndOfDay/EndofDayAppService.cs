using Commons;
using Companies;
using Dapper;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using OfficeOpenXml.ConditionalFormatting.Contracts;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.EndOfDay
{
    public class EndofDayAppService : ApplicationService, IEndofDayAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public EndofDayAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
         
        public async Task<List<GCCSector>> GetAllGCCSector()
        {
            try
            {
                var results = await _connection.QueryMultipleAsync(
                sql: ProcedureNames.usp_getGCCStockMarkets,
                commandType: CommandType.StoredProcedure
            );


                var GCCSectors = new List<GCCSector>();


                while (!results.IsConsumed)
                {
                    var resultSet = await results.ReadAsync<GCCSector>();
                    GCCSectors.AddRange(resultSet);
                }


                return GCCSectors;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
         
        public async Task<List<EODPrices>> EODPrices(DateTime PriceDate,Int16 StockMarketID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@PriceDate", PriceDate, DbType.DateTime);
            parameters.Add("@StockMarketID ", StockMarketID, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<EODPrices>(
                sql: ProcedureNames.usp_getPrices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<string> ImportPrices(List<FundPricesImportDto> list)
        {
            _connection.Open();
            using (var transaction = _connection.BeginTransaction())
            {
                try
                {
                    var stockMarkets = await _connection.QueryAsync<StockMarketDto>($@"SELECT * FROM StockMarkets", transaction: transaction);
                    var Companies = await _connection.QueryAsync<CompanyDto>($@"SELECT * FROM Companies", transaction: transaction);

                    foreach (var item in list)
                    {
                        if (item.Id > 0 && !string.IsNullOrEmpty(item.Ticker) && !string.IsNullOrEmpty(item.StockMarket))
                        {
                            
                        }
                        var stockMarket = stockMarkets.Where(f => f.Abbr.ToUpper() == (item.StockMarket).ToUpper()).FirstOrDefault();
						if (stockMarket != null)
						{
							var ticker = Companies.Where(f => f.Ticker.ToUpper() == (item.Ticker).ToUpper()).FirstOrDefault();
							if (ticker != null)
							{
								var parameters = new DynamicParameters();
								parameters.Add("@StockMarketID", stockMarket.StockMarketID);
								parameters.Add("@CompanyID", ticker.CompanyID);
								parameters.Add("@PriceDate", item.PriceDate);
								parameters.Add("@OpeningPrice", item.OpeningPrice);
								parameters.Add("@HighestPrice", item.HighestPrice);
								parameters.Add("@LowestPrice", item.LowestPrice);
								parameters.Add("@ClosingPrice", item.ClosingPrice);
								parameters.Add("@TradingVolume", item.TradingVolume);
								parameters.Add("@Trades", item.Trades);
								parameters.Add("@TradingValue", item.TradingValue);
								parameters.Add("@LastClosedPrice", null);
								parameters.Add("@LastUpdated", DateTime.Now);
								parameters.Add("@IsActive", true);
								await _connection.ExecuteAsync(ProcedureNames.usp_InsertPrice_New, parameters, transaction: transaction, commandType: CommandType.StoredProcedure);

							}
							else
							{
								return $@"{item.Ticker} not exist please first add this Ticker";
								await transaction.RollbackAsync();
							}
						}
						else
						{
							return $@"{item.StockMarket} not exist please first add this Stock Market";
							await transaction.RollbackAsync();
						}
					}

					await transaction.CommitAsync();
					return "1";

					//using (var package = new ExcelPackage(new FileInfo(filePath)))
					//{
					//    var worksheet = package.Workbook.Worksheets[0];
					//    var rowCount = worksheet.Dimension.Rows;
					//    var colCount = worksheet.Dimension.Columns;

					//    for

					//    for (int row = 2; row <= rowCount; row++)
					//    {
					//        if (!string.IsNullOrEmpty(worksheet.Cells[row, 1].Text) && !string.IsNullOrEmpty(worksheet.Cells[row, 4].Text) && !string.IsNullOrEmpty(worksheet.Cells[row, 5].Text))
					//        {
					//            var stockMarket = stockMarkets.Where(f => f.Abbr.ToUpper() == (worksheet.Cells[row, 5].Text).ToUpper()).FirstOrDefault();
					//            if (stockMarket != null)
					//            {
					//                var ticker = Companies.Where(f => f.Ticker.ToUpper() == (worksheet.Cells[row, 4].Text).ToUpper()).FirstOrDefault();
					//                if (ticker != null)
					//                {
					//                    var parameters = new DynamicParameters();
					//                    parameters.Add("@StockMarketID", stockMarket.StockMarketID);
					//                    parameters.Add("@CompanyID", ticker.CompanyID);
					//                    parameters.Add("@PriceDate", Convert.ToDateTime(worksheet.Cells[row, 6].Text));
					//                    parameters.Add("@OpeningPrice", Convert.ToDecimal(worksheet.Cells[row, 7].Text));
					//                    parameters.Add("@HighestPrice", Convert.ToDecimal(worksheet.Cells[row, 8].Text));
					//                    parameters.Add("@LowestPrice", Convert.ToDecimal(worksheet.Cells[row, 9].Text));
					//                    parameters.Add("@ClosingPrice", Convert.ToDecimal(worksheet.Cells[row, 10].Text));
					//                    parameters.Add("@TradingVolume", Convert.ToInt64((worksheet.Cells[row, 11].Text).Replace(",", "")));
					//                    parameters.Add("@Trades", Convert.ToInt64((worksheet.Cells[row, 12].Text).Replace(",", "")));
					//                    parameters.Add("@TradingValue", Convert.ToDecimal((worksheet.Cells[row, 13].Text).Replace(",", "")));
					//                    parameters.Add("@LastClosedPrice", null);
					//                    parameters.Add("@LastUpdated", DateTime.Now);
					//                    parameters.Add("@IsActive", true);
					//                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertPrice_New, parameters, transaction: transaction, commandType: CommandType.StoredProcedure);

					//                }
					//                else
					//                {
					//                    return $@"{worksheet.Cells[row, 4].Text} not exist please first add this Ticker";
					//                    await transaction.RollbackAsync();
					//                }
					//            }
					//            else
					//            {
					//                return $@"{worksheet.Cells[row, 5].Text} not exist please first add this Stock Market";
					//                await transaction.RollbackAsync();
					//            }
					//        }

					//    }
					//    await transaction.CommitAsync();
					//    return "1";
					//}
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
