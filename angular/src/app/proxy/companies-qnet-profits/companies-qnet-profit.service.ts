import type { CompaniesQNetProfitDto, CompaniesQNetProfitListDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompaniesQNetProfitService {
  apiName = 'Default';
  

  getCompaniesQNetProfitsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompaniesQNetProfitListDto>({
      method: 'GET',
      url: '/api/app/companies-qNet-profit/companies-qNet-profits',
      params: { companyID },
    },
    { apiName: this.apiName,...config });
  

  insertUpdateCalculateCompQuartersNetProfitByInput = (input: CompaniesQNetProfitDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/companies-qNet-profit/update-calculate-comp-quarters-net-profit',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
