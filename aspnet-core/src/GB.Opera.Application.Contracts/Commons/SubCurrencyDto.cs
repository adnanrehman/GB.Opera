using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class SubCurrencyDto
    {
        public int SubCurrencyID { get; set; }
        public int CurrencyID { get; set; }
        public string? SubCurrency { get; set; }
        public bool IsActive { get; set; }
    }
}
