import type { CountryProfileDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryProfileService {
  apiName = 'Default';
  

  getCompanyProfile = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryProfileDto>({
      method: 'GET',
      url: '/api/app/country-profile/company-profile',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
