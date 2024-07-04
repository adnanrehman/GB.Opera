using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class CompDropdownDto
    {
        public CompDropdownDto()
        {
            MarketSectors = new List<MarketSectorDto>();
            InternalCategories = new List<InternalCategoryDto>();
            GBIndustrialGroups = new List<GBIndustrialGroupDto>();
            Sectors = new List<SectorDto>();
            CapSizes = new List<CapSizeDto>();
            Currencies = new List<CurrencyDto>();
            Industries = new List<IndustryDto>();
            SubCurrencies = new List<SubCurrencyDto>();
        }
        public List<MarketSectorDto> MarketSectors { get; set; }
        public List<InternalCategoryDto> InternalCategories { get; set; }
        public List<GBIndustrialGroupDto> GBIndustrialGroups { get; set; }
        public List<SectorDto> Sectors { get; set; }
        public List<CapSizeDto> CapSizes { get; set; }
        public List<CurrencyDto> Currencies { get; set; }
        public List<IndustryDto> Industries { get; set; }
        public List<SubCurrencyDto> SubCurrencies { get; set; }
    }
}
