using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.CountryProfile
{
    public  class AssignSection
    {
        public Int32 CPAdSectionID { get; set; }
        public Int32 CPSectionID { get; set; }

        public string CPSectionTitle { get; set; }

        public string ACPSectionTitle { get; set; }
        public Int32 CountryProfileID { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsActive { get; set; }
    }
}
