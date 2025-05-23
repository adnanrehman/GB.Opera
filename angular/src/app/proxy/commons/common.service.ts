import type { CompDropdownDto, CompStockMarketDto, CompaniesTickerDto, CompanyQNPDto, CompanyWithHasFundDto, Companydto, CountryDto, ESDFactDto, FactsOwnershipMappingDto, GetNewsCatAndCountriesDto, LangAnnounceTypeDto, MarketLangAnnouncementDto, ProductServiceRawDto, SectorDto, StockMarketDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AgencyRatingDto } from '../agency-ratings/models';
import type { CompanyDto } from '../companies/models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  apiName = 'Default';
  

  getAgencyRatingsByIsCredit = (isCredit: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgencyRatingDto>({
      method: 'GET',
      url: '/api/app/common/agency-ratings',
      params: { isCredit },
    },
    { apiName: this.apiName,...config });
  

  getAllCompanies = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Companydto[]>({
      method: 'GET',
      url: '/api/app/common/companies',
    },
    { apiName: this.apiName,...config });
  

  getAllCompaniesForEDFact = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Companydto[]>({
      method: 'GET',
      url: '/api/app/common/companies-for-eDFact',
    },
    { apiName: this.apiName,...config });
  

  getAllESDFactsMappings = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ESDFactDto[]>({
      method: 'GET',
      url: '/api/app/common/e-sDFacts-mappings',
    },
    { apiName: this.apiName,...config });
  

  getAllFactsOwnershipMappings = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, FactsOwnershipMappingDto[]>({
      method: 'GET',
      url: '/api/app/common/facts-ownership-mappings',
    },
    { apiName: this.apiName,...config });
  

  getAllPSRMappings = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductServiceRawDto[]>({
      method: 'GET',
      url: '/api/app/common/p-sRMappings',
    },
    { apiName: this.apiName,...config });
  

  getAllSector = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, SectorDto[]>({
      method: 'GET',
      url: '/api/app/common/sector',
    },
    { apiName: this.apiName,...config });
  

  getCompMSectorsByMarketID = (marketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompDropdownDto>({
      method: 'GET',
      url: '/api/app/common/comp-mSectors',
      params: { marketID },
    },
    { apiName: this.apiName,...config });
  

  getCompMarketSectorsByMarketID = (marketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SectorDto[]>({
      method: 'GET',
      url: '/api/app/common/comp-market-sectors',
      params: { marketID },
    },
    { apiName: this.apiName,...config });
  

  getCompStockMarkets = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompStockMarketDto[]>({
      method: 'GET',
      url: '/api/app/common/comp-stock-markets',
    },
    { apiName: this.apiName,...config });
  

  getCompaniesForQNPBySectorIDAndMarketID = (sectorID: number, marketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyQNPDto>({
      method: 'GET',
      url: '/api/app/common/companies-for-qNP',
      params: { sectorID, marketID },
    },
    { apiName: this.apiName,...config });
  

  getCompaniesTickersBySectorIDAndMarketID = (sectorID: number, marketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompaniesTickerDto[]>({
      method: 'GET',
      url: '/api/app/common/companies-tickers',
      params: { sectorID, marketID },
    },
    { apiName: this.apiName,...config });
  

  getCompaniesWithHasFundByStockMarketID = (stockMarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyWithHasFundDto>({
      method: 'GET',
      url: '/api/app/common/companies-with-has-fund',
      params: { stockMarketID },
    },
    { apiName: this.apiName,...config });
  

  getCountriesForIndicators = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryDto[]>({
      method: 'GET',
      url: '/api/app/common/countries-for-indicators',
    },
    { apiName: this.apiName,...config });
  

  getLangAnnouceTypes = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LangAnnounceTypeDto>({
      method: 'GET',
      url: '/api/app/common/lang-annouce-types',
    },
    { apiName: this.apiName,...config });
  

  getMarketLangAnnouncements = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MarketLangAnnouncementDto[]>({
      method: 'GET',
      url: '/api/app/common/market-lang-announcements',
    },
    { apiName: this.apiName,...config });
  

  getNewsCatAndCountries = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetNewsCatAndCountriesDto>({
      method: 'GET',
      url: '/api/app/common/news-cat-and-countries',
    },
    { apiName: this.apiName,...config });
  

  getSectorCompaniesBySectorIDAndStockMarketID = (sectorID: number, stockMarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompaniesTickerDto[]>({
      method: 'GET',
      url: '/api/app/common/sector-companies',
      params: { sectorID, stockMarketID },
    },
    { apiName: this.apiName,...config });
  

  getStockMarketSectorsByStockMarketID = (stockMarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SectorDto[]>({
      method: 'GET',
      url: '/api/app/common/stock-market-sectors',
      params: { stockMarketID },
    },
    { apiName: this.apiName,...config });
  

  getStockMarkets = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, StockMarketDto[]>({
      method: 'GET',
      url: '/api/app/common/stock-markets',
    },
    { apiName: this.apiName,...config });
  

  maintainSession = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/common/maintain-session',
    },
    { apiName: this.apiName,...config });
  

  searchCompaniesByParam = (param: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyDto[]>({
      method: 'POST',
      url: '/api/app/common/search-companies',
      params: { param },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
