using System;
using System.Collections.Generic;
using System.Text;

namespace CompanyCurrentValues
{
    public  class CompanyCurrentValuesdtos
    {
        public string Market { get; set; }

        public string Ticker { get; set; }

        public DateTime AsofDate { get; set; }

        public decimal NetProfit { get; set; }

        public decimal Revenues { get; set; }

        public decimal CashFlow { get; set; }

        public decimal OwnerEquity { get; set; }

        public decimal TotalAssets  { get; set; }

        public decimal CurrentDividends { get; set; }

        public decimal OutstandingShares { get; set; }
    }
}
