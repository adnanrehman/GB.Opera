using Commons;
using CompaniesQNetProfits;
using Dapper;
using Entry;
using GB.Opera.CompaniesQNetProfits;
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

namespace CompaniesQNetProfits
{
    public class CompaniesQNetProfitAppService : ApplicationService, ICompaniesQNetProfitAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompaniesQNetProfitAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<CompaniesQNetProfitListDto> GetCompaniesQNetProfits(int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCompaniesQNetProfits,
                    param: new { @CompanyID = companyID },
                commandType: CommandType.StoredProcedure);
                var output = new CompaniesQNetProfitListDto();
                output.CompaniesQNetProfits = reader.Read<CompaniesQNetProfitDto>().ToList();
                output.CurrencyOutstandings = reader.Read<CurrencyOutstandingDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task InsertUpdateCalculateCompQuartersNetProfit(CompaniesQNetProfitDto input)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CompQNProfitID", input.CompQNProfitID);
                parameters.Add("@Year", input.Year);
                parameters.Add("@CompanyID", input.CompanyID);
                parameters.Add("@QPeriodID", input.QPeriodID);
                parameters.Add("@AsOfDate", input.AsOfDate);
                parameters.Add("@PeriodTypeID", input.PeriodTypeID);
                parameters.Add("@IsYearly", input.IsYearly);
                parameters.Add("@NetProfit", input.NetProfit);
                parameters.Add("@PreviousNP", input.PreviousNP);
                parameters.Add("@NetProfitChange", input.NetProfitChange);
                parameters.Add("@EPS", input.EPS);
                parameters.Add("@PE", input.PE);
                parameters.Add("@FiveYearGrowth", input.FiveYearGrowth);
                parameters.Add("@AnnouncementDate", input.AnnouncementDate);
                parameters.Add("@Remarks", input.Remarks);
                parameters.Add("@ARemarks", input.ARemarks);
                parameters.Add("@OwnersEquity", input.OwnersEquity);
                parameters.Add("@PreviousOwnersEquity", input.PreviousOwnersEquity);
                parameters.Add("@OwnersEquityChange", input.OwnersEquityChange);
                parameters.Add("@TotalAssets", input.TotalAssets);
                parameters.Add("@PreviousTotalAssets", input.PreviousTotalAssets);
                parameters.Add("@TotalAssetsChange", input.TotalAssetsChange);
                parameters.Add("@Revenues", input.Revenues);
                parameters.Add("@PreviousRevenues", input.PreviousRevenues);
                parameters.Add("@RevenuesChange", input.RevenuesChange);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertUpdateCalculateCompQuartersNetProfit, parameters, commandType: CommandType.StoredProcedure,commandTimeout:120);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeleteCompQuartersNetProfit(Int64 CompQNProfitID)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CompQNProfitID", CompQNProfitID);

                await _connection.ExecuteAsync(ProcedureNames.usp_deleteCompQuartersNetProfit, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

    }
}
