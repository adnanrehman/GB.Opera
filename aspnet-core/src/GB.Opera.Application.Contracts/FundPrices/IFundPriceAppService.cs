using GB.Opera.OfficialsIndics;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace FundPrices
{
    public interface IFundPriceAppService : IApplicationService
    {
        Task InsertMFundPrices(MFundPrices model);
        Task<string> ImportMFundPrices(List<MFundPrices> list);


	}
}

