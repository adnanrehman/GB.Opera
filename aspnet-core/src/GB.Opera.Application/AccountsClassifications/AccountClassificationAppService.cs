using Dapper;
using GB.Opera.AccountsClassifications;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.AccountsClassifications
{
    public class AccountClassificationAppService : ApplicationService, IAccountClassificationAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public AccountClassificationAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public async Task<List<ACFactsDtos>> GetAllACFactsMappings()
        {

            var results = await _connection.QueryMultipleAsync(
                sql: "usp_getAllACFactsMappings",
                commandType: CommandType.StoredProcedure
            );


            var ACFactsFactList = new List<ACFactsDtos>();


            while (!results.IsConsumed)
            {
                var resultSet = await results.ReadAsync<ACFactsDtos>();
                ACFactsFactList.AddRange(resultSet);
            }


            return ACFactsFactList;
        }

        public GbAcFactsAccount SaveUpdateAacFact(GbAcFactsAccount gbAcFactsAccount)
        {

            var parameters = new
            {
                ACFactID = gbAcFactsAccount.AcFactID,
                IsACAccount = gbAcFactsAccount.IsACAccount,
                IsTitle = gbAcFactsAccount.IsTitle,
                ACFact = gbAcFactsAccount.AcFact,
                ParentID = gbAcFactsAccount.ParentID,
                AACFact = gbAcFactsAccount.AacFact,
                GBFactID=155
            };

            _connection.Execute("usp_AddUpdateACFact", parameters, commandType: CommandType.StoredProcedure);


            return gbAcFactsAccount;
        }

        public async Task<List<GbAcFactsAccount>> GetAacfactByid(short ACFactId)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@ACFactId ", ACFactId, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<GbAcFactsAccount>(
                sql: "usp_GetAccFactbyId_New",
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<int> DeleteAacfactById(short ACFactId)
        {
            // Define the parameters for the stored procedure or SQL command
            var parameters = new DynamicParameters();
            parameters.Add("@ACFactId", ACFactId, DbType.Int16);

            try
            {
                // Execute the stored procedure or SQL command for deletion
                var result = await _connection.ExecuteAsync(
                    sql: "usp_DeleteAccFactById",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                // Return the number of rows affected (optional, depending on your needs)
                return result;
            }
            catch (Exception ex)
            {
                // Handle exceptions here (logging, rethrowing, etc.)
                throw new Exception("Error deleting AccFact by ID", ex);
            }
        }
        public IEnumerable<GbAcFactsAccount> SaveUpdateAacFacts(IEnumerable<GbAcFactsAccount> gbAcFactsAccounts)
        {
            foreach (var gbAcFactsAccount in gbAcFactsAccounts)
            {
                var parameters = new
                {
                    ACFactID = gbAcFactsAccount.AcFactID,
                    IsACAccount = gbAcFactsAccount.IsACAccount,
                    IsTitle = gbAcFactsAccount.IsTitle,
                    ACFact = gbAcFactsAccount.AcFact,
                    ParentID = gbAcFactsAccount.ParentID,
                    AACFact = gbAcFactsAccount.AacFact,
                    GBFactID = gbAcFactsAccount.GBFactID // Assuming GBFactID needs to be passed
                };

                _connection.Execute("usp_AddACFactFromGBFact", parameters, commandType: CommandType.StoredProcedure);
            }

            return gbAcFactsAccounts;
        }



    }
}
