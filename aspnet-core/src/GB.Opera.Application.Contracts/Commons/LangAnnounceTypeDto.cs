using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class LangAnnounceTypeDto
    {
        public LangAnnounceTypeDto()
        {
            LanguageTypes = new List<LanguageTypeDto>();
            AnnouncementTypes = new List<AnnouncementTypeDto>();
        }
        public List<LanguageTypeDto> LanguageTypes { get; set; }
        public List<AnnouncementTypeDto> AnnouncementTypes { get; set; }
    }

    public class LanguageTypeDto
    {
        public int LanguageTypeID { get; set; }
        public string? LanguageType { get; set; }
    }
    public class AnnouncementTypeDto
    {
        public int AnnouncementTypeID { get; set; }
        public string? AnnouncementType { get; set; }
    }

}
