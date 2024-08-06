using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EstimatesandForecasts
{
    public class EstimatesandForecastDto
    {
        public Int64 EFID { get; set; }
        public int CompanyID { get; set; }
        public int Year { get; set; }
        public DateTime AsofDate { get; set; }
        public DateTime? ReportDate { get; set; }
        public int ReportSourceID { get; set; }
        public string? Remarks { get; set; }
        public string? ARemarks { get; set; }
        public decimal? Revenue { get; set; }
        public decimal? NetProfit { get; set; }
        public decimal? TotalAssets { get; set; }
        public decimal? TotalLiabilities { get; set; }
        public decimal? OwnersEquity { get; set; }
        public decimal? FairValue { get; set; }
        public decimal? EPS { get; set; }
        public decimal? PE { get; set; }
        public decimal? PB { get; set; }
        public string? Recommendation { get; set; }
        public string? ARecommendation { get; set; }

    }

    public class EstimatesandForecastOutputDto
    {
        public EstimatesandForecastOutputDto()
        {
            EstimatesandForecasts = new List<EstimatesandForecastDto>();
            ReportSources = new List<ReportSourceDto>();
        }
        public List<EstimatesandForecastDto> EstimatesandForecasts { get; set; } 
        public List<ReportSourceDto> ReportSources { get; set; } 

    }

    public class ReportSourceDto
    {
        public int ReportSourceID { get; set; }
        public string? Source { get; set; }
    }
}
