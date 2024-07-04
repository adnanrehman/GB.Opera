using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace GbFacts
{
    public class GbFactListDto
    {
        public int GBFactID { get; set; }
        public string? GBFact { get; set; }
        public int ParentId { get; set; }
    }
}
