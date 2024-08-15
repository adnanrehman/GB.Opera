import type { EstimatesandForecastDto, EstimatesandForecastOutputDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstimatesandForecastService {
  apiName = 'Default';
  

  createOrUpdateEstimatesandForecastByModel = (model: EstimatesandForecastDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstimatesandForecastDto>({
      method: 'POST',
      url: '/api/app/estimatesand-forecast/or-update-estimatesand-forecast',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  getEstimatesandForecastsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstimatesandForecastOutputDto>({
      method: 'GET',
      url: '/api/app/estimatesand-forecast/estimatesand-forecasts',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
