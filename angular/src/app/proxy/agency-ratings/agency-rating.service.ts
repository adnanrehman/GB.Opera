import type { AgencyDto, AgencyRatingDto, RatingDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgencyRatingService {
  apiName = 'Default';
  

  createOrUpdateAgencyByInput = (input: AgencyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgencyDto>({
      method: 'POST',
      url: '/api/app/agency-rating/or-update-agency',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateRatingByInput = (input: RatingDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RatingDto>({
      method: 'POST',
      url: '/api/app/agency-rating/or-update-rating',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getAgencyRatingsByIsCredit = (isCredit: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgencyRatingDto>({
      method: 'GET',
      url: '/api/app/agency-rating/agency-ratings',
      params: { isCredit },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
