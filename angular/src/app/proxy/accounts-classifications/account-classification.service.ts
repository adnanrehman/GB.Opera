import type { ACFactsDtos, GbAcFactsAccount } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountClassificationService {
  apiName = 'Default';
  

  deleteAacfactByIdByACFactId = (ACFactId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'DELETE',
      url: `/api/app/account-classification/aacfact-by-id/${ACFactId}`,
    },
    { apiName: this.apiName,...config });
  

  getAacfactByidByACFactId = (ACFactId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbAcFactsAccount[]>({
      method: 'GET',
      url: `/api/app/account-classification/aacfact-byid/${ACFactId}`,
    },
    { apiName: this.apiName,...config });
  

  getAllACFactsMappings = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ACFactsDtos[]>({
      method: 'GET',
      url: '/api/app/account-classification/a-cFacts-mappings',
    },
    { apiName: this.apiName,...config });
  

  saveUpdateAacFactByGbAcFactsAccount = (gbAcFactsAccount: GbAcFactsAccount, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbAcFactsAccount>({
      method: 'POST',
      url: '/api/app/account-classification/save-update-aac-fact',
      body: gbAcFactsAccount,
    },
    { apiName: this.apiName,...config });
  

  saveUpdateAacFactsByGbAcFactsAccounts = (gbAcFactsAccounts: GbAcFactsAccount[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbAcFactsAccount[]>({
      method: 'POST',
      url: '/api/app/account-classification/save-update-aac-facts',
      body: gbAcFactsAccounts,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
