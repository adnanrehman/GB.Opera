using Dapper;
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

        public async Task<LangAnnounceTypeDto> GetLangAnnouceTypes()
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync("[usp_getLangAnnouceTypes]",
                commandType: CommandType.StoredProcedure);
                var output = new LangAnnounceTypeDto();
                output.LanguageTypes = reader.Read<LanguageTypeDto>().ToList();
                output.AnnouncementTypes = reader.Read<AnnouncementTypeDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<CompanyWithHasFundDto> GetCompaniesWithHasFund(int stockMarketID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync("[usp_getCompaniesWithHasFund]",
                    param: new { StockMarketID = stockMarketID },
                    commandType: CommandType.StoredProcedure);

                var output = new CompanyWithHasFundDto();
                output.Companies = reader.Read<CompanyDto>().ToList();
                output.AssetsAllocations = reader.Read<AssetsAllocationDto>().ToList();
                output.GeoDiversifications = reader.Read<GeoDiversificationDto>().ToList();
                output.SectorDiversifications = reader.Read<SectorDiversificationDto>().ToList();
                output.MajorInvestments = reader.Read<MajorInvestmentDto>().ToList();
                output.Benchmarks = reader.Read<BenchmarkDto>().ToList();
                output.Currencies = reader.Read<CurrencyDto>().ToList();
                output.PortfolioTypes = reader.Read<PortfolioTypeDto>().ToList();
                output.MFListings = reader.Read<MFListingDto>().ToList();
                output.MFRisks = reader.Read<MFRiskDto>().ToList();
                output.MFClassifications = reader.Read<MFClassificationDto>().ToList();
                output.MFSubCategories = reader.Read<MFSubCategoryDto>().ToList();
                output.MFCategories = reader.Read<MFCategoryDto>().ToList();
                
                return output;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<List<FactsOwnershipMappingDto>> GetAllFactsOwnershipMappings()
        {
            try
            {
                var data = (await _connection.QueryAsync<FactsOwnershipMappingDto>(sql: "usp_getAllFactsOwnershipMappings",
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }




    }
}
