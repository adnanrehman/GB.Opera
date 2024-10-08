﻿using Dapper;
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
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCompaniesAccounts,
                    param: new { @FinancialsID = input.FinancialsID, @NewReviewFinancialID = input.NewReviewFinancialID, @IsNew =true, @CompanyID = input.CompanyID },
                commandType: CommandType.StoredProcedure);
                var output = new CompanyAccountsDto();
                output.FinancialsDetails = reader.Read<FinancialsDetailDto>().OrderBy(f => f.CustomOrder).ToList();
                output.AsOfDates = reader.Read<AsOfDateDto>().ToList();
                output.FinValueMatches = reader.Read<FinValueMatchDto>().ToList();
                output.ReentryMatches = reader.Read<ReentryMatchDto>().ToList();
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
                commandType: CommandType.StoredProcedure);
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
            foreach (var item in list)
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FinancialDetailID", item.FinancialDetailId);
                parameters.Add("@GBFactID", item.GBFactID);
                parameters.Add("@ParentID", item.ParentID);
                parameters.Add("@GBFact", item.GBFact);
                parameters.Add("@Value", item.Value);
                parameters.Add("@FinancialsID", item.FinancialsID);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertUpdateFinancialValues, parameters, commandType: CommandType.StoredProcedure);
            }    
        }

        public async Task InsertUpdateFinancialCommentsStatus(List<FinancialsDetailDto> list, Guid userID)
        {
            foreach (var item in list)
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FinancialDetailID", item.FinancialDetailId);
                parameters.Add("@UserID", userID);
                parameters.Add("@FinancialsID", item.FinancialsID);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertUpdateFinancialCommentsStatus_New, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task InsertUpdateComitChanges(AsofDatesFinancialDto dto, Guid userID)
        {
            foreach (var item in dto.FinancialsDetails)
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FinancialDetailID", item.FinancialDetailId);
                parameters.Add("@GBFactID", item.GBFactID);
                parameters.Add("@ParentID", item.ParentID);
                parameters.Add("@GBFact", item.GBFact);
                parameters.Add("@Value", item.Value);
                parameters.Add("@FinancialsID", item.FinancialsID);

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
    }
}
