using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyManagements
{
    public class AuditorDto
    {
        public int AuditorID { get; set; }
        public int CompanyID { get; set; }
        public string? Title { get; set; }
        public string? ATitle { get; set; }
        public string? Auditor { get; set; }
        public string? AAuditor { get; set; }
        public DateTime? Since { get; set; }
        public DateTime? Till { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? GulfbaseUpdateDate { get; set; }

    }
}
