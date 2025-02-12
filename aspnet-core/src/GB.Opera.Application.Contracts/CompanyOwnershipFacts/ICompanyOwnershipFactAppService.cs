using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyOwnershipFacts
{
    public interface ICompanyOwnershipFactAppService : IApplicationService
    {
        Task<List<CompanyOwnershipFactDto>> GetCompanyOwnershipPreview(int companyID);
        Task<CompanyOwnershipFactEditDto> CreateOrUpdateCompanyOwnerships(CompanyOwnershipFactEditDto dto);

         

    }
}

