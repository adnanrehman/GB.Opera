import type { AsofDatesFinancialDto, AsofDatesFinancialInputDto, CompanyAccountsDto, CompanyAccountsInputDto, FinancialsDetailDto, StatusFinancialsDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  apiName = 'Default';
  

  getAsofDatesFinancialsByInput = (input: AsofDatesFinancialInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AsofDatesFinancialDto>({
      method: 'GET',
      url: '/api/app/entry/asof-dates-financials',
      params: { financialsID: input.financialsID, isNew: input.isNew, companyID: input.companyID },
    },
    { apiName: this.apiName,...config });
  

  getCompanyAccountsByInput = (input: CompanyAccountsInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyAccountsDto>({
      method: 'GET',
      url: '/api/app/entry/company-accounts',
      params: { financialsID: input.financialsID, newReviewFinancialID: input.newReviewFinancialID, isNew: input.isNew, companyID: input.companyID },
    },
    { apiName: this.apiName,...config });
  

  getStatusFinancialsByUserId = (userId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StatusFinancialsDto[]>({
      method: 'GET',
      url: `/api/app/entry/status-financials/${userId}`,
    },
    { apiName: this.apiName,...config });
  

  insertUpdateComitChangesByDtoAndUserID = (dto: AsofDatesFinancialDto, userID: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/entry/update-comit-changes',
      params: { userID },
      body: dto,
    },
    { apiName: this.apiName,...config });
  

  insertUpdateFinancialCommentsStatusByListAndUserID = (list: FinancialsDetailDto[], userID: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/entry/update-financial-comments-status',
      params: { userID },
      body: list,
    },
    { apiName: this.apiName,...config });
  

  insertUpdateFinancialValuesByList = (list: FinancialsDetailDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/entry/update-financial-values',
      body: list,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
