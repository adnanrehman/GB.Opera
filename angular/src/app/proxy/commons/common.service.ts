import type { CompDropdownDto, CompStockMarketDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CompanyDto } from '../companies/models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  apiName = 'Default';
  

  getCompMSectorsByMarketID = (marketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompDropdownDto>({
      method: 'GET',
      url: '/api/app/common/comp-mSectors',
      params: { marketID },
    },
    { apiName: this.apiName,...config });
  

  getCompStockMarkets = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompStockMarketDto[]>({
      method: 'GET',
      url: '/api/app/common/comp-stock-markets',
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
