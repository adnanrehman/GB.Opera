using System;
using System.Collections.Generic;
using System.Text;

namespace CompaniesQNetProfits
{
    public class CompaniesQNetProfitDto
    {
        public long CompQNProfitID { get; set; }
        public int CompanyID { get; set; }
        public int Year { get; set; }
        public int QPeriodID { get; set; }
        public DateTime AsOfDate { get; set; }
        public int PeriodTypeID { get; set; }
        public bool IsYearly { get; set; }
        public decimal NetProfit { get; set; }
        public decimal? PreviousNP { get; set; }
        public decimal? NetProfitChange { get; set; }
        public decimal? EPS { get; set; }
        public decimal? PE { get; set; }
        public decimal? FiveYearGrowth { get; set; }
        public DateTime AnnouncementDate { get; set; }
        public string? Remarks { get; set; }
        public string? ARemarks { get; set; }
        public decimal? OwnersEquity { get; set; }
        public decimal? PreviousOwnersEquity { get; set; }
        public decimal? OwnersEquityChange { get; set; }
        public decimal? TotalAssets { get; set; }
        public decimal? PreviousTotalAssets { get; set; }
        public decimal? TotalAssetsChange { get; set; }
        public decimal? Revenues { get; set; }
        public decimal? PreviousRevenues { get; set; }
        public decimal? RevenuesChange { get; set; }
        public string? Ticker { get; set; }
        public string? QPeriod { get; set; }
        public string? Period { get; set; }
    }

    public class CurrencyOutstandingDto
    {
        public string? Currency { get; set; }
        public string? ADescription { get; set; }
        public decimal? OutstandingShares { get; set; }
    }

    public class CompaniesQNetProfitListDto
    {
        public CompaniesQNetProfitListDto()
        {
            CompaniesQNetProfits = new List<CompaniesQNetProfitDto>();
            CurrencyOutstandings = new List<CurrencyOutstandingDto>();
        }
        public List<CompaniesQNetProfitDto> CompaniesQNetProfits { get; set; }
        public List<CurrencyOutstandingDto> CurrencyOutstandings { get; set; }
    }
}
