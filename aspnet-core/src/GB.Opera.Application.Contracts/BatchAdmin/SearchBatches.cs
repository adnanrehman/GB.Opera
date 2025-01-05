using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.BatchAdmin
{
    public  class SearchBatches
    {
        public long BatchID { get; set; }   
        public short CountryID { get; set; }   
        public string ReportType { get; set; }   
        public string Source { get; set; }   
        public string ASource { get; set; }   
        public short StatusID { get; set; }   
        public DateTime AsofDate { get; set; }  
        public short EntryUserID { get; set; }   
        public short ReEntryUserID { get; set; }   
        public string Remarks { get; set; }   
        public string ARemarks { get; set; }   
        public DateTime UploadDate { get; set; }   
        public short ESDFactID { get; set; }   
        public string HijriDate { get; set; }   
        public string FileName { get; set; }   
        public string Note { get; set; }   
        public string ANote { get; set; }   
        public Guid GbEntryUserId { get; set; }   
        public Guid GbReEntryUserId { get; set; }   

        public string BatchText { get; set; }

    }
}
