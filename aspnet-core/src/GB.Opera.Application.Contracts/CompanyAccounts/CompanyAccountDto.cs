using Commons;
using CompanyMutualFunds;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyAccounts
{
    public class CompanyAccountDto
    {

    }

    public class CompanyGBFactMappingDto
    {
        public Int64 CompanyID { get; set; }
        public int GBFactID { get; set; }
        public int ParentID { get; set; }
        public string? CustomFactName { get; set; }
        public string? ACustomFactName { get; set; }
    }

}
