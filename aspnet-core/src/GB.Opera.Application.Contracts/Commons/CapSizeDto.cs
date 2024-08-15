using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class FactsOwnershipMappingDto
    {
        public int GBOwnershipID { get; set; }
        public int ParentID { get; set; }
        public string? GBOwnership { get; set; }
        public string? AGBOwnership { get; set; }
    }
}
