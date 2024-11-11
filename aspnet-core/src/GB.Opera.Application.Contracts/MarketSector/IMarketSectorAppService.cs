using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GB.Opera.MarketSector
{
    public  interface IMarketSectorAppService
    {
        public   Task<MarketSectorDto> GetMarketsInfo(Int16 MarketID);

        public Task InsertCountryGroup(InsertmarketsectorDto model);
    }
}
