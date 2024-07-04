import type { GbFactDto, GbFactListDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GbFactService {
  apiName = 'Default';
  

  getGbFacts = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbFactDto[]>({
      method: 'GET',
      url: '/api/app/gb-fact/gb-facts',
    },
    { apiName: this.apiName,...config });
  

  getGbFactsDataFromProcedure = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbFactListDto[]>({
      method: 'GET',
      url: '/api/app/gb-fact/gb-facts-data-from-procedure',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
