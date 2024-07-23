using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GB.Opera.AccountsClassifications
{
    public  class GbAcFactsAccount
    {
        public short AcFactID { get; set; }
          
        [StringLength(100)]
        public string AcFact { get; set; }
        public short ParentID { get; set; }

        public string AacFact { get; set; }

        public bool IsACAccount { get; set; }

        public bool IsTitle { get; set; }

        public short GBFactID { get; set; }
    }

}
