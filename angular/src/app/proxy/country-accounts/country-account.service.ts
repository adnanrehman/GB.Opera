import type { CountryAccountDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryAccountService {
  apiName = 'Default';
  

  createOrUpdateCountryFactByList = (list: CountryAccountDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryAccountDto[]>({
      method: 'POST',
      url: '/api/app/country-account/or-update-country-fact',
      body: list,
    },
    { apiName: this.apiName,...config });
  

  getCountriesFactsByCountryID = (CountryID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryAccountDto[]>({
      method: 'GET',
      url: '/api/app/country-account/countries-facts',
      params: { countryID: CountryID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
