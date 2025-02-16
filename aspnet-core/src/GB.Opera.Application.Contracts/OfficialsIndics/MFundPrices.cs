using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.OfficialsIndics
{
    public  class MFundPrices
    {
        public Int64 MFundPriceID { get; set; }

        public Int64 MFundID { get; set; }
        public DateTime PriceDate { get; set; }
        public decimal ClosingPrice { get; set; }
        public Int64 TradingVolume { get; set; }
        public decimal LastClosePrice { get; set; }
        public DateTime LastUpdated { get; set; }
        public string? Ticker { get; set; }
        public string? MFund { get; set; }
        public bool IsActive { get; set; }
        

    }

    public class ImportOfficialIndicesDto
    {
        public string StockMarket { get; set; }

        public int StockMarketId { get; set; }
        public string? Sector { get; set; }

        public int? SectorId { get; set; }

        public DateTime Date { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }
        public decimal Volume { get; set; }
        public decimal Transaction { get; set; }
        public decimal Value { get; set; }
        public decimal? PreviousClose { get; set; }
        public DateTime? LastUpdated { get; set; }
    }

	public class ImportGlobalIndicesDto
	{
		public string StockMarket { get; set; }
		public int StockMarketID { get; set; }
		public DateTime Date { get; set; }
		public decimal Open { get; set; }
		public decimal High { get; set; }
		public decimal Low { get; set; }
		public decimal Close { get; set; }
		public decimal Volume { get; set; }
	}
}
