using Commons;
using CompanyManagements;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Numerics;
using System.Text;

namespace FinancialsAdmins
{
    public class NewReviewFinancialDto
    {
        public long NewReviewFinancialID { get; set; }
        public long FinancialsID { get; set; }
        public bool IsAudited { get; set; }
        public bool IsActive { get; set; }
        public DateTime AsOfDate { get; set; }
        public int PeriodTypeID { get; set; }
        public int Year { get; set; }
        public string? QPeriod { get; set; }
        public int QPeriodID { get; set; }
        public bool? IsYearly { get; set; }
        public int? EntryUser { get; set; }
        public int? ReEntryUser { get; set; }
        public int? StatusID { get; set; }
        public string? UploadedPath { get; set; }
        public string? FileName { get; set; }
        public string? SecondaryUploadedPath { get; set; }
        public string? SecondaryFileName { get; set; }
        public string? Remarks { get; set; }
        public string? ARemarks { get; set; }
        public int? FinancialEntryTypeID { get; set; }
        public string? PeriodNote { get; set; }
        public string? APeriodNote { get; set; }

    }

    public class CompanyAccountsInputDto
    {
        public long FinancialsID { get; set; }
        public long NewReviewFinancialID { get; set; }
        public bool IsNew { get; set; }
        public int CompanyID { get; set; }
    }
    public class UserDto
    {
        public Guid UserID { get; set; }
        public string? UserName { get; set; }
        public string? UserType { get; set; }
    }
    public class StatusDto
    {
        public int StatusID { get; set; }
        public string? Status { get; set; }
    }

    public class NewFinancialReviewOutputDto
    {
        public NewFinancialReviewOutputDto()
        {
            NewReviewFinancials = new List<NewReviewFinancialDto>();
            PeriodTypes = new List<PeriodTypeDto>();
            QPeriods = new List<QPeriodDto>();
            EntryUsers = new List<UserDto>();
            ReEntryUsers = new List<UserDto>();
            Statuses = new List<StatusDto>();
        }
        public List<NewReviewFinancialDto> NewReviewFinancials { get; set; }
        public List<PeriodTypeDto> PeriodTypes { get; set; }
        public List<QPeriodDto> QPeriods { get; set; }
        public List<UserDto> EntryUsers { get; set; }
        public List<UserDto> ReEntryUsers { get; set; }
        public List<StatusDto> Statuses { get; set; }
    }

}
