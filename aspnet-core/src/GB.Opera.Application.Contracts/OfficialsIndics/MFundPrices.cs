using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.OfficialsIndics
{
    public  class MFundPrices
    {
        public Int64 MFundPriceID { get; set; }

        public Int64 MFundID { get; set; }
        public DateTime PriceDate { get; set; }
        public decimal ClosingPrice { get; set; }
        public Int64 TradingVolume { get; set; }
        public decimal LastClosePrice { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool IsActive { get; set; }
        

    }
}
