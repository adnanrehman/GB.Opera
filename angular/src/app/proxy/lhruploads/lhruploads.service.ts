import type { Company, LHRUpload } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LHRUploadsService {
  apiName = 'Default';
  

  getAllStockMarkets = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LHRUpload[]>({
      method: 'GET',
      url: '/api/app/l-hRUploads/stock-markets',
    },
    { apiName: this.apiName,...config });
  

  getCompaniesFromMarketByStockMarketID = (StockMarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Company[]>({
      method: 'GET',
      url: '/api/app/l-hRUploads/companies-from-market',
      params: { stockMarketID: StockMarketID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
