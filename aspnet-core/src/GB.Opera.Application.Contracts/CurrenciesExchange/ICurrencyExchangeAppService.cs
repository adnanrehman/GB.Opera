using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace GB.Opera.CurrenciesExchange
{
    public  interface ICurrencyExchangeAppService : IApplicationService
    {
        public   Task<List<CurrencyExchangeDto>> GetCurrency(DateTime Date);

        public Task usp_InsertCurrencyExchange(List<CurrencyExchangeDto> list);
    }
}
