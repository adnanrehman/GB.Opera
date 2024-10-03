using Commons;
using CompanyManagements;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Numerics;
using System.Text;

namespace CurrentDividends
{
    public class CurrentDividendDto
    {
        public int CurrentDividendID { get; set; }
        public long? CurrentDividend { get; set; }
        public string? Remarks { get; set; }
        public int CompanyID { get; set; }
        public string? Ticker { get; set; }

    }

}
