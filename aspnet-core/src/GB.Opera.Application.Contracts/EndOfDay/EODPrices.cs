using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.EndOfDay
{
    public  class EODPrices
    {
        public bool IsActive { get; set; }
        public string StockMarket { get; set; }

        public string Ticker { get; set; }

        public Int64 PriceID { get; set; }

        public double OpeningPrice { get; set; }

        public double HighestPrice { get; set; }
        public double LowestPrice { get; set; }
        public double ClosingPrice { get; set; }
        public double TradingVolume { get; set; }
        public double TradingValue { get; set; }
        public Int64 Trades { get; set; }
        public double LastClosedPrice { get; set; }

        public DateTime LastUpdated { get; set; }

        public short CompanyID { get; set; }
 
    }
}
