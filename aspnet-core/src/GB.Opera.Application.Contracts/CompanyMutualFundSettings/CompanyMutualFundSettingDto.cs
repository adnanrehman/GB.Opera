using Commons;
using CompanyMutualFunds;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyMutualFundSettings
{
    public class CompanyMutualFundSettingDto
    {

    }

    public class CompanyMutualFundSettingDropdownDto
    {
        public CompanyMutualFundSettingDropdownDto()
        {
            AssetsAllocations = new List<AssetsAllocationDto>();
            Benchmarks = new List<BenchmarkDto>();
            MFCategories = new List<MFCategoryDto>();
            MFClassifications = new List<MFClassificationDto>();
            GeoDiversifications = new List<GeoDiversificationDto>();
            MFListings = new List<MFListingDto>();
            MajorInvestments = new List<MajorInvestmentDto>();
            PortfolioTypes = new List<PortfolioTypeDto>();
            MFRisks = new List<MFRiskDto>();
            SectorDiversifications = new List<SectorDiversificationDto>();
            MFSubCategories = new List<MFSubCategoryDto>();
        }
        public List<AssetsAllocationDto> AssetsAllocations { get; set; }
        public List<BenchmarkDto> Benchmarks { get; set; }
        public List<MFCategoryDto> MFCategories { get; set; }
        public List<MFClassificationDto> MFClassifications { get; set; }
        public List<GeoDiversificationDto> GeoDiversifications { get; set; }
        public List<MFListingDto> MFListings { get; set; }
        public List<MajorInvestmentDto> MajorInvestments { get; set; }
        public List<PortfolioTypeDto> PortfolioTypes { get; set; }
        public List<MFRiskDto> MFRisks { get; set; }
        public List<SectorDiversificationDto> SectorDiversifications { get; set; }
        public List<MFSubCategoryDto> MFSubCategories { get; set; }
    }

}
