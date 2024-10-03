import type { CurrentDividendDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentDividendService {
  apiName = 'Default';
  

  getCurrentDividendsByStockMarketID = (stockMarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrentDividendDto[]>({
      method: 'GET',
      url: '/api/app/current-dividend/current-dividends',
      params: { stockMarketID },
    },
    { apiName: this.apiName,...config });
  

  insertUpdateCurrentDividendsByInput = (input: CurrentDividendDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/current-dividend/update-current-dividends',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
