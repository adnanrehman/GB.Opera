using Dapper;
using System;
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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EstimatesandForecasts
{
    public class EstimatesandForecastAppService : ApplicationService, IEstimatesandForecastAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public EstimatesandForecastAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<EstimatesandForecastOutputDto> GetEstimatesandForecasts(int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync("[usp_getEstimatesandForecasts]",
                    param: new { @CompanyID = companyID },
                commandType: CommandType.StoredProcedure);
                var output = new EstimatesandForecastOutputDto();
                output.EstimatesandForecasts = reader.Read<EstimatesandForecastDto>().ToList();
                output.ReportSources = reader.Read<ReportSourceDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<EstimatesandForecastDto> CreateOrUpdateEstimatesandForecast(EstimatesandForecastDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@EFID", model.EFID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Year", model.Year);
                parameters.Add("@AsofDate", model.AsofDate);
                parameters.Add("@ReportDate", model.ReportDate);
                parameters.Add("@ReportSourceID", model.ReportSourceID);
                parameters.Add("@Remarks", model.Remarks);
                parameters.Add("@ARemarks", model.ARemarks);
                parameters.Add("@Revenue", model.Revenue);
                parameters.Add("@NetProfit", model.NetProfit);
                parameters.Add("@TotalAssets", model.TotalAssets);
                parameters.Add("@TotalLiabilities", model.TotalLiabilities);
                parameters.Add("@OwnersEquity", model.OwnersEquity);
                parameters.Add("@FairValue", model.FairValue);
                parameters.Add("@EPS", model.EPS);
                parameters.Add("@PE", model.PE);
                parameters.Add("@PB", model.PB);
                parameters.Add("@Recommendation", model.Recommendation);
                parameters.Add("@ARecommendation", model.ARecommendation);

                await _connection.ExecuteAsync("usp_InsetUpdateEstimatesandForecasts", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
