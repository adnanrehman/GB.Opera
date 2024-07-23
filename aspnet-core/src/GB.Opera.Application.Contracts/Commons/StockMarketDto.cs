using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class StockMarketDto
    {
        public int StockMarketID { get; set; }
        public string? StockMarket { get; set; }
        public string? AStockMarket { get; set; }
        public string? Abbr { get; set; }
        public string? AAbbr { get; set; }
    }
}
