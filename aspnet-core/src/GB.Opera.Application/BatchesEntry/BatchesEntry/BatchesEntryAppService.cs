using Dapper;
using Entry;
using GB.Opera.constants;
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

namespace GB.Opera.BatchesEntry.BatchesEntry
{
    public  class BatchesEntryAppService : ApplicationService , IBatchesEntryAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public BatchesEntryAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<BatchesEntryDto>> GetBatchesEntry(Guid userId)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@UserID", userId);
                parameters.Add("@StatusID ", 1);
                var data = await _connection.QueryAsync<BatchesEntryDto>(
                    sql: ProcedureNames.usp_getBatchesEntry_New,
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return data.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }

        public async Task<List<ESDFactsMappings>> getESDFactsMappingsYearly(Int64 BatchID, Int64 BatchESDfactID)
        {
            try
            {
                // Execute the stored procedure with QueryMultiple
                var parameters = new DynamicParameters();
                parameters.Add("@BatchID", BatchID);
                parameters.Add("@BatchESDfactID", BatchESDfactID);

                var results = await _connection.QueryMultipleAsync(
                    sql: ProcedureNames.usp_getESDFactsMappingsYearly_New,
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                var FactsMappingsList = new List<ESDFactsMappings>();

                // Process the results and add them to the list
                while (!results.IsConsumed)
                {
                    var resultSet = results.Read<ESDFactsMappings>().ToList();
                    FactsMappingsList.AddRange(resultSet);
                }

                // Filter out rows where ESDFact is empty or zero
                FactsMappingsList = FactsMappingsList.Where(f => f.ESDFact != null || f.ESDFact== "").ToList();

                return FactsMappingsList;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching ESDFactsMappings", ex);
            }
        }


        public async Task InsertBatchesEntries(List<BatchesEntries> list)
        {
            try
            {
                foreach (var item in list)
                {
                    var parameters = new DynamicParameters();

                    parameters.Add("@BatchDetailID", item.BatchDetailID);
                    parameters.Add("@ESDFactID", item.ESDFactID);
                    parameters.Add("@ParentID", item.ParentID);
                    parameters.Add("@IsTitle", item.IsTitle);
                    parameters.Add("@Value", item.Value);
                    parameters.Add("@BatchID", item.BatchID);
                    parameters.Add("@Remarks", item.Remarks);
                    parameters.Add("@ARemarks", item.ARemarks);


                    await _connection.ExecuteAsync(ProcedureNames.usp_InserUpdateBatchDetail, parameters, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
