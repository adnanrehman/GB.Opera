using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.AccountsClassifications
{
    public  class ACFactsDtos
    {
        public short AcFactId { get; set; }
        public short ParentId { get; set; }
        public string  AcFact { get; set; }
        public string Parent { get; set; }

        public string AAcFact { get; set; }
    }
}
