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

namespace GB.Opera.GbOwnerShips
{
    public  class GbOwnerShipAppService : ApplicationService, IGbOwnerShipAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public GbOwnerShipAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<GbOwnerShip>> GetAllFactsOwnershipMappings()
        {
            try
            {
                var results = await _connection.QueryMultipleAsync(
                sql: ProcedureNames.usp_getAllFactsOwnershipMappings,
                commandType: CommandType.StoredProcedure
            );


                var AllFactsOwnershipMappings = new List<GbOwnerShip>();


                while (!results.IsConsumed)
                {
                    var resultSet = await results.ReadAsync<GbOwnerShip>();
                    AllFactsOwnershipMappings.AddRange(resultSet);
                }


                return AllFactsOwnershipMappings;
            }
            catch (Exception ex)
            {

                throw ex;
            }    
            
        }

        public GbOwnerShip SaveUpdateGbOwnerShip(GbOwnerShip gbOwnerShip)
        {

            var parameters = new
            {
                GBOwnershipID = gbOwnerShip.GBOwnershipID,
                ParentID = gbOwnerShip.ParentID,
                GBOwnership = gbOwnerShip.GBOwnership,
                AGBOwnership = gbOwnerShip.AGBOwnership,
                IsGBOwnership = gbOwnerShip.IsGBOwnership,
                IsTitle = gbOwnerShip.IsTitle
                 
            };

            _connection.Execute(ProcedureNames.usp_AddUpdateGBOwnership, parameters, commandType: CommandType.StoredProcedure);


            return gbOwnerShip;
        }

        public async Task<List<GbOwnerShip>> GetGBOwnershipbyId(short GBOwnershipID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@GBOwnershipID ", GBOwnershipID, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<GbOwnerShip>(
                sql: ProcedureNames.usp_GetGBOwnershipbyId_New,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<int> DeletGBOwnershipById(short GBOwnershipID)
        {
            // Define the parameters for the stored procedure or SQL command
            var parameters = new DynamicParameters();
            parameters.Add("@OwnershipId", GBOwnershipID, DbType.Int16);

            try
            {
                // Execute the stored procedure or SQL command for deletion
                var result = await _connection.ExecuteAsync(
                    sql: ProcedureNames.usp_deleteOwnershipById,
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
