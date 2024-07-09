import type { GbFactListDto, GbFactsAccount } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GbFactService {
  apiName = 'Default';
  

  getAllFactsMappings = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbFactListDto[]>({
      method: 'GET',
      url: '/api/app/gb-fact/facts-mappings',
    },
    { apiName: this.apiName,...config });
  

  getGbFactsDataFromProcedure = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbFactListDto[]>({
      method: 'GET',
      url: '/api/app/gb-fact/gb-facts-data-from-procedure',
    },
    { apiName: this.apiName,...config });
  

  getgbfactByidByGBFactID = (GBFactID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbFactsAccount[]>({
      method: 'GET',
      url: '/api/app/gb-fact/gbfact-byid',
      params: { gbFactID: GBFactID },
    },
    { apiName: this.apiName,...config });
  

  saveUpdateByGbFact = (gbFact: GbFactsAccount, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbFactsAccount>({
      method: 'POST',
      url: '/api/app/gb-fact/save-update',
      body: gbFact,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
