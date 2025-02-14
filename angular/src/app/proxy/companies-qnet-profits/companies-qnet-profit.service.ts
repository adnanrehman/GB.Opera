import type { CompaniesQNetProfitDto, CompaniesQNetProfitListDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompaniesQNetProfitService {
  apiName = 'Default';
  

  deleteCompQuartersNetProfitByCompQNProfitID = (CompQNProfitID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/companies-qNet-profit/comp-quarters-net-profit',
      params: { compQNProfitID: CompQNProfitID },
    },
    { apiName: this.apiName,...config });
  

  getCompaniesQNetProfitsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompaniesQNetProfitListDto>({
      method: 'GET',
      url: '/api/app/companies-qNet-profit/companies-qNet-profits',
      params: { companyID },
    },
    { apiName: this.apiName,...config });
  

  getLastYearFinEndRecordForQNPByCompanyIDAndYear = (CompanyID: number, Year: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/app/companies-qNet-profit/last-year-fin-end-record-for-qNP',
      params: { companyID: CompanyID, year: Year },
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
