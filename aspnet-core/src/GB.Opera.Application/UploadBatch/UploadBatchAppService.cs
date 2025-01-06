using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Volo.Abp.Data;
using Commons;
using System.Reflection;
using System.ComponentModel.Design;
using CompanyManagements;
using System.Drawing;
using System.Runtime.ConstrainedExecution;
using GB.Opera.constants;
using Dapper;
using System;
using GB.Opera.BatchesEntry;
using GB.Opera.BatchAdmin;

namespace UploadBatch
{
    public class UploadBatchAppService : ApplicationService, IUploadBatchAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public UploadBatchAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public async Task<BatchAdminDto> CountriesForBatches()
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCountriesForBatches_New,

                            commandType: CommandType.StoredProcedure);
                var output = new BatchAdminDto();
                output.Countries = reader.Read<CountriesAdmin>().ToList();
                output.entryusers = reader.Read<Entryusers>().ToList();

                output.adminStatus = reader.Read<AdminStatus>().ToList();


                return output;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<List<ESDFactDto>> GetCountriesFactsTitles(string country)
        {
            var data = (await _connection.QueryAsync<ESDFactDto>(sql: ProcedureNames.usp_getCountriesFactsTitles, param: new { Country = country }, commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }

        public async Task<UploadBatchDto> InsertBatch(UploadBatchDto input)
        {
            try
            {
                // Prepare the dynamic parameters to send to the stored procedure
                var parameters = new DynamicParameters();
                parameters.Add("@BatchID", input.BatchID);
                parameters.Add("@CountryID", input.CountryID);
                parameters.Add("@ReportType", input.ReportType);
                parameters.Add("@Source", input.Source);
                parameters.Add("@ASource", input.ASource);
                parameters.Add("@StatusID", input.StatusID);
                parameters.Add("@AsofDate", input.AsofDate);
                parameters.Add("@EntryUserID", input.GbEntryUserId);
                parameters.Add("@ReEntryUserID", input.GbReEntryUserId);
                parameters.Add("@Remarks", input.Remarks);
                parameters.Add("@ARemarks", input.ARemarks);
                parameters.Add("@ESDFactID", input.ESDFactID);
                parameters.Add("@HijriDate", input.HijriDate);
                parameters.Add("@FileName", input.FileName);
                parameters.Add("@Note", input.Note);
                parameters.Add("@ANote", input.ANote);

                await _connection.ExecuteAsync(ProcedureNames.usp_InserUpdateBatch_New, parameters, commandType: CommandType.StoredProcedure);

                return input; 
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}