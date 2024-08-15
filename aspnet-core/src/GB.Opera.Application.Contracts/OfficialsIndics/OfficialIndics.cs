using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.OfficialsIndics
{
    public  class OfficialIndics
    {
        public bool IsActive { get; set; }

        public Int64 OfficialIndexID { get; set; }

        public string  StockMarket { get; set; }

        public string Sector { get; set; }

        public decimal Opening { get; set; }
        public decimal Closing { get; set; }
        public decimal Highest { get; set; }
        public decimal Lowest { get; set; }
        public decimal Volume { get; set; }
        public decimal Transactions { get; set; }
        public decimal TradingValue { get; set; }
        public DateTime LastUpdated { get; set; }
        public decimal PreviousClose { get; set; }
    }
}
