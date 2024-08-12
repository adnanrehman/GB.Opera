using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AgencyRatings
{
    public interface IAgencyRatingAppService : IApplicationService
    {
        Task<AgencyRatingDto> GetAgencyRatings(bool isCredit);
        Task<AgencyDto> CreateOrUpdateAgency(AgencyDto input);
        Task<RatingDto> CreateOrUpdateRating(RatingDto input);

    }
}

