import type { CurrencyExchangeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
  apiName = 'Default';
  

  getCurrencyByDate = (Date: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyExchangeDto[]>({
      method: 'GET',
      url: '/api/app/currency-exchange/currency',
      params: { date: Date },
    },
    { apiName: this.apiName,...config });
  

  usp_InsertCurrencyExchangeByList = (list: CurrencyExchangeDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/currency-exchange/usp_Insert-currency-exchange',
      body: list,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
