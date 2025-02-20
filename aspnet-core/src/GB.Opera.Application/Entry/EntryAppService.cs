using Dapper;
using Entry;
using GB.Opera.constants;
using GbFacts;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Transactions;
using System.Xml.Linq;
using Volo.Abp.Application.Services;

namespace Entry
{
    public class EntryAppService : ApplicationService, IEntryAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public EntryAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<StatusFinancialsDto>> GetStatusFinancials(Guid userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserID", userId);
            parameters.Add("@StatusID ", 1);

            var data = await _connection.QueryAsync<StatusFinancialsDto>(
                sql: ProcedureNames.usp_getStatusFinancials_New,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<CompanyAccountsDto> GetCompanyAccounts(CompanyAccountsInputDto input)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(
                ProcedureNames.usp_getCompaniesAccounts_New,
                param: new
                {
                    @FinancialsID = input.FinancialsID,
                    @NewReviewFinancialID = input.NewReviewFinancialID,
                    @IsNew = true,
                    @CompanyID = input.CompanyID
                },
                commandType: CommandType.StoredProcedure,
                commandTimeout: 180 // Increase timeout to 120 seconds (default is 30)
            );
                var output = new CompanyAccountsDto();
                output.FinancialsDetails = reader.Read<FinancialsDetailDto>().OrderBy(f => f.CustomOrder).ToList();
                output.AsOfDates = reader.Read<AsOfDateDto>().ToList();                
                output.FinValueMatches = reader.Read<FinValueMatchDto>().ToList();
                output.ReentryMatches = reader.Read<ReentryMatchDto>().ToList();
                var gbFacts = reader.Read<GbFactListDto>().ToList();
                foreach (var item in output.FinancialsDetails)
                {
                    item.GBFactName = gbFacts.Where(f => f.GBFactID == item.GBFactID).Select(f => f.GBFact).FirstOrDefault();
                }
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<AsofDatesFinancialDto> GetAsofDatesFinancials(AsofDatesFinancialInputDto input)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getAsofDatesFinancials,
                    param: new { @FinancialsID = input.FinancialsID, @IsNew = false, @CompanyID = input.CompanyID },
                commandType: CommandType.StoredProcedure,
                 commandTimeout: 180);
                var output = new AsofDatesFinancialDto();
                output.FinancialsDetails = reader.Read<FinancialsDetailDto>().OrderBy(f => f.CustomOrder).ToList();
                output.FinEntryInReviews = reader.Read<FinEntryInReviewDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task InsertUpdateFinancialValues(List<FinancialsDetailDto> list)
        {
            _connection.Open();

            List<FinancialsDetailDto> jsonList = new List<FinancialsDetailDto>();

            try
            {
                foreach (var item in list)
                {
                    jsonList.Add(new FinancialsDetailDto
                    {
                        GBFactID = item.GBFactID,
                        ParentID = item.ParentID,
                        Value = item.Value,
                        FinancialsID = item.FinancialsID,
                        FinancialDetailId = item.FinancialDetailId
                    });

                }

                if (jsonList.Count > 0)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Json", JsonSerializer.Serialize(jsonList));
                    parameters.Add("@FinancialsID", jsonList.Select(g => g.FinancialsID).FirstOrDefault());
                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertUpdateFinancialValues, parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task InsertUpdateFinancialCommentsStatus(List<FinancialsDetailDto> list, Guid userID)
        {
            _connection.Open();
            using (var transaction = _connection.BeginTransaction())
            {
                try
                {
                    foreach (var item in list)
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("@FinancialDetailID", item.FinancialDetailId);
                        parameters.Add("@UserID", userID);
                        parameters.Add("@FinancialsID", item.FinancialsID);

                        await _connection.ExecuteAsync(ProcedureNames.usp_InsertUpdateFinancialCommentsStatus_New, parameters, transaction: transaction, commandType: CommandType.StoredProcedure);
                    }
                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    throw ex;
                }
            }

        }

        public async Task InsertUpdateComitChanges(AsofDatesFinancialDto dto, Guid userID)
        {
            _connection.Open();

            try
            {
                

                List<FinancialsDetailDto> jsonList = new List<FinancialsDetailDto>();

                foreach (var item in dto.FinancialsDetails)
                {
                    jsonList.Add(new FinancialsDetailDto
                    {
                        GBFactID = item.GBFactID,
                        ParentID = item.ParentID,
                        Value = item.Value,
                        FinancialsID = item.FinancialsID,
                        FinancialDetailId = item.FinancialDetailId
                    });

                }

                if (jsonList.Count > 0)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Json", JsonSerializer.Serialize(jsonList));
                    parameters.Add("@FinancialsID", jsonList.Select(g => g.FinancialsID).FirstOrDefault());
                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertUpdateFinancialValues, parameters, commandType: CommandType.StoredProcedure);
                }

                foreach (var item in dto.FinEntryInReviews)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@FinancialDetailID", item.FinancialDetailID);
                    parameters.Add("@UserID", userID);
                    parameters.Add("@FinancialsID", item.FinancialsID);

                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertFinReviewFromEntry_New, parameters, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
