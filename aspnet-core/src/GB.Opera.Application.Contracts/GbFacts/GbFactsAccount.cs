using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GB.Opera.GbFacts
{
    public  class GbFactsAccount
    {
         
        public short GBFactID { get; set; }
        [Required]
        [StringLength(100)]
        public string GBFact { get; set; }
        public short ParentID { get; set; }

        public string? AGBFact { get; set; }

        public bool  IsGBAccount { get; set; }

        public bool IsTitle { get; set; }

    }
}
