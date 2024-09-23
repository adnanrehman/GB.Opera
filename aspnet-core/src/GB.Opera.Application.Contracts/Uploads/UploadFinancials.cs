using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.Uploads
{
    public  class UploadFinancials
    {
        public long FinancialsID { get; set; }
        public long NewReviewFinancialID { get; set; }
        public int CompanyID { get; set; }
        public DateTime AsOfDate { get; set; }
        public short PeriodTypeID { get; set; }
        public short FinancialEntryTypeID { get; set; }
        public string? FName { get; set; }
        public string? Remarks { get; set; }
        public string? ARemarks { get; set; }
        public short? Year { get; set; }
        public short QPeriodId { get; set; }
        public bool IsYearly { get; set; }
        public string? PeriodNote { get; set; }
        public string? APeriodNote { get; set; }
        public Guid UserID { get; set; }
        public Guid EntryUser { get; set; }
        public Guid ReEntryUser { get; set; }
    } 

    public class UploadFinancialListDto
    {
        public string? Ticker { get; set; }
        public DateTime AsOfDate { get; set; }
        public int? Year { get; set; }
        public string? Period { get; set; }
        public bool IsYearly { get; set; }
        public string? EntryUser { get; set; }
        public string? ReEntryUser { get; set; }

        public int QPeriodID { get; set; }
    }

    public class UploadFinancialOutput
    {
        public long FinancialsID { get; set; }
        public long NewReviewFinancialID { get; set; }
        public string? FName { get; set; }
        public DateTime AsofDate { get; set; }
        public Guid EntryUser { get; set; }
        public Guid ReEntryUser { get; set; }
    }
}
