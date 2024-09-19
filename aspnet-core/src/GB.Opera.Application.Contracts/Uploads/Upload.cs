using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.Uploads
{
    public  class Upload
    {
        public int FinancialsID { get; set; }

        public int CompanyID { get; set; }

        public DateTime AsOfDate { get; set; }

        public string Ticker { get; set; }

        public string Year { get; set; }

        public string Period { get; set; }

        public string IsYearly { get; set; }

        public string EntryUser { get; set; }

        public string ReEntryUser { get; set; }

        public string QPeriodID { get; set; }
    }

}
