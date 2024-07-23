using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Companies
{
    public class CompanyDto
    {
        public int CompanyID { get; set; }
        public string? Company { get; set; }
        public string? ACompany { get; set; }
        public string? Ticker { get; set; }
        public string? ATicker { get; set; }
        public int StockMarketID { get; set; }
        public int SectorID { get; set; }
        public int CapSizeID { get; set; }
        public int GBSectorID { get; set; }
        public int GBIndustrialGroupsID { get; set; }
        public int GBIndustryID { get; set; }
        public int InternalCategoryID { get; set; }
        public string? Overview { get; set; }
        public string? AOverview { get; set; }
        public string? BusinessActivity { get; set; }
        public string? ABusinessActivity { get; set; }
        public string? Ownership { get; set; }
        public string? AOwnership { get; set; }
        public string? Branches { get; set; }
        public string? ABranches { get; set; }
        public string? YearEnd { get; set; }
        public bool MainCompany { get; set; }
        public bool HasFunds { get; set; }
        public bool Attributes { get; set; }
        public bool ActiveIndices { get; set; }
        public int FinancialCurrencyID { get; set; }
        public int TradingMainCurrencyID { get; set; }
        public int TradingSubCurrencyID { get; set; }
        public byte[]? Logo { get; set; }
        public DateTime EstablishmentDate { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
        public int OrderID { get; set; }
        public string? AlternativeTicker { get; set; }
        public string? StockTicker { get; set; }
        public string? EnglishShortName { get; set; }

    }
}
