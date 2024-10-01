using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace HistoricalCashDividends
{
    public interface IHistoricalCashDividendAppService : IApplicationService
    {
        Task<HistoricalCashDividendListDto> GetHistoricalCashDividends(int companyID);
        Task InsetUpdateHistoricalCashDividends(CreateHistoricalCashDividendDto input);

    }
}
