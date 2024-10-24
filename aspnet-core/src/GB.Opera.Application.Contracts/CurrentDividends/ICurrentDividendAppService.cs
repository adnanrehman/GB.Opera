using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace CurrentDividends
{
    public interface ICurrentDividendAppService : IApplicationService
    {
        Task<List<CurrentDividendDto>> GetCurrentDividends(int stockMarketID);
        Task InsertUpdateCurrentDividends(List<CurrentDividendDto> input);
    }
}
