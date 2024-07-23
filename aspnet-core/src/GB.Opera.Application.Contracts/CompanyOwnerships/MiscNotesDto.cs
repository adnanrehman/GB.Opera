using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnerships
{
    public class MiscNotesDto
    {
        public int MiscNotesID { get; set; }
        public int CompanyID { get; set; }
        public DateTime? Date { get; set; }
        public string? Note { get; set; }
        public string? ANote { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool IsActive { get; set; }

    }
}
