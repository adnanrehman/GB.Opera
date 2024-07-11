using CompanyManagements;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyManagements
{
    public interface ICompanyManagementAppService : IApplicationService
    {
        Task<List<CompanyManagementDto>> GetCompaniesManagement(int companyID);
        Task<ManagementDto> CreateOrUpdateCompanyManagement(ManagementDto model);

    }
}
