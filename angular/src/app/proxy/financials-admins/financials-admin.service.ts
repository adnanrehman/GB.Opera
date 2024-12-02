import type { NewFinancialReviewOutputDto, NewReviewFinancialDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FinancialsAdminService {
  apiName = 'Default';
  

  checkfinancialyearByYearAndQPeriodIDAndCompanyID = (year: string, QPeriodID: number, CompanyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/app/financials-admin/checkfinancialyear',
      params: { year, qPeriodID: QPeriodID, companyID: CompanyID },
    },
    { apiName: this.apiName,...config });
  

  deleteFinancialByFinancialId = (financialId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/financials-admin/financial/${financialId}`,
    },
    { apiName: this.apiName,...config });
  

  getNewFinancialReviewsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NewFinancialReviewOutputDto>({
      method: 'GET',
      url: '/api/app/financials-admin/new-financial-reviews',
      params: { companyID },
    },
    { apiName: this.apiName,...config });
  

  updateAdminFinancialsByInput = (input: NewReviewFinancialDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/financials-admin/admin-financials',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateFinancialRateChangesByFinancialIdAndRate = (financialId: number, rate: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/financials-admin/financial-rate-changes/${financialId}`,
      params: { rate },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
