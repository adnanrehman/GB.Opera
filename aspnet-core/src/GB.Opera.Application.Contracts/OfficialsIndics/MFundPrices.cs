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
        public string Sector { get; set; }
        public DateTime Date { get; set; }
        public decimal Opening { get; set; }
        public decimal Highest { get; set; }
        public decimal Lowest { get; set; }
        public decimal Closing { get; set; }
        public decimal Volume { get; set; }
        public decimal Transactions { get; set; }
        public decimal TradingValue { get; set; }
        public decimal PreviousClose { get; set; }
    }

	public class ImportGlobalIndicesDto
	{
		public string StockMarket { get; set; }
		public DateTime Date { get; set; }
		public decimal Open { get; set; }
		public decimal High { get; set; }
		public decimal Low { get; set; }
		public decimal Close { get; set; }
		public decimal Volume { get; set; }
	}
}
