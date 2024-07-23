using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnerships
{
    public class SisterCompanyDto
    {
        public int SisterCompanyID { get; set; }
        public int CompanyID { get; set; }
        public string? SisterCompany { get; set; }
        public string? ASisterCompany { get; set; }
        public string? Relation { get; set; }
        public string? ARelation { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }

    }
}
