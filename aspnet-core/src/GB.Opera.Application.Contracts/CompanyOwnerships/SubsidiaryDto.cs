using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnerships
{
    public class SubsidiaryDto
    {
        public int SubsidiaryID { get; set; }
        public int CompanyID { get; set; }
        public string? Country { get; set; }
        public string? ACountry { get; set; }
        public string? SubsidiaryCompany { get; set; }
        public string? ASubsidiaryCompany { get; set; }
        public string? Share { get; set; }
        public string? PrincipalActivity { get; set; }
        public string? APrincipalActivity { get; set; }
        public int? CustomOrder { get; set; }
        public int? CompanyTypeID { get; set; }

    }
}
