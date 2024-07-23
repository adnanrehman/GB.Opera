using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnerships
{
    public class SubsCompUpdDto
    {
        public int SubsCompUpdID { get; set; }
        public int CompanyID { get; set; }
        public string? Remarks { get; set; }
        public string? ARemarks { get; set; }
        public DateTime? UploadDate { get; set; }
    }
}
