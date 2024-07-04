using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class GBIndustrialGroupDto
    {
        public int GBIndustrialGroupID { get; set; }
        public int GBSectorID { get; set; }
        public string? GBIndustrialGroup { get; set; }
    }
}
