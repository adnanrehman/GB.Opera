using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyManagements
{
    public class CompanyFinancialOverviewDto
    {
        public int OverviewID { get; set; }
        public int CompanyID { get; set; }
        public DateTime? ListedDate { get; set; }
        public int? Employees { get; set; }
        public decimal? InitialCapital { get; set; }
        public decimal? AuthorizedCapital { get; set; }
        public decimal? SubscribedCapital { get; set; }
        public decimal? PaidupCapital { get; set; }
        public int? OutstandingShares { get; set; }
        public float? ParValuePerShare { get; set; }
        public int? TreasuryStocks { get; set; }
        public decimal? Beta { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime? GulfbaseUpdateDate { get; set; }

    }
}
