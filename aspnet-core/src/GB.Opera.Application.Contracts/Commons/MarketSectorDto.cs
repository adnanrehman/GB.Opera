using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class MarketSectorDto
    {
        public int MarketSectorID { get; set; }
        public int SectorID { get; set; }
        public string? Sector { get; set; }
    }
    
}
