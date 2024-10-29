using CompaniesQNetProfits;
using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.CountryProfile
{
    public  class CountryProfileDto
    {
        public CountryProfileDto()
        {
            AssignSection = new List<AssignSection>();
            CountryProfiles = new List<CountryProfiles>();
            CPsection = new List<CPsection>();
            CPSectionsFalse = new List<CPSectionsFalse>();
             
        }

        public List<AssignSection> AssignSection { get; set; }
        public List<CountryProfiles> CountryProfiles { get; set; }
        public List<CPsection> CPsection { get; set; }

        public List<CPSectionsFalse> CPSectionsFalse { get; set; }

    }
}
