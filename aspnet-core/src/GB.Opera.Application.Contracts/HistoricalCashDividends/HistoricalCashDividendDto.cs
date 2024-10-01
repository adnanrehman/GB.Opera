using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace HistoricalCashDividends
{
    public class HistoricalCashDividendDto
    {
        public HistoricalCashDividendDto()
        {
            CashDivDates = new List<CashDivDateDto>();
        }
        public int CashDivID { get; set; }
        public int CompanyID { get; set; }
        public string? ExtraPeriodID { get; set; }
        public string? OtherPeriod { get; set; }
        public string? AOtherPeriod { get; set; }
        public int? Year { get; set; }
        public string? Remarks { get; set; }
        public string? ARemarks { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal? PerShareAmount { get; set; }
        public long? TreasuryShares { get; set; }
        public int? OutstandingShares { get; set; }
        public int SourceID { get; set; }
        public List<CashDivDateDto> CashDivDates { get; set; }
        public bool AsOf { get; set; } = false;
        public bool AnnouncedOn { get; set; } = false;
        public bool ApprovedOn { get; set; } = false;
        public bool DueOn { get; set; } = false;
        public bool XDividendDate { get; set; } = false;

        public DateTime AsOfDateTime { get; set; }
        public DateTime AnnouncedOnDateTime { get; set; }
        public DateTime ApprovedOnDateTime { get; set; }
        public DateTime DueOnDateTime { get; set; }
        public DateTime XDividendDateTime { get; set; }
    }

    public class CashDivDateDto
    {
        public int CashDivID { get; set; }
        public string? DateSelection { get; set; }
        public DateTime CashDivDate { get; set; }
    }

    public class EPeriodDto
    {
        public string? ExtraPeriodID { get; set; }
        public string? EPeriod { get; set; }

    }

    public class SourceDto
    {
        public int SourceID { get; set; }
        public string? Source { get; set; }
    }

    public class HistoricalCashDividendListDto
    {
        public HistoricalCashDividendListDto()
        {
            HistoricalCashDividends = new List<HistoricalCashDividendDto>();
            CashDivDates = new List<CashDivDateDto>();
            EPeriods = new List<EPeriodDto>();
            Sources = new List<SourceDto>();
        }
        public List<HistoricalCashDividendDto> HistoricalCashDividends { get; set; }
        public List<CashDivDateDto> CashDivDates { get; set; }
        public List<EPeriodDto> EPeriods { get; set; }
        public List<SourceDto> Sources { get; set; }
    }

    public class CreateHistoricalCashDividendDto
    {
        public CreateHistoricalCashDividendDto()
        {
            HistoricalCashDividend = new HistoricalCashDividendDto();
            CashDivDates = new List<CashDivDateDto>();
        }
        public HistoricalCashDividendDto HistoricalCashDividend { get; set; }
        public List<CashDivDateDto> CashDivDates { get; set; }
    }
}
