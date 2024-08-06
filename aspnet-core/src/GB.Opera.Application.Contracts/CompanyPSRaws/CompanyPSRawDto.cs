using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyPSRaws
{
    public class CompanyPSRawDto
    {
        public Int64 CompServiceID { get; set; }
        public int CompanyID { get; set; }
        public int ProductServiceRawID { get; set; }
        public int ParentID { get; set; }
        public decimal? ServiceRange { get; set; }
        public DateTime? ServiceStart { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public bool IsActive { get; set; }

    }

    public class CompanyPSRawOutputDto
    {
        public CompanyPSRawOutputDto()
        {
            CompanyPSRaws = new List<CompanyPSRawDto>();
        }
        public int ProductServiceRawID { get; set; }
        public List<CompanyPSRawDto> CompanyPSRaws { get; set; }
    }
}
