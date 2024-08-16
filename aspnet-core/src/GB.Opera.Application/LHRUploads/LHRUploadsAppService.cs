using Dapper;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.LHRUploads
{
    public  class LHRUploadsAppService : ApplicationService , ILHRUploadsAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public LHRUploadsAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<LHRUpload>> GetAllStockMarkets()
        {

            var results = await _connection.QueryMultipleAsync(
                sql: ProcedureNames.usp_getCompStockMarkets,
                commandType: CommandType.StoredProcedure
            );


            var lhrlist = new List<LHRUpload>();


           
                var resultSet = await results.ReadAsync<LHRUpload>();
            lhrlist.AddRange(resultSet);
            


            return lhrlist;
        }

        public async Task<List<Company>> GetCompaniesFromMarket(short StockMarketID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@StockMarketID", StockMarketID, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<Company>(
                sql: ProcedureNames.usp_getCompaniesFromMarket,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

    }
}
