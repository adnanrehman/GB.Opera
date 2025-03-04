import type { CompanyGBFactMappingDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyAccountService {
  apiName = 'Default';
  

  createOrUpdateCompanyFactsByListAndCompanyId = (list: CompanyGBFactMappingDto[], companyId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyGBFactMappingDto[]>({
      method: 'POST',
      url: `/api/app/company-account/or-update-company-facts/${companyId}`,
      body: list,
    },
    { apiName: this.apiName,...config });
  

  getCompaniesFactsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyGBFactMappingDto[]>({
      method: 'GET',
      url: '/api/app/company-account/companies-facts',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
