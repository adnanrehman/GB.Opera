import type { CompanyDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiName = 'Default';
  

  createOrUpdateCompanyByModel = (model: CompanyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyDto>({
      method: 'POST',
      url: '/api/app/company/or-update-company',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  getCompaniesBySectorIDAndStockMarketID = (sectorID: number, stockMarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyDto[]>({
      method: 'GET',
      url: '/api/app/company/companies',
      params: { sectorID, stockMarketID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
