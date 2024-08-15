using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CountryFactOrders
{
    public interface ICountryFactOrderAppService : IApplicationService
    {
        Task<List<CountryFactOrderDto>> GetCountryFactOrders(int CountryID);
        Task<List<CountryFactOrderDto>> CreateOrUpdateCountryFactOrder(List<CountryFactOrderDto> list);

    }
}

