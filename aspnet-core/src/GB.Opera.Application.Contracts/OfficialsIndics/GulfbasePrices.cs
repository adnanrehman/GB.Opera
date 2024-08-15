using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.OfficialsIndics
{
    public  class GulfbasePrices
    {
       public bool IsActive { get; set; }

        public Int64 GulfbaseIndexID { get; set; }
        public string StockMarket { get; set; }
        public string Sector { get; set; }
        public decimal IndexValue { get; set; }

        public DateTime LastUpdated { get; set; }

       public decimal PreviousValue { get; set; }
        public decimal Volume { get; set; }

        public bool ISCapSize { get; set; }
    }
}
