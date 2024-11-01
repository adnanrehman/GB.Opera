import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { MFundPrices } from '../officials-indics/models';

@Injectable({
  providedIn: 'root',
})
export class FundPriceService {
  apiName = 'Default';
  

  insertMFundPricesByModel = (model: MFundPrices, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/fund-price/m-fund-prices',
      body: model,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
