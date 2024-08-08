using Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CountryAccounts
{
    public class CountryAccountDto
    {
        public int CountryID { get; set; }
        public int? ESDFactID { get; set; }
        public int? ParentID { get; set; }
        public string? CountryCustomFactName { get; set; }
        public string? ACountryCustomFactName { get; set; }
    }

}
