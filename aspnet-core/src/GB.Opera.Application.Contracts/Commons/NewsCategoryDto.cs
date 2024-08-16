using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class NewsCategoryDto
    {
        public int NewsCategoryID { get; set; }
        public string? NewsCategory { get; set; }
        public string? ANewsCategory { get; set; }
    }

    public class GetNewsCatAndCountriesDto
    {
        public GetNewsCatAndCountriesDto()
        {
            NewsCategories = new List<NewsCategoryDto>();
            Countries = new List<CountryDto>();
        }
        public List<NewsCategoryDto> NewsCategories { get; set; }
        public List<CountryDto> Countries { get; set; }
    }
}
