using Companies;
using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.Uploads
{
    public  class UploadwithHasDtos
    {
        public   UploadwithHasDtos()
        {
            Uploads = new List<Upload>();
            FinancialEntryType = new List<FinancialEntryTypes>();
            Period = new List<Periods>();
            QPeriodType = new List<QPeriodTypes>();
            Companies = new List<CompanyDto>();
        }

        public List<Upload>Uploads { get; set; }
        public List<FinancialEntryTypes> FinancialEntryType { get; set; }

        public List<Periods> Period { get; set; }

        public List<QPeriodTypes> QPeriodType { get; set; }

        public List<CompanyDto> Companies { get; set; }
    }
}
