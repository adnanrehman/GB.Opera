import type { CompanyMutualFundDto, GetCompanyMutualFundsDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyMutualFundService {
  apiName = 'Default';
  

  createOrUpdateCompanyMutualFundByModel = (model: CompanyMutualFundDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyMutualFundDto>({
      method: 'POST',
      url: '/api/app/company-mutual-fund/or-update-company-mutual-fund',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  getCompanyMutualFundsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetCompanyMutualFundsDto>({
      method: 'GET',
      url: '/api/app/company-mutual-fund/company-mutual-funds',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
