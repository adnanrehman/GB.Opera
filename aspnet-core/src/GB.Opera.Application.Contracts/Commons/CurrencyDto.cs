using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class CurrencyDto
    {
        public int CurrencyID { get; set; }
        public string? Currency { get; set; }
        public string? ACurrency { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
    }
}
