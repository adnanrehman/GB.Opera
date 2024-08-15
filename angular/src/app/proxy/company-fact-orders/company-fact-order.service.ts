import type { CompanyFactOrderDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyFactOrderService {
  apiName = 'Default';
  

  createOrUpdateCompanyFactOrderByList = (list: CompanyFactOrderDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyFactOrderDto[]>({
      method: 'POST',
      url: '/api/app/company-fact-order/or-update-company-fact-order',
      body: list,
    },
    { apiName: this.apiName,...config });
  

  getCompaniesFactOrdersByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyFactOrderDto[]>({
      method: 'GET',
      url: '/api/app/company-fact-order/companies-fact-orders',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
