using System;
using System.Collections.Generic;
using System.Text;

namespace EconomicAndStateFacts
{
    public  class ESDFactModel
    {
        public short ESDFactID { get; set; }
        public short ParentID { get; set; }

        public string ESDFact { get; set; }
        public string? AESDFact { get; set; } = "";
        public bool IsTitle { get; set; }
        public bool Daily { get; set; }
        public bool Weekly { get; set; }
        public bool Monthly { get; set; }
        public bool Quarterly { get; set; }
        public bool Yearly { get; set; }
        public bool Forcast { get; set; }

        public string? MeasurementUnit { get; set; }
        public string? Currency { get; set; }
        public short RootParentESDFactID { get; set; }

        public string? Country { get; set; }

        public int? StockMarketID { get; set; }

        public int? CompanyID { get; set; }

        public string? Activity { get; set; }
        public string? ESDFactShortName { get; set; }

        public string? AESDFactShortName { get; set; }

        public int? SectorID { get; set; }


    }
}
