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
                    Country = reader.Read<Countries>().ToList(),
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

    }
}
