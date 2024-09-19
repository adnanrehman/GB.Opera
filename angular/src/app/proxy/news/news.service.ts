import type { NewsDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiName = 'Default';
  

  createOrUpdateNewsByInput = (input: NewsDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewsDto>({
      method: 'POST',
      url: '/api/app/news/or-update-news',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteNewsByLangIdAndNewsId = (langId: boolean, newsId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/news/news',
      params: { langId, newsId },
    },
    { apiName: this.apiName,...config });
  

  getNewsByLangIdAndNewsId = (langId: boolean, newsId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewsDto[]>({
      method: 'GET',
      url: '/api/app/news/news',
      params: { langId, newsId },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
