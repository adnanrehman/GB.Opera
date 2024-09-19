using Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NewsArabs
{
    public class NewsArabDto
    {
        public int NewsID { get; set; }
        public int? GCCID { get; set; }
        public int? NewsCategoryID { get; set; }
        public int? CompanyID { get; set; }
        public DateTime? Date { get; set; }
        public string? ATitle { get; set; }
        public string? ASubTitle { get; set; }
        public string? ASource { get; set; }
        public string? ADescription { get; set; }
        public bool? IsHome { get; set; }
        public int? gulfBaseSectorID { get; set; }
        public bool? Islamic { get; set; }
        public bool? IsSocialmedia { get; set; }
        public bool? Isgulfbase { get; set; }
        public bool? LangID { get; set; }
    }

}
