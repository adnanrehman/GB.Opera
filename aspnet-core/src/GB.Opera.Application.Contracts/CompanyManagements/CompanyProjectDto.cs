using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyManagements
{
    public class CompanyProjectDto
    {
        public int ProjectID { get; set; }
        public int CompanyID { get; set; }
        public int ProjectStatusID { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Name { get; set; }
        public string? AName { get; set; }
        public string Description { get; set; }
        public string ADescription { get; set; }
        public string ProjectStatus { get; set; }
        public bool Active { get; set; }

    }
}
