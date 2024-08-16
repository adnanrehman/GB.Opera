import type { NewsArabDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsArabService {
  apiName = 'Default';
  

  createOrUpdateNewsArabByInput = (input: NewsArabDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewsArabDto>({
      method: 'POST',
      url: '/api/app/news-arab/or-update-news-arab',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getNewsArabs = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewsArabDto[]>({
      method: 'GET',
      url: '/api/app/news-arab/news-arabs',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
