import type { NewSourceDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewSourceService {
  apiName = 'Default';
  

  getNewSource = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewSourceDto[]>({
      method: 'GET',
      url: '/api/app/new-source/new-source',
    },
    { apiName: this.apiName,...config });
  

  getNewSourceByIDBySource = (Source: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewSourceDto[]>({
      method: 'GET',
      url: '/api/app/new-source/new-source-by-iD',
      params: { source: Source },
    },
    { apiName: this.apiName,...config });
  

  saveUpdateBySource = (source: NewSourceDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewSourceDto>({
      method: 'POST',
      url: '/api/app/new-source/save-update',
      body: source,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
