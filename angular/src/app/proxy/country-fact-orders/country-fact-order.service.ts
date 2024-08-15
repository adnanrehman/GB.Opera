import type { CountryFactOrderDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryFactOrderService {
  apiName = 'Default';
  

  createOrUpdateCountryFactOrderByList = (list: CountryFactOrderDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryFactOrderDto[]>({
      method: 'POST',
      url: '/api/app/country-fact-order/or-update-country-fact-order',
      body: list,
    },
    { apiName: this.apiName,...config });
  

  getCountryFactOrdersByCountryID = (CountryID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryFactOrderDto[]>({
      method: 'GET',
      url: '/api/app/country-fact-order/country-fact-orders',
      params: { countryID: CountryID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
