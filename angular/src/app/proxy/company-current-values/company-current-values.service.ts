import type { CompanyCurrentValuesdtos } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyCurrentValuesService {
  apiName = 'Default';
  

  getCompanyCurrentValuesByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyCurrentValuesdtos[]>({
      method: 'GET',
      url: '/api/app/company-current-values/company-current-values',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
