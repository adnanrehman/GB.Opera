using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.EndOfDay
{
    public  class EODPrices
    {
        public bool IsActive { get; set; }
        public string StockMarket { get; set; }
        public int StockMarketId { get; set; }

        public string Ticker { get; set; }

        public Int64 PriceID { get; set; }

        public double OpeningPrice { get; set; }

        public double HighestPrice { get; set; }
        public double LowestPrice { get; set; }
        public double ClosingPrice { get; set; }
        public double TradingVolume { get; set; }
        public double TradingValue { get; set; }
        public Int64 Trades { get; set; }
        public double LastClosedPrice { get; set; }

        public DateTime LastUpdated { get; set; }

        public int CompanyID { get; set; }
 
    }

    public class PriceDto
    {
        public long PriceID { get; set; }
        public int StockMarketID { get; set; }
        public int CompanyID { get; set; }
        public DateTime? PriceDate { get; set; }
        public decimal? OpeningPrice { get; set; }
        public decimal? HighestPrice { get; set; }
        public decimal? LowestPrice { get; set; }
        public decimal? ClosingPrice { get; set; }
        public long? TradingVolume { get; set; }
        public decimal? TradingValue { get; set; }
        public long? Trades { get; set; }
        public decimal? LastClosedPrice { get; set; }
        public DateTime? LastUpdated { get; set; }
        public bool IsActive { get; set; }
    }

    public class FundPricesImportDto
    {
        public string Temp { get; set; }
        public int Id { get; set; }
        public string Company { get; set; }
        public string Ticker { get; set; }
        public string StockMarket { get; set; }
        public DateTime PriceDate { get; set; }
		public decimal? OpeningPrice { get; set; }
		public decimal? HighestPrice { get; set; }
		public decimal? LowestPrice { get; set; }
		public decimal? ClosingPrice { get; set; }
		public long? TradingVolume { get; set; }
		public decimal? TradingValue { get; set; }
		public long? Trades { get; set; }
	}
}
