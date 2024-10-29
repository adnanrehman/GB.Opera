import type { CountryGroupInputDto, InsertCountryGroupDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryGroupService {
  apiName = 'Default';
  

  getCountryGroups = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryGroupInputDto>({
      method: 'GET',
      url: '/api/app/country-group/country-groups',
    },
    { apiName: this.apiName,...config });
  

  insertCountryGroupByModel = (model: InsertCountryGroupDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/country-group/country-group',
      body: model,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
