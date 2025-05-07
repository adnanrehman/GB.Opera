using Commons;
using CompanyMutualFunds;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnershipFacts
{
    public class CompanyOwnershipFactDto
    {
        public Int64 CompOwnershipID { get; set; }
        public Int64 GBOwnershipID { get; set; }
        public string? Facts { get; set; }
        public string? aFacts { get; set; }
        public decimal Figures { get; set; }
    }

    public class CompanyOwnershipFactEditDto
    {
        public Int64? CompOwnershipID { get; set; }
        public int GBOwnershipID { get; set; }
        public int CompanyID { get; set; }
        public int ParentID { get; set; }
        public string? Facts { get; set; }
        public decimal Value { get; set; }
    }

}
