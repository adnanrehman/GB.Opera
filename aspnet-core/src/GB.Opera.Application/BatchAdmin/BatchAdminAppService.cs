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

namespace GB.Opera.BatchAdmin
{
    public class BatchAdminAppService : ApplicationService, IBatchAdminAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public BatchAdminAppService(IConfiguration configuration)
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

        public async Task<List<SearchBatches>> GetBatchesEntry(Int16 BatchID)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@BatchID", BatchID);

                var data = await _connection.QueryAsync<SearchBatches>(
                    sql: ProcedureNames.usp_SearchBatch,
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

        public async Task<SearchBatches> InsertBatchesadmin(SearchBatches list)
        {
            try
            {
                // Prepare the dynamic parameters to send to the stored procedure
                var parameters = new DynamicParameters();
                parameters.Add("@BatchID", list.BatchID);
                parameters.Add("@CountryID", list.CountryID);
                parameters.Add("@ReportType", list.ReportType);
                parameters.Add("@Source", list.Source);
                parameters.Add("@ASource", list.ASource);
                parameters.Add("@StatusID", list.StatusID);
                parameters.Add("@AsofDate", list.AsofDate);
                parameters.Add("@EntryUserID", list.GbEntryUserId);
                parameters.Add("@ReEntryUserID", list.GbReEntryUserId);
                parameters.Add("@Remarks", list.Remarks);
                parameters.Add("@ARemarks", list.ARemarks);
                parameters.Add("@ESDFactID", list.ESDFactID);
                parameters.Add("@HijriDate", list.HijriDate);
                parameters.Add("@FileName", list.FileName);
                parameters.Add("@Note", list.Note);
                parameters.Add("@ANote", list.ANote);


                // Execute the stored procedure
                await _connection.ExecuteAsync(ProcedureNames.usp_InserUpdateBatch_New, parameters, commandType: CommandType.StoredProcedure);

                // Assuming you want to return the updated 'SearchBatches' object:
                return list; // This assumes the procedure modifies the 'list' in place and you want to return it back.
            }
            catch (Exception ex)
            {


                // You can throw a custom exception if needed
                throw new Exception("An error occurred while processing the batch update.", ex);
            }
        }


        public async Task<List<SearchBatches>> AdminBatches(string ReportType, Int16 CountryID)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ReportType", ReportType);
                parameters.Add("@CountryID", CountryID);

                var data = await _connection.QueryAsync<SearchBatches>(
                    sql: ProcedureNames.usp_getAdminBatches,
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
    }
}