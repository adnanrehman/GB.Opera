using Abp.Extensions;
using Dapper;
using Entry;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Volo.Abp.Application.Services;

namespace Reviewers
{
    public class ReviewerAppService : ApplicationService, IReviewerAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
            
        public ReviewerAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<StatusFinancialsDto>> GetStatusFinancials(Guid userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserID", userId);
            parameters.Add("@StatusID ", 3);

            var data = await _connection.QueryAsync<StatusFinancialsDto>(
                sql: ProcedureNames.usp_getStatusFinancials_New,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<ReviewReportOutputDto> GetReviewReport(int financialsID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.RPT_ReviewReportQuarterlyNew,
                    param: new { FinancialsID = financialsID },
                    commandType: CommandType.StoredProcedure,commandTimeout:300);

                var output = new ReviewReportOutputDto();
              //  output.Reviewers = reader.Read<ReviewerDto>().Take(0).ToList();
               // output.ReviewersNew = reader.Read<ReviewerDto>().Take(0).ToList();
                output.IncomeStatement = reader.Read<ReviewReportDto>().ToList();
                output.BalanceSheet = reader.Read<ReviewReportDto>().ToList();
                return output;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}