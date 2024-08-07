import type { CompanyPSRawOutputDto, PSRCompanyProductDto, PSRCompanyRawMaterialDto, PSRCompanyServiceDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyPSRawService {
  apiName = 'Default';
  

  createOrUpdatePSRCompanyProductByModel = (model: PSRCompanyProductDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PSRCompanyProductDto>({
      method: 'POST',
      url: '/api/app/company-pSRaw/or-update-pSRCompany-product',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdatePSRCompanyRawMaterialByModel = (model: PSRCompanyRawMaterialDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PSRCompanyRawMaterialDto>({
      method: 'POST',
      url: '/api/app/company-pSRaw/or-update-pSRCompany-raw-material',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdatePSRCompanyServiceByModel = (model: PSRCompanyServiceDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PSRCompanyServiceDto>({
      method: 'POST',
      url: '/api/app/company-pSRaw/or-update-pSRCompany-service',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  getCompanyPSRawsByProductServiceRawIDAndCompanyID = (productServiceRawID: number, companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyPSRawOutputDto>({
      method: 'GET',
      url: '/api/app/company-pSRaw/company-pSRaws',
      params: { productServiceRawID, companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
