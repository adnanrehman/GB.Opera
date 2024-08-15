using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyFactOrders
{
    public interface ICompanyFactOrderAppService : IApplicationService
    {
        Task<List<CompanyFactOrderDto>> GetCompaniesFactOrders(int companyID);
        Task<List<CompanyFactOrderDto>> CreateOrUpdateCompanyFactOrder(List<CompanyFactOrderDto> list);

    }
}

