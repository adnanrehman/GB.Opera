import type { CompanyPSRawOutputDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyPSRawService {
  apiName = 'Default';
  

  getCompanyPSRawsByProductServiceRawIDAndCompanyID = (productServiceRawID: number, companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyPSRawOutputDto>({
      method: 'GET',
      url: '/api/app/company-pSRaw/company-pSRaws',
      params: { productServiceRawID, companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
