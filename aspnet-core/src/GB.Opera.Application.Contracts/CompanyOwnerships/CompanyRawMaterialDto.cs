using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnerships
{
    public class CompanyRawMaterialDto
    {
        public int RawMaterialID { get; set; }
        public int CompanyID { get; set; }
        public string? RawMaterial { get; set; }
        public string? ARawMaterial { get; set; }
        public string? CurrentProvider { get; set; }
        public string? ACurrentProvider { get; set; }
        public string? LastProvider { get; set; }
        public string? ALastProvider { get; set; }
        public string? Reason { get; set; }
        public string? AReason { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool? IsActive { get; set; }

    }
}
