using Dapper;
using Entry;
using GB.Opera.constants;
using GB.Opera.MarketSector;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Volo.Abp.Application.Services;

namespace GB.Opera.MarketSectors
{
    public  class MarketSectorAppService : ApplicationService , IMarketSectorAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public MarketSectorAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public async Task<MarketSectorDto> GetMarketsInfo(Int16 MarketID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getMarketsInfo, param: new { MarketID = MarketID }, commandType: CommandType.StoredProcedure);

                var output = new MarketSectorDto
                {
                     Countrygroup = reader.Read<CountryGroupsector>().ToList() ,
                    //Country = reader.Read<Countries>().ToList(),
                    CapacitySize = reader.Read<CapacitySizes>().ToList(),
                    StockMarket = reader.Read<StockMarkets>().ToList(),
                    StockMarketById = reader.Read<StockMarketByID>().ToList(),
                    MarketCap = reader.Read<MarketCaps>().ToList(),
                    GBMarketCap = reader.Read<GBMarketCaps>().ToList(),
                    Sector = reader.Read<Sectors>().ToList(),
                    MarketSectors = reader.Read<MarketsSector>().ToList(),
                    Currency = reader.Read<Currencies>().ToList()
                };

                return output;
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                throw new ApplicationException("An error occurred while fetching market information.", ex);
            }
        }

        public async Task InsertCountryGroup(InsertmarketsectorDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@StockMarketID",null);
                parameters.Add("@CountryID", model.stockMarketByID.CountryID);
                parameters.Add("@StockMarket", model.stockMarketByID.StockMarket);
                parameters.Add("@AStockMarket", model.stockMarketByID.AStockMarket);
                parameters.Add("@Abbr", model.stockMarketByID.Abbr);
                parameters.Add("@AAbbr", model.stockMarketByID.AAbbr);
                parameters.Add("@IndexName", model.stockMarketByID.IndexName);
                parameters.Add("@AIndexName", model.stockMarketByID.AIndexName);
                parameters.Add("@Description", model.stockMarketByID.Description);
                parameters.Add("@ADescription", model.stockMarketByID.ADescription);
                parameters.Add("@IsActive", model.stockMarketByID.IsActive);
                parameters.Add("@FinancialCurrencyID", model.stockMarketByID.FinancialCurrencyID);

                //await _connection.ExecuteAsync(ProcedureNames.usp_InsertCGroup_New, parameters, commandType: CommandType.StoredProcedure);
                var stockemarketid = await _connection.QuerySingleAsync<int>(ProcedureNames.usp_InsertMarketInfo, parameters, commandType: CommandType.StoredProcedure);

                foreach (var item in model.marketsSector)
                {
                    var parameters2 = new DynamicParameters();
                    parameters2.Add("@MarketSectorID", item.MarketSectorID);
                    parameters2.Add("@SectorID", item.SectorID);
                    parameters2.Add("@StockMarketID", stockemarketid);

                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertMarketSectors, parameters2, commandType: CommandType.StoredProcedure);
                }

                foreach (var item in model.marketCaps)
                {
                    var parameters3 = new DynamicParameters();
                    parameters3.Add("@MarketCapID", item.MarketCapID);
                    parameters3.Add("@CapSizeID", item.CapSizeID);
                    parameters3.Add("@StockMarketID", stockemarketid); ;

                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertMarketCaps, parameters3, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}
