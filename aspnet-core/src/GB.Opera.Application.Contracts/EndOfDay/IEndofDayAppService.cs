using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.EndOfDay
{
    public  interface IEndofDayAppService :  IApplicationService
    {
        public Task<List<GCCSector>> GetAllGCCSector();

        public   Task<List<EODPrices>> EODPrices(DateTime PriceDate, Int16 StockMarketID);
        //Task<string> ImportPrices(string filePath);
        Task<string> ImportPrices(List<FundPricesImportDto> list);

	}
}
