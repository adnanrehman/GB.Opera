using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyMutualFunds
{
    public interface ICompanyMutualFundAppService : IApplicationService
    {
        Task<GetCompanyMutualFundsDto> GetCompanyMutualFunds(int companyID);
        Task<CompanyMutualFundDto> CreateOrUpdateCompanyMutualFund(CompanyMutualFundDto model);

    }
}
