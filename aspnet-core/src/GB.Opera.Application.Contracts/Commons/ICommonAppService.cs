using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Commons
{
    public interface ICommonAppService : IApplicationService
    {
        Task<List<CompStockMarketDto>> GetCompStockMarkets();
        Task<CompDropdownDto> GetCompMSectors(int marketID);

    }
}
