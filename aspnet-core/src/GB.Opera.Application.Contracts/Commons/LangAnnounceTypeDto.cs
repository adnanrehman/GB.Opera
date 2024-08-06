using Companies;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class CompanyQNPDto
    {
        public CompanyQNPDto()
        {
            Companies = new List<CompanyDto>();
            PeriodTypes = new List<PeriodTypeDto>();
            QPeriods = new List<QPeriodDto>();
        }
        public List<CompanyDto> Companies { get; set; }
        public List<PeriodTypeDto> PeriodTypes { get; set; }
        public List<QPeriodDto> QPeriods { get; set; }
    }

    public class PeriodTypeDto
    {
        public int PeriodTypeID { get; set; }
        public string? Period { get; set; }
    }
    public class QPeriodDto
    {
        public int QPeriodID { get; set; }
        public string? QPeriod { get; set; }
    }

}
