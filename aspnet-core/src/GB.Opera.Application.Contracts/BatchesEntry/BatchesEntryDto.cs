using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.BatchesEntry
{
    public class BatchesEntryDto
    {
        public Int64 BatchID { get; set; }
        public Int16 CountryID { get; set; }
        public string? ReportType { get; set; }

        public string? Source { get; set; }

        public string? ASource { get; set; }

        public Int16 StatusID { get; set; }

        public DateTime AsofDate { get; set; }

        public Guid gbEntryUserId { get; set; }

        public Guid gbReEntryUserId { get; set; }
        public string? Remarks { get; set; }
        public string? ARemarks { get; set; }

        public DateTime UploadDate { get; set; }

         public string?  HijriDate { get; set; }
        public string? FileName { get; set; }

        public Int16? ESDFactID { get; set; }

        public string Abbr { get; set; }

        public string? BatchText { get; set; }

    }

    public class ESDFactsMappings
    {
        public Int64 BatchDetailID { get; set; }

        public Int16 ESDFactID { get; set; }

        public Int16 ParentID { get; set; }

        public string ESDFact { get; set; }
        public bool IsTitle { get; set; }

        public decimal Value { get; set; }
    }

    public class BatchesEntries
    {
        public Int64 BatchDetailID { get; set; }

        public Int64 ESDFactID { get; set; }

        public Int64 ParentID { get; set; }

        public bool IsTitle { get; set; }

        public decimal Value { get; set; }

        public Int64 BatchID { get; set; }

        public string? Remarks { get; set; }

        public string? ARemarks { get; set; }  

    }
}