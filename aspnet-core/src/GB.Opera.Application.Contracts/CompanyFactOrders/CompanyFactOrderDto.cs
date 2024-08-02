using Commons;
using CompanyMutualFunds;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyFactOrders
{
    public class CompanyFactOrderDto
    {
        public Int64 CompanyFactOrdrID { get; set; }
        public int CompanyID { get; set; }
        public int GBFactIDOrder { get; set; }
        public string? FactName { get; set; }
        public decimal CustomOrder { get; set; }
        public bool IsActive { get; set; }
        public bool CheckMe { get; set; }
        public bool IsQuarterly { get; set; }
        public bool? IRy { get; set; }
        public bool? IRq { get; set; }
    }

}
