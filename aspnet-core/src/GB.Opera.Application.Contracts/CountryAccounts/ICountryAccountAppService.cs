using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CountryAccounts
{
    public interface ICountryAccountAppService : IApplicationService
    {
        Task<List<CountryAccountDto>> GetCountriesFacts(int companyID);
        Task<List<CountryAccountDto>> CreateOrUpdateCountryFact(List<CountryAccountDto> list);

    }
}

