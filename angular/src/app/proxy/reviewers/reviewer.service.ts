import type { ReviewReportOutputDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { StatusFinancialsDto } from '../entry/models';

@Injectable({
  providedIn: 'root',
})
export class ReviewerService {
  apiName = 'Default';
  

  getReviewReportByFinancialsID = (financialsID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ReviewReportOutputDto>({
      method: 'GET',
      url: '/api/app/reviewer/review-report',
      params: { financialsID },
    },
    { apiName: this.apiName,...config });
  

  getStatusFinancialsByUserId = (userId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StatusFinancialsDto[]>({
      method: 'GET',
      url: `/api/app/reviewer/status-financials/${userId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
