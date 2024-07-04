using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class CompStockMarketDto
    {
        public int StockMarketID { get; set; }
        public string? Country { get; set; }
        public string? CountryGroup { get; set; }
        public string? Abbr { get; set; }
    }
}
