﻿using Dapper;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Volo.Abp.Data;
using Companies;

namespace Commons
{
    public class CommonAppService : ApplicationService, ICommonAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CommonAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CompStockMarketDto>> GetCompStockMarkets()
        {
            var data = (await _connection.QueryAsync<CompStockMarketDto>(sql: "usp_getCompStockMarkets", commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }

        public async Task<List<CompanyDto>> SearchCompanies(string param)
        {
            var sql = $@"SELECT * FROM Companies where Company like '%{param}%' or Ticker like '%{param}%'";

            var data = await _connection.QueryAsync<CompanyDto>(sql);
            return data.ToList();
        }

        public async Task<CompDropdownDto> GetCompMSectors(int marketID)
        {
            var reader = await _connection.QueryMultipleAsync("usp_getCompMSectors",
                            param: new { marketID = marketID },
                            commandType: CommandType.StoredProcedure);
            var output = new CompDropdownDto();
            output.MarketSectors = reader.Read<MarketSectorDto>().ToList();
            output.InternalCategories = reader.Read<InternalCategoryDto>().ToList();
            output.GBIndustrialGroups = reader.Read<GBIndustrialGroupDto>().ToList();
            output.Sectors = reader.Read<SectorDto>().ToList();
            output.CapSizes = reader.Read<CapSizeDto>().ToList();
            output.Currencies = reader.Read<CurrencyDto>().ToList();
            output.Industries = reader.Read<IndustryDto>().ToList();
            output.SubCurrencies = reader.Read<SubCurrencyDto>().ToList();

            return output;
        }
        public async Task<List<MarketLangAnnouncementDto>> GetMarketLangAnnouncements()
        {
            var data = (await _connection.QueryAsync<MarketLangAnnouncementDto>(sql: "usp_getMarket_LangT_AnnouncementT ", commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }

        public async Task<List<SectorDto>> GetCompMarketSectors(int marketID)
        {
            var data = (await _connection.QueryAsync<SectorDto>(sql: "usp_getCompMarketSectors", param: new { marketID = marketID }, commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }

        public async Task<List<CompaniesTickerDto>> GetCompaniesTickers(int sectorID,int marketID)
        {
            var data = (await _connection.QueryAsync<CompaniesTickerDto>(sql: "[usp_getCompaniesTickers]", param: new { MarketID = marketID, SectorID = sectorID }, commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }

        public async Task<List<StockMarketDto>> GetStockMarkets()
        {
            var data = (await _connection.QueryAsync<StockMarketDto>(sql: "[usp_getStockMarkets]", commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }

        public async Task<List<SectorDto>> GetStockMarketSectors(int stockMarketID)
        {
            var data = (await _connection.QueryAsync<SectorDto>(sql: "[usp_getStockMarketSectors]", param: new { @StockMarketID = stockMarketID }, commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }

        public async Task<List<CompaniesTickerDto>> GetSectorCompanies(int sectorID, int stockMarketID)
        {
            var data = (await _connection.QueryAsync<CompaniesTickerDto>(sql: "[usp_getSectorCompanies]", param: new { SectorID = sectorID, StockMarketID = stockMarketID }, commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }




    }
}
