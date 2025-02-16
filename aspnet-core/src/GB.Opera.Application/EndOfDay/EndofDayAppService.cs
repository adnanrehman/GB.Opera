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
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
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
            _connection = new SqlConnection(configuration.GetConnectionString("DefaultForNews"));
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

        public async Task<List<EODPrices>> EODPrices(DateTime PriceDate, Int16 StockMarketID)
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

            try
            {
                List<FundPricesImportDto> josnList = new List<FundPricesImportDto>();

                var marketAbb = list.Select(g => g.StockMarket).FirstOrDefault();

                var stockMarket = await _connection.QueryFirstAsync<StockMarketDto>($@"SELECT * FROM StockMarkets WHERE Abbr='{marketAbb}'");
                var Companies = await _connection.QueryAsync<CompanyDto>($@"SELECT Ticker,Company,CompanyId FROM Companies WHERE StockMarketId={stockMarket.StockMarketID}");

                foreach (var item in list)
                {
                    if (item != null)
                    {
                        if (item.Id > 0 && !string.IsNullOrEmpty(item.Ticker) && !string.IsNullOrEmpty(item.StockMarket))
                        {

                        }

                        if (stockMarket != null)
                        {
                            var ticker = Companies.Where(f => f.Ticker.Trim().ToUpper() == (item.Ticker).Trim().ToUpper()).FirstOrDefault();
                            if (ticker != null)
                            {

                                josnList.Add(new FundPricesImportDto
                                {
                                    StockMarketId = stockMarket.StockMarketID,
                                    CompanyId = ticker.CompanyID,
                                    PriceDate = item.PriceDate,
                                    OpeningPrice = item.OpeningPrice,
                                    HighestPrice = item.HighestPrice,
                                    LowestPrice = item.LowestPrice,
                                    ClosingPrice = item.ClosingPrice,
                                    TradingVolume = item.TradingVolume,
                                    Trades = item.Trades,
                                    TradingValue = item.TradingValue,
                                    LastClosedPrice = null,
                                    LastUpdated = DateTime.Now
                                });


                                //parameters.Add("@ClosingPrice", item.ClosingPrice);
                                //parameters.Add("@TradingVolume", item.TradingVolume);
                                //parameters.Add("@Trades", item.Trades);
                                //parameters.Add("@TradingValue", item.TradingValue);
                                //parameters.Add("@LastClosedPrice", null);
                                //parameters.Add("@LastUpdated", DateTime.Now);
                                //parameters.Add("@IsActive", true);
                                //await _connection.ExecuteAsync(ProcedureNames.usp_InsertPrice_New, parameters, transaction: transaction, commandType: CommandType.StoredProcedure);

                            }
                            else
                            {
                                josnList = new List<FundPricesImportDto>();
                                return $@"{item.Ticker} not exist please first add this Ticker";

                            }
                        }
                        else
                        {
                            josnList = new List<FundPricesImportDto>();
                            return $@"{item.StockMarket} not exist please first add this Stock Market";
                        }
                    }
                }

                if (josnList.Count > 0)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Json", JsonSerializer.Serialize(josnList));
                    parameters.Add("@StockMarketId", stockMarket.StockMarketID);
                    parameters.Add("@PriceDate", list.Select(g => g.PriceDate).FirstOrDefault());

                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertPrice_New, parameters, commandType: CommandType.StoredProcedure);
                }

                return "1";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }

}
