import type { GulfbaseVideo } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GulfbaseVideoService {
  apiName = 'Default';
  

  createOrUpdateGulfbaseVideoByVideo = (video: GulfbaseVideo, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/gulfbase-video/or-update-gulfbase-video',
      body: video,
    },
    { apiName: this.apiName,...config });
  

  getGulfbaseVideo = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GulfbaseVideo[]>({
      method: 'GET',
      url: '/api/app/gulfbase-video/gulfbase-video',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
