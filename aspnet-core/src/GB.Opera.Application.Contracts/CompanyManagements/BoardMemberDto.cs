using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyManagements
{
    public class BoardMemberDto
    {
        public int BoardMemberID { get; set; }
        public int CompanyID { get; set; }
        public string? Title { get; set; }
        public string? ATitle { get; set; }
        public string? BoardMember { get; set; }
        public string? ABoardMember { get; set; }
        public DateTime? Since { get; set; }
        public DateTime? Till { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? GulfbaseUpdateDate { get; set; }
        public int? CustomOrder { get; set; }

    }
}
