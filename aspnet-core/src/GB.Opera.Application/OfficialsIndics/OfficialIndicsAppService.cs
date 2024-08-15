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
    }
}
