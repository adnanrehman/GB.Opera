using AgencyRatings;
using Companies;
using GB.Opera.Commons;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Commons
{
    public interface ICommonAppService : IApplicationService
    {
        Task<List<CompStockMarketDto>> GetCompStockMarkets();
        Task<CompDropdownDto> GetCompMSectors(int marketID);
        Task<List<CompanyDto>> SearchCompanies(string param);
        Task MaintainSession();
        Task<List<MarketLangAnnouncementDto>> GetMarketLangAnnouncements();
        Task<List<SectorDto>> GetCompMarketSectors(int marketID);
        Task<List<CompaniesTickerDto>> GetCompaniesTickers(int sectorID, int marketID);
        Task<List<StockMarketDto>> GetStockMarkets();
        Task<List<SectorDto>> GetStockMarketSectors(int stockMarketID);
        Task<List<CompaniesTickerDto>> GetSectorCompanies(int sectorID, int stockMarketID);
        Task<LangAnnounceTypeDto> GetLangAnnouceTypes();
        Task<CompanyWithHasFundDto> GetCompaniesWithHasFund(int stockMarketID);
        Task<List<FactsOwnershipMappingDto>> GetAllFactsOwnershipMappings();
        Task<CompanyQNPDto> GetCompaniesForQNP(int sectorID, int marketID);
        Task<List<ProductServiceRawDto>> GetAllPSRMappings();
        Task<List<ESDFactDto>> GetAllESDFactsMappings();
        Task<List<CountryDto>> GetCountriesForIndicators();
        Task<AgencyRatingDto> GetAgencyRatings(bool isCredit);
        Task<GetNewsCatAndCountriesDto> GetNewsCatAndCountries();


        public Task<List<SectorDto>> GetAllSector();

        public Task<List<Companydto>> GetAllCompaniesForEDFact();
            


    }
}
