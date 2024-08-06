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
        //Task<CompanyPSRawDto> CreateOrUpdateCompanyPSRaw(CompanyPSRawDto model);
        //Task DeleteCompanyPSRaw(Int64 CompanyPSRawID);

    }
}
