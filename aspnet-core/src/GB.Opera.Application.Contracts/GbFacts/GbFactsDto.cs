using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Gb.Opera.GbFacts
{
    public class GbFactsDto
    {
        public int GBFactID { get; set; }
        public string GBFact { get; set; }
        public string AGBFact { get; set; }
        public bool IsGBAccount { get; set; }
        public bool IsTitle { get; set; }
    }
}
