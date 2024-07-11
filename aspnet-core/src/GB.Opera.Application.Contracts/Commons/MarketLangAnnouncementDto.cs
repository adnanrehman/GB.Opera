using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class MarketLangAnnouncementDto
    {
        public int StockMarketID { get; set; }
        public string? Abbr { get; set; }
    }
}
