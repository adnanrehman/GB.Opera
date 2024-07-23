using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnerships
{
    public class CompanyFIPDto
    {
        public int FIPID { get; set; }
        public int CompanyID { get; set; }
        public float? PermittedSharesToForeigners { get; set; }
        public float? PermittedSharesToGCCNationals { get; set; }
        public float? PermittedSharesToArabNationals { get; set; }
        public DateTime? PermittedDate { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool IsActive { get; set; }

    }
}
