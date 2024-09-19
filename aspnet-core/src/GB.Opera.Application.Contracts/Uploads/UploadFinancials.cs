using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.Uploads
{
    public  class UploadFinancials
    {
        public long FinancialsId { get; set; }
        public short CompanyId { get; set; }
        public DateTime AsOfDate { get; set; }
        public short PeriodTypeId { get; set; }
        public short FinancialEntryTypeId { get; set; }
        public short UserId { get; set; }
        public string Remarks { get; set; }
        public string ARemarks { get; set; }
        public short Year { get; set; }
        public short QPeriodId { get; set; }
        public bool IsYearly { get; set; }
        public string PeriodNote { get; set; }
        public string APeriodNote { get; set; }

        public string Ticker { get; set; }
        public string Period { get; set; }

        public string EntryUser { get; set; }
        public string ReEntryUser { get; set; }

        public short QPeriodID { get; set; }


    } 
}
