using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyMutualFunds
{
    public class CompanyMutualFundDto
    {
        public Int64 MFundID { get; set; }
        public int? CompanyID { get; set; }
        public string? Name { get; set; }
        public string? AName { get; set; }
        public string? ShortName { get; set; }
        public string? AShortName { get; set; }
        public string? Manager { get; set; }
        public string? AManager { get; set; }
        public int? CurrencyID { get; set; }
        public int? CategoryID { get; set; }
        public int? SubCategoryID { get; set; }
        public int? ClassificationID { get; set; }
        public int? ListingID { get; set; }
        public decimal? ManagementFee { get; set; }
        public string? ManagementFeeType { get; set; }
        public string? AManagementFeeType { get; set; }
        public string? FeeDescription { get; set; }
        public string? AFeeDescription { get; set; }
        public DateTime? DateOfInception { get; set; }
        public decimal? PriceAtInception { get; set; }
        public decimal? MinimumInitialSubscription { get; set; }
        public Int64? AdditionalSubscription { get; set; }
        public int? PortfolioTypeID { get; set; }
        public string? InvestmentManager { get; set; }
        public string? AInvestmentManager { get; set; }
        public string? Administrator { get; set; }
        public string? AAdministrator { get; set; }
        public string? Auditor { get; set; }
        public string? AAuditor { get; set; }
        public string? Custodian { get; set; }
        public string? ACustodian { get; set; }
        public string? ManagementTeam { get; set; }
        public string? AManagementTeam { get; set; }
        public string? SubscriptionDeadLine { get; set; }
        public string? ASubscriptionDeadLine { get; set; }
        public string? RedemptionDeadLine { get; set; }
        public string? ARedemptionDeadLine { get; set; }
        public string? ValuationDate { get; set; }
        public string? AValuationDate { get; set; }
        public string? AnnounceOn { get; set; }
        public string? AAnnounceOn { get; set; }
        public int? RiskID { get; set; }
        public decimal? FundAssets { get; set; }
        public string? FundBenchMark { get; set; }
        public string? AFundBenchMark { get; set; }
        public string? FundObjective { get; set; }
        public string? AFundObjective { get; set; }
        public string? InvestmentPolicy { get; set; }
        public string? AInvestmentPolicy { get; set; }
        public string? RiskProfile { get; set; }
        public string? ARiskProfile { get; set; }
        public string? FundsBenefits { get; set; }
        public string? AFundsBenefits { get; set; }
        public string? FundsComponents { get; set; }
        public string? AFundsComponents { get; set; }
        public string? FundManagerComments { get; set; }
        public string? AFundManagerComments { get; set; }
        public string? UnitPriceCalculation { get; set; }
        public string? AUnitPriceCalculation { get; set; }
        public int? BenchmarkID { get; set; }
        public string? City { get; set; }
        public string? ACity { get; set; }
        public string? StreetAddress { get; set; }
        public string? AStreetAddress { get; set; }
        public string? Website { get; set; }
        public string? Email { get; set; }
        public string? POBox { get; set; }
        public string? APOBox { get; set; }
        public string? PinCode { get; set; }
        public string? Telex { get; set; }
        public string? ATelex { get; set; }
        public string? Telephone { get; set; }
        public string? Cell { get; set; }
        public string? Fax { get; set; }
        public string? SearchTags { get; set; }
        public string? ASearchTags { get; set; }
        public string? PageDescription { get; set; }
        public string? APageDescription { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool? IsActive { get; set; }

    }

    public class MFundGeoDiversPercentDto
    {
        public Int64 MFundGeoDiversPercentID { get; set; }
        public Int64 MFundID { get; set; }
        public int GeoDiversificationID { get; set; }
        public decimal Value { get; set; }
    }
    public class MFundAssestAllocsPercentDto
    {
        public Int64 MFundAssestAllocsPercentID { get; set; }
        public Int64 MFundID { get; set; }
        public int AssetsAllocationID { get; set; }
        public decimal Value { get; set; }
    }
    public class MFundMajorInvestPercentDto
    {
        public Int64 MFundMajorInvestPercentID { get; set; }
        public Int64 MFundID { get; set; }
        public int MajorInvestmentID { get; set; }
        public string? Value { get; set; }
    }
    public class MFundSectorDiversPercentDto
    {
        public Int64 MFundSectorDiversPercentID { get; set; }
        public Int64 MFundID { get; set; }
        public int SectorDiversificationID { get; set; }
        public decimal Value { get; set; }
    }

    public class GetCompanyMutualFundsDto
    {
        public GetCompanyMutualFundsDto()
        {
            CompanyMutualFunds = new List<CompanyMutualFundDto>();
            MFundGeoDiversPercents = new List<MFundGeoDiversPercentDto>();
            MFundAssestAllocsPercents = new List<MFundAssestAllocsPercentDto>();
            MFundMajorInvestPercents = new List<MFundMajorInvestPercentDto>();
            MFundSectorDiversPercents = new List<MFundSectorDiversPercentDto>();
        }
        public List<CompanyMutualFundDto> CompanyMutualFunds { get; set; }
        public List<MFundGeoDiversPercentDto> MFundGeoDiversPercents { get; set; }
        public List<MFundAssestAllocsPercentDto> MFundAssestAllocsPercents { get; set; }
        public List<MFundMajorInvestPercentDto> MFundMajorInvestPercents { get; set; }
        public List<MFundSectorDiversPercentDto> MFundSectorDiversPercents { get; set; }
    }
}
