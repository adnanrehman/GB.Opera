using Commons;
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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FinancialsAdmins
{
    public class FinancialsAdminAppService : ApplicationService, IFinancialsAdminAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public FinancialsAdminAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public async Task<NewFinancialReviewOutputDto> GetNewFinancialReviews(int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCompAdminFinancials_New,
                    param: new { @CompanyID = companyID },
                commandType: CommandType.StoredProcedure);
                var output = new NewFinancialReviewOutputDto();
                output.NewReviewFinancials = reader.Read<NewReviewFinancialDto>().ToList();
                output.PeriodTypes = reader.Read<PeriodTypeDto>().ToList();
                output.QPeriods = reader.Read<QPeriodDto>().ToList();
                var users = reader.Read<UserDto>().ToList();
                output.EntryUsers = users.Where(f => f.UserType == "Entry Operator").ToList();
                output.ReEntryUsers = users.Where(f => f.UserType == "Re Entry Operator").ToList();
                output.Statuses = reader.Read<StatusDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task UpdateFinancialRateChanges(long financialId,decimal rate)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FinancialsID", financialId);
                parameters.Add("@Rate", rate);;

                await _connection.ExecuteAsync(ProcedureNames.usp_UpdateFinancialRateChanges, parameters, commandType: CommandType.StoredProcedure);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateAdminFinancials(NewReviewFinancialDto input)
        {
            try
            {
                var userId = Guid.NewGuid();
                var parameters = new DynamicParameters();
                parameters.Add("@NewReviewFinancialID", input.NewReviewFinancialID);
                parameters.Add("@FinancialsID", input.FinancialsID);
                parameters.Add("@IsAudited", input.IsAudited);
                parameters.Add("@IsActive", input.IsActive);
                parameters.Add("@FinancialEntryTypeID", input.FinancialEntryTypeID);
                parameters.Add("@AsOfDate", input.AsOfDate);
                parameters.Add("@PeriodTypeID", input.PeriodTypeID);
                parameters.Add("@Year", input.Year);
                parameters.Add("@QPeriod", input.QPeriod);
                parameters.Add("@QPeriodID", input.QPeriodID);
                parameters.Add("@IsYearly", input.IsYearly);
                parameters.Add("@EntryUser", input.EntryUser);
                parameters.Add("@ReEntryUser", input.ReEntryUser);
                parameters.Add("@StatusID", input.StatusID);
                parameters.Add("@UploadedPath", input.UploadedPath);
                parameters.Add("@FileName", input.FileName);
                parameters.Add("@SecondaryUploadedPath", input.SecondaryUploadedPath);
                parameters.Add("@SecondaryFileName", input.SecondaryFileName);
                parameters.Add("@Remarks", input.Remarks);
                parameters.Add("@ARemarks", input.ARemarks);
                parameters.Add("@FinancialEntryTypeID", input.FinancialEntryTypeID);
                parameters.Add("@PeriodNote", input.PeriodNote);
                parameters.Add("@APeriodNote", input.APeriodNote);

                await _connection.ExecuteAsync(ProcedureNames.usp_UpdateAdminFinancialsAllParams_New, parameters, commandType: CommandType.StoredProcedure);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteFinancial(long financialId)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FinancialsID", financialId);

                await _connection.ExecuteAsync(ProcedureNames.Deletefianancial, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                // Log the exception before rethrowing it (assuming you have a logger)
                
                throw;
            }
        }

        public async Task<string> Checkfinancialyear(string year, Int16 QPeriodID,Int16 CompanyID)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@year", year);
                parameters.Add("@QPeriodID", QPeriodID);
                parameters.Add("@CompanyID", CompanyID);

                // This will check if the period is already added
                var result = await _connection.ExecuteScalarAsync<string>(ProcedureNames.CheckFinancialsQYPeriods, parameters, commandType: CommandType.StoredProcedure);

                // If the result is null or empty, it means the period is not yet added, so return null
                if (string.IsNullOrEmpty(result))
                {
                    return null; // Period is not added
                }

                // If the period is already added, return the appropriate message
                return "This period is already added in this year";
            }
            catch (SqlException sqlEx)
            {
                throw new ApplicationException("An error occurred while checking the financial period.", sqlEx);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An unexpected error occurred.", ex);
            }
        }



    }
}
