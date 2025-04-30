using Commons;
using Dapper;
using GB.Opera.AccountsClassifications;
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

namespace EconomicAndStateFacts
{
    public  class EconomicAndStateFactAppService : ApplicationService, IEconomicAndStateFactAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public EconomicAndStateFactAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<ESDFactDto>> GetAllESDFactMappings()
        {
            try
            {
                var results = await _connection.QueryMultipleAsync(
                sql: ProcedureNames.usp_getAllESDFactsMappings,
                commandType: CommandType.StoredProcedure
            );


                var AllFactsOwnershipMappings = new List<ESDFactDto>();


                while (!results.IsConsumed)
                {
                    var resultSet = await results.ReadAsync<ESDFactDto>();
                    AllFactsOwnershipMappings.AddRange(resultSet);
                }


                return AllFactsOwnershipMappings;
            }
            catch (Exception ex)
            {

                throw ex;
            }    
            
        }

        public ESDFactModel SaveUpdateESDFact(ESDFactModel input)
        {

            var parameters = new
            {
                ESDFactID = input.ESDFactID,
                ParentID = input.ParentID,
                ESDFact = input.ESDFact,
                AESDFact = input.AESDFact,
                IsTitle = input.IsTitle,
                Daily = input.Daily,
                Quarterly = input.Quarterly,
                Monthly = input.Monthly,
                Yearly = input.Yearly,
                Forcast = input.Forcast,
                MeasurementUnit = input.MeasurementUnit,
                Currency = input.Currency,    
                Weekly = input.Weekly,
                RootParentESDFactID= input.RootParentESDFactID

            };

            _connection.Execute(ProcedureNames.usp_AddUpdateESDFact, parameters, commandType: CommandType.StoredProcedure);

            return input;
        }

        public async Task<List<ESDFactModel>> GetESDFactbyId(short ESDFactID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@ESDFactID ", ESDFactID, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<ESDFactModel>(
                sql: ProcedureNames.usp_getESDFactParams,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<int> DeletESDFactById(short ESDFactID)
        {
            // Define the parameters for the stored procedure or SQL command
            var parameters = new DynamicParameters();
            parameters.Add("@ESDFactID", ESDFactID, DbType.Int16);

            try
            {
                // Execute the stored procedure or SQL command for deletion
                var result = await _connection.ExecuteAsync(
                    sql: ProcedureNames.usp_DeleteGBFact,
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

    }
}
