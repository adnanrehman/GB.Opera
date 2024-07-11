using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyManagements
{
    public class ContactInformationDto
    {
        public int ContactInfoID { get; set; }
        public int CompanyID { get; set; }
        public string? BranchName { get; set; }
        public string? ABranchName { get; set; }
        public string? City { get; set; }
        public string? ACity { get; set; }
        public string? StreetAddress { get; set; }
        public string? AStreetAddress { get; set; }
        public string? Website { get; set; }
        public string? Email { get; set; }
        public string? POBox { get; set; }
        public string? APOBox { get; set; }
        public string? PinCode { get; set; }
        public string? Telex { get; set; }
        public string? ATelex { get; set; }
        public string? Telephone { get; set; }
        public string? Cell { get; set; }
        public string? Fax { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? GulfbaseUpdateDate { get; set; }

    }
}
