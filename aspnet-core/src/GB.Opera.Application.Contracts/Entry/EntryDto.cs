using Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entry
{
    public class StatusFinancialsDto
    {
        public long FinancialsID { get; set; }
        public DateTime AsOfDate { get; set; }
        public int CompanyID { get; set; }
        public long NewReviewFinancialID { get; set; }
        public string? UploadedPath { get; set; }
        public string? SecondaryUploadedPath { get; set; }
        public string? FileName { get; set; }
        public string? Remarks { get; set; }
        public string? ARemarks { get; set; }
        public string? UploadedBy { get; set; }
        public DateTime UploadedDate { get; set; }
        public string? Company { get; set; }
        public string? Ticker { get; set; }
        public short FinancialEntryTypeID { get; set; }

    }

    public class CompanyAccountsInputDto
    {
        public long FinancialsID { get; set; }
        public long NewReviewFinancialID { get; set; }
        public bool IsNew { get; set; }
        public int CompanyID { get; set; }
    }

    public class CompanyAccountsDto
    {
        public CompanyAccountsDto()
        {
            FinancialsDetails = new List<FinancialsDetailDto>();
            AsOfDates = new List<AsOfDateDto>();
            FinValueMatches = new List<FinValueMatchDto>();
            ReentryMatches = new List<ReentryMatchDto>();
        }
        public List<FinancialsDetailDto> FinancialsDetails { get; set; }
        public List<AsOfDateDto> AsOfDates { get; set; }
        public List<FinValueMatchDto> FinValueMatches { get; set; }
        public List<ReentryMatchDto> ReentryMatches { get; set; }
    }

    public class FinancialsDetailDto
    {
        public long? FinancialDetailId { get; set; }
        public int GBFactID { get; set; }
        public int ParentID { get; set; }
        public string? GBFact { get; set; }
        public decimal? Value { get; set; }
        public long FinancialsID { get; set; }
        public bool IsTitle { get; set; }
        public int CustomOrder { get; set; }
        public bool CheckMe { get; set; }
    }

    public class AsOfDateDto
    {
        public string? AsOfDate { get; set; }
        public long FinancialsID { get; set; }
        public int CompanyID { get; set; }
        public bool HasChanges { get; set; }

    }
    public class FinValueMatchDto
    {
        public int FinValueMatchID { get; set; }
        public int NewReviewFinancialID { get; set; }
        public int FinancialDetailID { get; set; }
        public int UserID { get; set; }

    }

    public class ReentryMatchDto
    {
        public int ReentryMatchID { get; set; }
        public int FinancialsID { get; set; }
        public int FinancialDetailID { get; set; }
        public int GBFactID { get; set; }
        public decimal Value { get; set; }
        public bool IsMatched { get; set; }
    }

    public class AsofDatesFinancialInputDto
    {
        public long FinancialsID { get; set; }
        public bool IsNew { get; set; }
        public int CompanyID { get; set; }
    }

    public class AsofDatesFinancialDto
    {
        public AsofDatesFinancialDto()
        {
            FinancialsDetails = new List<FinancialsDetailDto>();
            FinEntryInReviews = new List<FinEntryInReviewDto>();
        }
        public List<FinancialsDetailDto> FinancialsDetails { get; set; }
        public List<FinEntryInReviewDto> FinEntryInReviews { get; set; }
    }
    public class FinEntryInReviewDto
    {
        public int FinEntryInReviewID { get; set; }
        public int FinancialsID { get; set; }
        public int FinancialDetailID { get; set; }
        public int UserID { get; set; }
        public DateTime ReviewEntryDate { get; set; }
        public bool IsActive { get; set; }
    }

}
