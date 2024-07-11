using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class CompaniesTickerDto
    {
        public int CompanyID { get; set; }
        public string? Ticker { get; set; }
    }
}
