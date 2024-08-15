using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyMutualFundSettings
{
    public interface ICompanyMutualFundSettingAppService : IApplicationService
    {
        Task<CompanyMutualFundSettingDropdownDto> GetCompanyMutualFundSettings();
        //Task<CompanyMutualFundDto> CreateOrUpdateCompanyMutualFund(CompanyMutualFundDto model);

    }
}
