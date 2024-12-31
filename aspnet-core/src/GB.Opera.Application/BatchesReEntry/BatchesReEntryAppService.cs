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

namespace BatchesReEntry
{
    public class BatchesReEntryAppService : ApplicationService, IBatchesReEntryAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public BatchesReEntryAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<BatchesReEntryDto>> GetBatchesReEntry(Guid userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserID", userId);
            parameters.Add("@StatusID ", 2);

            var data = await _connection.QueryAsync<BatchesReEntryDto>(
                sql: ProcedureNames.usp_getBatchesReEntry_New,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<List<BatchesESDFactsMappingDto>> GetBatchesForReEntry(int batchID)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@batchID", batchID);

            var data = await _connection.QueryAsync<BatchesESDFactsMappingDto>(
                sql: ProcedureNames.usp_getBatchesForReEntry,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task UpdateBatchStatus(BatchStatusUpdateDto input)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@BatchID", input.BatchID);
                parameters.Add("@StatusID", input.StatusID);
                parameters.Add("@Remarks", input.Remarks);
                parameters.Add("@ARemarks", input.ARemarks);

                await _connection.ExecuteAsync(ProcedureNames.usp_UpdateBatchStatus, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
