using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstimatesandForecasts
{
    public interface IEstimatesandForecastAppService : IApplicationService
    {
        Task<EstimatesandForecastOutputDto> GetEstimatesandForecasts(int companyID);
        Task<EstimatesandForecastDto> CreateOrUpdateEstimatesandForecast(EstimatesandForecastDto model);

    }
}
