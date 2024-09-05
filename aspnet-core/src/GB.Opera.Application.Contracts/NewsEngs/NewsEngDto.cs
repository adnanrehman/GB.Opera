﻿using Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NewsEngs
{
    public class NewsEngDto
    {
        public int NewsID { get; set; }
        public int? GCCID { get; set; }
        public int? NewsCategoryID { get; set; }
        public int? CompanyID { get; set; }
        public DateTime? Date { get; set; }
        public string? Title { get; set; }
        public string? SubTitle { get; set; }
        public string? Source { get; set; }
        public string? Description { get; set; }
        public bool? IsHome { get; set; }
        public int? GulfBaseSectorID { get; set; }
        public bool? Islamic { get; set; }
    }

}