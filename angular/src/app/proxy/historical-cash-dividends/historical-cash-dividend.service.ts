import type { CreateHistoricalCashDividendDto, HistoricalCashDividendListDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoricalCashDividendService {
  apiName = 'Default';
  

  getHistoricalCashDividendsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HistoricalCashDividendListDto>({
      method: 'GET',
      url: '/api/app/historical-cash-dividend/historical-cash-dividends',
      params: { companyID },
    },
    { apiName: this.apiName,...config });
  

  insetUpdateHistoricalCashDividendsByInput = (input: CreateHistoricalCashDividendDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/historical-cash-dividend/inset-update-historical-cash-dividends',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
