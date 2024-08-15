using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.OfficialsIndics
{
    public interface IOfficialIndicsAppService : IApplicationService
    {
        public Task<List<OfficialIndics>> GetOfficialIndics(DateTime PriceDate, Int16 StockMarketID);

        public Task<List<GulfbasePrices>> Getgulfbaseprices(DateTime PriceDate);

        public Task<List<GlobalIndices>> GetGlobalIndices(DateTime PriceDate);

        public   Task<List<MFundCompanies>> GetMFundCompanies();

        public Task<List<MFunds>> GetAllFunds(Int16 CompanyID);

        public   Task<List<MFundPrices>> GetAllFundPrices(Int64 MFundID);

    }
}
