using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyCurrentValues
{
    public interface ICompanyCurrentValuesAppService : IApplicationService
    {

        public Task<List<CompanyCurrentValuesdtos>> GetCompanyCurrentValues(int companyID);
    }
}
