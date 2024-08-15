using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
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
                sql: "usp_getGCCStockMarkets",
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
                sql: "usp_getPrices",
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

      


    }
}
