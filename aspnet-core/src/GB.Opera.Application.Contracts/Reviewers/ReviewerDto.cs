using Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Reviewers
{
    public class ReviewerDto
    {
        public long ReviewerID { get; set; }

    }

    public class ReviewReportDto
    {
        public string? Ticker { get; set; }
        public string? AsOfDate { get; set; }
        public string? Account { get; set; }
        public decimal? Value { get; set; }
        public int Year { get; set; }
        public string? QPeriod { get; set; }
        public int CustomOrder { get; set; }
    }

    public class ReviewReportOutputDto
    {
        public ReviewReportOutputDto()
        {
            Reviewers = new List<ReviewerDto>();
            ReviewersNew = new List<ReviewerDto>();
            IncomeStatement = new List<ReviewReportDto>();
            CashFlow = new List<ReviewReportDto>();
        }
        public List<ReviewerDto> Reviewers { get; set; }
        public List<ReviewerDto> ReviewersNew { get; set; }
        public List<ReviewReportDto> IncomeStatement { get; set; }
        public List<ReviewReportDto> BalanceSheet { get; set; }
        public List<ReviewReportDto> CashFlow { get; set; }
    }

}
