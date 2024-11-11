using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Countries
{
    public interface ICountryAppService : IApplicationService
    {
        Task<CountryInputDto> GetCountryInfos(int countryID);
        Task InsertCountryInfo(CountryInfoDto model);
        Task InsertBank(BankDto model);
        Task InsertBroker(BrokerDto model);
        Task InsertEconomicIndicator(EconomicIndicatorDto model);

    }
}

