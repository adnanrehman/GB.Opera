using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyManagements
{
    public class ProjectStatusDto
    {
        public int ProjectStatusID { get; set; }
        public string ProjectStatus { get; set; }
        public string AProjectStatus { get; set; }

    }
}
