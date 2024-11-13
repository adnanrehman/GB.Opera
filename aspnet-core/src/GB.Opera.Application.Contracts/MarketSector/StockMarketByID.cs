using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.MarketSector
{
    public  class StockMarketByID
    {
        public Int16? StockMarketID { get; set; }
        public Int16? CountryID { get; set; }
        public string? StockMarket { get; set; }
        public string? AStockMarket { get; set; }
        public string? Abbr { get; set; }
        public string? AAbbr { get; set; }
        public string? IndexName { get; set; }

        public string? AIndexName { get; set; }
        public string? Description { get; set; }

        public string? ADescription { get; set; }

        public  bool? IsActive { get; set; }

        public Int16? FinancialCurrencyID { get; set; }
    }

    public class InsertmarketsectorDto
    {
        public InsertmarketsectorDto()
        {
            stockMarketByID = new StockMarketByID();
            marketsSector = new List<MarketsSector>();
            marketCaps = new List<MarketCaps>();
        }
        public StockMarketByID stockMarketByID { get; set; }
        public List<MarketsSector> marketsSector { get; set; }
        public List<MarketCaps> marketCaps { get; set; }
    }
}
