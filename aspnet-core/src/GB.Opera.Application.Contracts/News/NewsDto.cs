using Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace News
{
    public class NewsDto
    {
        public int? NewsID { get; set; }
        public int? GCCID { get; set; }
        public int? NewsCategoryID { get; set; }
        public int? CompanyID { get; set; }
        public DateTime? Date { get; set; }
        public string? Title { get; set; }
        public string? SubTitle { get; set; }
        public string? Source { get; set; }
        public string? Description { get; set; }
        public bool? IsHome { get; set; }
        public int? gulfBaseSectorID { get; set; }
        public bool? Islamic { get; set; }
        public bool? ForSocialNetworks { get; set; }
        public bool? IsGulfbaseNews { get; set; }
        public bool? LangID { get; set; }
        
    }

}
