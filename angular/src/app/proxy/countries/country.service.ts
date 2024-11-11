import type { BankDto, BrokerDto, CountryInfoDto, CountryInputDto, EconomicIndicatorDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  apiName = 'Default';
  

  getCountryInfosByCountryID = (countryID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryInputDto>({
      method: 'GET',
      url: '/api/app/country/country-infos',
      params: { countryID },
    },
    { apiName: this.apiName,...config });
  

  insertBankByModel = (model: BankDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/country/bank',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  insertBrokerByModel = (model: BrokerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/country/broker',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  insertCountryInfoByModel = (model: CountryInfoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/country/country-info',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  insertEconomicIndicatorByModel = (model: EconomicIndicatorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/country/economic-indicator',
      body: model,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
