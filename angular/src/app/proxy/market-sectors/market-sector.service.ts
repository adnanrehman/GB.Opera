import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { InsertmarketsectorDto, MarketSectorDto } from '../market-sector/models';

@Injectable({
  providedIn: 'root',
})
export class MarketSectorService {
  apiName = 'Default';
  

  getMarketsInfoByMarketID = (MarketID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MarketSectorDto>({
      method: 'GET',
      url: '/api/app/market-sector/markets-info',
      params: { marketID: MarketID },
    },
    { apiName: this.apiName,...config });
  

  insertCountryGroupByModel = (model: InsertmarketsectorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/market-sector/country-group',
      body: model,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
