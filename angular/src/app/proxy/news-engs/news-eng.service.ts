import type { NewsEngDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsEngService {
  apiName = 'Default';
  

  createOrUpdateNewsEngByInput = (input: NewsEngDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewsEngDto>({
      method: 'POST',
      url: '/api/app/news-eng/or-update-news-eng',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getNewsEngs = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewsEngDto[]>({
      method: 'GET',
      url: '/api/app/news-eng/news-engs',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
