using Companies;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class CompanyWithHasFundDto
    {
        public CompanyWithHasFundDto()
        {
            Companies = new List<CompanyDto>();
            AssetsAllocations = new List<AssetsAllocationDto>();
            GeoDiversifications = new List<GeoDiversificationDto>();
            SectorDiversifications = new List<SectorDiversificationDto>();
            MajorInvestments = new List<MajorInvestmentDto>();
            Benchmarks = new List<BenchmarkDto>();
            Currencies = new List<CurrencyDto>();
            PortfolioTypes = new List<PortfolioTypeDto>();
            MFListings = new List<MFListingDto>();
            MFRisks = new List<MFRiskDto>();
            MFClassifications = new List<MFClassificationDto>();
            MFCategories = new List<MFCategoryDto>();
            MFSubCategories = new List<MFSubCategoryDto>();      
        }
        public List<CompanyDto> Companies { get; set; }
        public List<AssetsAllocationDto> AssetsAllocations { get; set; }
        public List<GeoDiversificationDto> GeoDiversifications { get; set; }
        public List<SectorDiversificationDto> SectorDiversifications { get; set; }
        public List<MajorInvestmentDto> MajorInvestments { get; set; }
        public List<BenchmarkDto> Benchmarks { get; set; }
        public List<CurrencyDto> Currencies { get; set; }
        public List<PortfolioTypeDto> PortfolioTypes { get; set; }
        public List<MFListingDto> MFListings { get; set; }
        public List<MFRiskDto> MFRisks { get; set; }
        public List<MFClassificationDto> MFClassifications { get; set; }
        public List<MFCategoryDto> MFCategories { get; set; }
        public List<MFSubCategoryDto> MFSubCategories { get; set; }
    }

    public class AssetsAllocationDto
    {
        public int AssetsAllocationID { get; set; }
        public string? AssetsAllocation { get; set; }
        public string? AAssetsAllocation { get; set; }
        public bool IsActive { get; set; }
    }
    public class GeoDiversificationDto
    {
        public int GeoDiversificationID { get; set; }
        public string? GeoDiversification { get; set; }
        public string? AGeoDiversification { get; set; }
        public bool IsActive { get; set; }
    }

    public class SectorDiversificationDto
    {
        public int SectorDiversificationID { get; set; }
        public string? SectorDiversification { get; set; }
        public string? ASectorDiversification { get; set; }
        public int? SectorID { get; set; }
        public int? StockMarketID { get; set; }
        public bool IsActive { get; set; }
    }
    public class MajorInvestmentDto
    {
        public int MajorInvestmentID { get; set; }
        public string? MajorInvestment { get; set; }
        public string? AMajorInvestment { get; set; }
        public int? CompanyID { get; set; }
        public int? StockMarketID { get; set; }
        public bool IsActive { get; set; }
    }
    public class BenchmarkDto
    {
        public int BenchmarkID { get; set; }
        public string? Benchmark { get; set; }
        public string? ABenchmark { get; set; }
        public bool IsActive { get; set; }
    }
    public class PortfolioTypeDto
    {
        public int PortfolioTypeID { get; set; }
        public string? PortfolioType { get; set; }
        public string? APortfolioType { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
    }
    public class MFListingDto
    {
        public int ListingID { get; set; }
        public string? Listing { get; set; }
        public string? AListing { get; set; }
        public bool IsActive { get; set; }
    }
    public class MFRiskDto
    {
        public int RiskID { get; set; }
        public string? Risk { get; set; }
        public string? ARisk { get; set; }
        public bool IsActive { get; set; }
    }
    public class MFClassificationDto
    {
        public int ClassificationID { get; set; }
        public string? Classification { get; set; }
        public string? AClassification { get; set; }
        public bool IsActive { get; set; }
    }
    public class MFCategoryDto
    {
        public int CategoryID { get; set; }
        public string? Category { get; set; }
        public string? ACategory { get; set; }
        public bool IsActive { get; set; }
    }
    public class MFSubCategoryDto
    {
        public int SubCategoryID { get; set; }
        public string? SubCategory { get; set; }
        public string? ASubCategory { get; set; }
        public bool IsActive { get; set; }
    }

}
