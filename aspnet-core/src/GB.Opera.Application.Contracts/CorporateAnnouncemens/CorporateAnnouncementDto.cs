using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CorporateAnnouncements
{
    public class CorporateAnnouncementDto
    {
        public Int64 CorporateAnnouncementID { get; set; }
        public int CompanyID { get; set; }
        public int AnnouncementTypeID { get; set; }
        public DateTime AnnouncedDate { get; set; }
        public DateTime? AnnouncedDateTime { get; set; }
        public string? Ticker { get; set; }
        public string? Announcement { get; set; }
        public string? AAnnouncement { get; set; }
        public Int64 GulfbaseID { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }

    }
}
