using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace GB.Opera.CountryProfile
{
    public  class CPsection
    {
        public Int32 CPSectionID { get; set; }
        public string  CPSectionName { get; set; }
        public string ACPSectionName { get; set; }
        public bool IsDefault { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsActive { get; set; }
    }
}
