using Commons;
using CompanyMutualFunds;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AgencyRatings
{
    public class AgencyDto
    {
        public int AgencyId { get; set; }
        public string Agency { get; set; }
        public string? AAgency { get; set; }
        public string? Introduction { get; set; }
        public string? AIntroduction { get; set; }
        public string? Website { get; set; }
        public bool IsCredit { get; set; }
    }

    public class RatingDto
    {
        public int RatingId { get; set; }
        public string Rating { get; set; }
        public string? ARating { get; set; }
        public string? Brief { get; set; }
        public string? ABrief { get; set; }
        public bool IsCredit { get; set; }
    }

    public class AgencyRatingDto
    {
        public AgencyRatingDto()
        {
            Agencies = new List<AgencyDto>();
            Ratings = new List<RatingDto>();
        }
        public List<AgencyDto> Agencies { get; set; }
        public List<RatingDto> Ratings { get; set; }
    }

}
