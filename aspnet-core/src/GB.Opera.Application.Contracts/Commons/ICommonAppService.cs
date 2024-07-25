using Companies;
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
        Task<List<MarketLangAnnouncementDto>> GetMarketLangAnnouncements();
        Task<List<SectorDto>> GetCompMarketSectors(int marketID);
        Task<List<CompaniesTickerDto>> GetCompaniesTickers(int sectorID, int marketID);
        Task<List<StockMarketDto>> GetStockMarkets();
        Task<List<SectorDto>> GetStockMarketSectors(int stockMarketID);
        Task<List<CompaniesTickerDto>> GetSectorCompanies(int sectorID, int stockMarketID);
        Task<LangAnnounceTypeDto> GetLangAnnouceTypes();
        Task<CompanyWithHasFundDto> GetCompaniesWithHasFund(int stockMarketID);


    }
}
