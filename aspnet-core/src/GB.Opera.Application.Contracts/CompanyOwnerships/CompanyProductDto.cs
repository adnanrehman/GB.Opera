using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnerships
{
    public class CompanyProductDto
    {
        public int CompanyProductID { get; set; }
        public int CompanyID { get; set; }
        public string? CompanyProduct { get; set; }
        public string? ACompanyProduct { get; set; }
        public DateTime? LaunchDate { get; set; }
        public string? LastProduct { get; set; }
        public string? ALastProduct { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool? IsActive { get; set; }

    }
}
