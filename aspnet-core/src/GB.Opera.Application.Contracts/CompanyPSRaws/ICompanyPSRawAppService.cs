using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyPSRaws
{
    public interface ICompanyPSRawAppService : IApplicationService
    {
        Task<CompanyPSRawOutputDto> GetCompanyPSRaws(int productServiceRawID,int companyID);
        Task<PSRCompanyServiceDto> CreateOrUpdatePSRCompanyService(PSRCompanyServiceDto model);
        Task<PSRCompanyProductDto> CreateOrUpdatePSRCompanyProduct(PSRCompanyProductDto model);
        Task<PSRCompanyRawMaterialDto> CreateOrUpdatePSRCompanyRawMaterial(PSRCompanyRawMaterialDto model);

    }
}
