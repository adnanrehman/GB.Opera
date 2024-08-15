using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.LHRUploads
{
    public  interface ILHRUploadsAppService : IApplicationService
    {
        public   Task<List<LHRUpload>> GetAllStockMarkets();

        public Task<List<Company>> GetCompaniesFromMarket(short StockMarketID);
    }
}
