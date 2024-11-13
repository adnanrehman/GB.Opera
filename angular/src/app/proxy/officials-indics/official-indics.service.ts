import type { GlobalIndices, GulfbasePrices, MFundCompanies, MFundPrices, MFunds, OfficialIndics } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OfficialIndicsService {
  apiName = 'Default';
  

  getAllFundPricesByMFundID = (MFundID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MFundPrices[]>({
      method: 'GET',
      url: '/api/app/official-indics/fund-prices',
      params: { mFundID: MFundID },
    },
    { apiName: this.apiName,...config });
  

  getAllFundsByCompanyID = (CompanyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MFunds[]>({
      method: 'GET',
      url: '/api/app/official-indics/funds',
      params: { companyID: CompanyID },
    },
    { apiName: this.apiName,...config });
  

  getGlobalIndicesByPriceDate = (PriceDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GlobalIndices[]>({
      method: 'GET',
      url: '/api/app/official-indics/global-indices',
      params: { priceDate: PriceDate },
    },
    { apiName: this.apiName,...config });
  

  getMFundCompanies = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MFundCompanies[]>({
      method: 'GET',
      url: '/api/app/official-indics/m-fund-companies',
    },
    { apiName: this.apiName,...config });
  

  getOfficialIndicsByPriceDateAndStockMarketID = (PriceDate: string, StockMarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OfficialIndics[]>({
      method: 'GET',
      url: '/api/app/official-indics/official-indics',
      params: { priceDate: PriceDate, stockMarketID: StockMarketID },
    },
    { apiName: this.apiName,...config });
  

  getgulfbasepricesByPriceDate = (PriceDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GulfbasePrices[]>({
      method: 'GET',
      url: '/api/app/official-indics/gulfbaseprices',
      params: { priceDate: PriceDate },
    },
    { apiName: this.apiName,...config });
  

  importGlobalIndicesByFilePath = (filePath: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/app/official-indics/import-global-indices',
      params: { filePath },
    },
    { apiName: this.apiName,...config });
  

  importOfficialIndicesByFilePath = (filePath: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/app/official-indics/import-official-indices',
      params: { filePath },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
