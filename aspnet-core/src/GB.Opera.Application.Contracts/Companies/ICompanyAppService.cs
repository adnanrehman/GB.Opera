using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Companies
{
    public interface ICompanyAppService : IApplicationService
    {
        Task<List<CompanyDto>> GetCompanies(int sectorID, int stockMarketID);
        public Task<CompanyDto> CreateOrUpdateCompany(CompanyDto model);
    }
}
