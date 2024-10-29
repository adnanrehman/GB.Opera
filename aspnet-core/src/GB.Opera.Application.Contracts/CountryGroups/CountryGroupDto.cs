using Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CountryGroups
{
    public class CountryGroupDto
    {
        public int CountryGroupID { get; set; }
        public string CountryGroup { get; set; }
        public string? ACountryGroup { get; set; }
        public int? NumberOfCountries { get; set; }
        public DateTime FormationDate { get; set; }
        public string? Overview { get; set; }
        public string? AOverview { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class CountryGroupInputDto
    {
        public CountryGroupInputDto()
        {
            CountryGroups = new List<CountryGroupDto>();
            Sectors = new List<SectorDto>();
            CapSizes = new List<CapSizeDto>();
            GBSectors = new List<GBSectorDto>();
            GBCapSizes = new List<GBSectorDto>();
        }
        public List<CountryGroupDto> CountryGroups { get; set; }
        public List<SectorDto> Sectors { get; set; }
        public List<CapSizeDto> CapSizes { get; set; }
        public List<GBSectorDto> GBSectors { get; set; }
        public List<GBSectorDto> GBCapSizes { get; set; }
    }

    public class GBSectorDto
    {
        public int GBSectorID { get; set; }
        public int SectorID { get; set; }
        public string? GBSector { get; set; }
        public string? AGBSector { get; set; }
        public bool IsCapSize { get; set; }
        public int CountryGroupID { get; set; }
    }

    public class InsertCountryGroupDto
    {
        public InsertCountryGroupDto()
        {
            CountryGroup = new CountryGroupDto();
            GBSectors = new List<GBSectorDto>();
            GBCapSizes = new List<GBSectorDto>();
        }
        public CountryGroupDto CountryGroup { get; set; }
        public List<GBSectorDto> GBSectors { get; set; }
        public List<GBSectorDto> GBCapSizes { get; set; }
    }


}
