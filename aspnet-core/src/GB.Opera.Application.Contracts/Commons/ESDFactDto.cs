using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class ESDFactDto
    {
        public int ESDFactID { get; set; }
        public int ParentID { get; set; }
        public string? ESDFact { get; set; }
        public string? AESDFact { get; set; }
    }
}
