using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyAccounts
{
    public interface ICompanyAccountAppService : IApplicationService
    {
        Task<List<CompanyGBFactMappingDto>> GetCompaniesFacts(int companyID);
        Task<List<CompanyGBFactMappingDto>> CreateOrUpdateCompanyFacts(List<CompanyGBFactMappingDto> list);

    }
}

