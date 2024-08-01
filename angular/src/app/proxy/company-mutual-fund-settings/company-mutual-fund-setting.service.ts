import type { CompanyMutualFundSettingDropdownDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyMutualFundSettingService {
  apiName = 'Default';
  

  getCompanyMutualFundSettings = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyMutualFundSettingDropdownDto>({
      method: 'GET',
      url: '/api/app/company-mutual-fund-setting/company-mutual-fund-settings',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
