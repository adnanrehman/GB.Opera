using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Reflection;
using System.Text;

namespace GB.Opera.MarketSector
{
    public class MarketSectorDto
    {
        public MarketSectorDto()
        {
            Countrygroup = new List<CountryGroupsector>();
            Country = new List<Countries>();
            CapacitySize = new List<CapacitySizes>();
            StockMarket = new List<StockMarkets>();
            StockMarketById = new List<StockMarketByID>();
            MarketCap = new List<MarketCaps>();
            GBMarketCap = new List<GBMarketCaps>();
            Sector = new List<Sectors>();
            MarketSectors = new List<MarketsSector>();
            Currency = new List<Currencies>();
        }

        public List<CountryGroupsector> Countrygroup { get; set; }
        public List<Countries> Country { get; set; }
        public List<CapacitySizes> CapacitySize { get; set; }
        public List<StockMarkets> StockMarket { get; set; }
        public List<StockMarketByID> StockMarketById { get; set; }
        public List<MarketCaps> MarketCap { get; set; }
        public List<GBMarketCaps> GBMarketCap { get; set; }
        public List<Sectors> Sector { get; set; }
        public List<MarketsSector> MarketSectors { get; set; }
        public List<Currencies> Currency { get; set; }
    }
}
