using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CountryGroups
{
    public interface ICountryGroupAppService : IApplicationService
    {
        Task<CountryGroupInputDto> GetCountryGroups();
        Task InsertCountryGroup(InsertCountryGroupDto model);

    }
}

