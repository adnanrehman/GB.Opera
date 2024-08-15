import type { EODPrices, GCCSector } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndofDayService {
  apiName = 'Default';
  

  eodPricesByPriceDateAndStockMarketID = (PriceDate: string, StockMarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EODPrices[]>({
      method: 'POST',
      url: '/api/app/endof-day/e-oDPrices',
      params: { priceDate: PriceDate, stockMarketID: StockMarketID },
    },
    { apiName: this.apiName,...config });
  

  getAllGCCSector = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GCCSector[]>({
      method: 'GET',
      url: '/api/app/endof-day/g-cCSector',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
