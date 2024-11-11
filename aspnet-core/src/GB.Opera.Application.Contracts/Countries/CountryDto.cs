using Commons;
using CountryGroups;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Countries
{
    public class CountryInfoDto
    {
        public int CountryID { get; set; }
        public int CountryGroupID { get; set; }
        public string Country { get; set; }
        public string ACountry { get; set; }
        public string Abbr { get; set; }
        public string? CountryDescription { get; set; }
        public string? ACountryDescription { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
        public int CountryProfileID { get; set; }
        public string? CountryProfileName { get; set; }
        public string? ACountryProfileName { get; set; }
        public string? EconIndicatorName { get; set; }
        public string? AEconIndicatorName { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
    }

    public class CountryInputDto
    {
        public CountryInputDto()
        {
            CountryGroups = new List<CountryGroupDto>();
            Countries = new List<CountryDto>();
            CountryInfos = new List<CountryInfoDto>();
            Banks = new List<BankDto>();
            Brokers = new List<BrokerDto>();
            EconomicIndicators = new List<EconomicIndicatorDto>();
            EconomicIndicatorTypes = new List<EconomicIndicatorTypeDto>();
            ValueDeterminations = new List<ValueDeterminationDto>();
        }
        public List<CountryGroupDto> CountryGroups { get; set; }
        public List<CountryDto> Countries { get; set; }
        public List<CountryInfoDto> CountryInfos { get; set; }
        public List<BankDto> Banks { get; set; }
        public List<BrokerDto> Brokers { get; set; }
        public List<EconomicIndicatorDto> EconomicIndicators { get; set; }
        public List<EconomicIndicatorTypeDto> EconomicIndicatorTypes { get; set; }
        public List<ValueDeterminationDto> ValueDeterminations { get; set; }
    }

    public class BankDto
    {
        public int BankID { get; set; }
        public int CountryProfileID { get; set; }
        public string Bank { get; set; }
        public string ABank { get; set; }
        public string? City { get; set; }
        public string? ACity { get; set; }
        public string? Address { get; set; }
        public string? AAddress { get; set; }
        public string? Tel { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? WebSite { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool? IsActive { get; set; }
    }

    public class BrokerDto
    {
        public int BrokerID { get; set; }
        public int CountryProfileID { get; set; }
        public string Broker { get; set; }
        public string ABroker { get; set; }
        public string? City { get; set; }
        public string? ACity { get; set; }
        public string? Address { get; set; }
        public string? AAddress { get; set; }
        public string? Tel { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? WebSite { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool? IsActive { get; set; }
    }

    public class EconomicIndicatorDto
    {
        public int EconomicIndicatorID { get; set; }
        public int EconomicIndicatorTypeID { get; set; }
        public int CountryProfileID { get; set; }
        public int Year { get; set; }
        public decimal Value { get; set; }
        public int ValueDeterminationID { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public string? IndicatorType { get; set; }
        public string? ValueIn { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool? IsActive { get; set; }
    }

    public class EconomicIndicatorTypeDto
    {
        public int EconomicIndicatorTypeID { get; set; }
        public string EconomicIndicatorType { get; set; }
        public DateTime CreationDate { get; set; }
    }

    public class ValueDeterminationDto
    {
        public int ValueDeterminationID { get; set; }
        public string ValueDetermination { get; set; }
        public DateTime CreationDate { get; set; }
    }


}
