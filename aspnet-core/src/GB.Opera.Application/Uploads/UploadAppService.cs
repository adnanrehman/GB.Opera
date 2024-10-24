using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Dapper;
using Companies;
using Volo.Abp.Application.Services;
using GB.Opera.constants;

namespace GB.Opera.Uploads
{
    public  class UploadAppService : ApplicationService, IUploadAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public UploadAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public async Task<UploadwithHasDtos> UploadwithHasDtos(int MarketID, int SectorID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCompaniesFinanicalTickers,
                  param: new { MarketID = MarketID, SectorID= SectorID } ,

            commandType: CommandType.StoredProcedure);

                var output = new UploadwithHasDtos();
                output.Companies = reader.Read<CompanyDto>().ToList();
                 output.Period = reader.Read<Periods>().ToList();
                output.FinancialEntryType = reader.Read<FinancialEntryTypes>().ToList();
               
                output.QPeriodType = reader.Read<QPeriodTypes>().ToList();
               // output.Uploads = reader.Read<Upload>().ToList();
                return output;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Users>> _getEntryReEntryUsers()
        {
            try
            {
                var data = (await _connection.QueryAsync<Users>(sql: ProcedureNames.usp_getEntryReEntryUsers_New,
                                param: new {},
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<List<UploadFinancialListDto>> GetFinancialsBycompanyId(int CompanyID)
        {
            try
            {
                var data = (await _connection.QueryAsync<UploadFinancialListDto>(sql: ProcedureNames.usp_getCompanyLatestFinanicals_New,
                                param: new { CompanyID  = CompanyID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task CreateUploadFinancial(UploadFinancials input)
        {
            try
            {
                var userId = Guid.NewGuid();
                var parameters = new DynamicParameters();
                parameters.Add("@FinancialsID", input.FinancialsID);
                parameters.Add("@CompanyID", input.CompanyID);
                parameters.Add("@AsOfDate", input.AsOfDate);
                parameters.Add("@PeriodTypeID", input.PeriodTypeID);
                parameters.Add("@FinancialEntryTypeID", input.FinancialEntryTypeID);
                parameters.Add("@UserID", input.UserID);
                parameters.Add("@Remarks", input.Remarks);
                parameters.Add("@ARemarks", input.ARemarks);
                parameters.Add("@Year", input.Year);
                parameters.Add("@QPeriodID", input.QPeriodId);
                parameters.Add("@IsYearly", input.IsYearly);
                parameters.Add("@PeriodNote", input.PeriodNote);
                parameters.Add("@APeriodNote", input.APeriodNote);

                var data = await _connection.QuerySingleAsync<UploadFinancialOutput>(ProcedureNames.usp_InsertFinancialsNewReview_New, parameters, commandType: CommandType.StoredProcedure);

                var financialsID = data.FinancialsID;
                var newReviewFinancialID = data.NewReviewFinancialID;
                var fName = data.FName;
                var asOfDate = data.AsofDate;

                var parameters2 = new DynamicParameters();
                //parameters2.Add("@FinancialsID", financialsID);
                parameters2.Add("@NewReviewFinancialID", newReviewFinancialID);
                parameters2.Add("@FileName", fName);
                parameters2.Add("@UploadedPath", "");
                parameters2.Add("@EntryUser", input.EntryUser);
                parameters2.Add("@ReEntryUser", input.ReEntryUser);

                await _connection.ExecuteAsync(ProcedureNames.usp_SetNewReviewFinanUploadedPath_New, parameters2, commandType: CommandType.StoredProcedure);



            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
