using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class CountryDto
    {
        public int GCCID { get; set; }
        public int CountryID { get; set; }
        public string? Country { get; set; }
        public string? ACountry { get; set; }
    }
}
