using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.EndOfDay
{
    public  class GCCSector
    {
        public string Abbr { get; set; }

        public int StockMarketID { get; set; }

        public string StockMarket { get; set; }

        public string Country { get; set; }
        public string CountryGroup { get; set; }
        public string AAbbr { get; set; }
        public string AStockMarket { get; set; }
        public string ACountryGroup { get; set; }

    }
}
