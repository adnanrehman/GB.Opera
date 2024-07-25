import type { CompanyFIPDto, CompanyOwnershipDto, CompanyProductDto, CompanyRawMaterialDto, MiscNotesDto, SisterCompanyDto, SubsCompUpdDto, SubsidiaryDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyOwnershipService {
  apiName = 'Default';
  

  createOrUpdateCompanyFIPByModel = (model: CompanyFIPDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyFIPDto>({
      method: 'POST',
      url: '/api/app/company-ownership/or-update-company-fIP',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateCompanyProductByModel = (model: CompanyProductDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyProductDto>({
      method: 'POST',
      url: '/api/app/company-ownership/or-update-company-product',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateMiscNoteByModel = (model: MiscNotesDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MiscNotesDto>({
      method: 'POST',
      url: '/api/app/company-ownership/or-update-misc-note',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateRawMaterialByModel = (model: CompanyRawMaterialDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyRawMaterialDto>({
      method: 'POST',
      url: '/api/app/company-ownership/or-update-raw-material',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateSisterCompanyByModel = (model: SisterCompanyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SisterCompanyDto>({
      method: 'POST',
      url: '/api/app/company-ownership/or-update-sister-company',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateSubsCompUpdateByModel = (model: SubsCompUpdDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SubsCompUpdDto>({
      method: 'POST',
      url: '/api/app/company-ownership/or-update-subs-comp-update',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateSubsidiaryByModel = (model: SubsidiaryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SubsidiaryDto>({
      method: 'POST',
      url: '/api/app/company-ownership/or-update-subsidiary',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  getRelatedInformationsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyOwnershipDto>({
      method: 'GET',
      url: '/api/app/company-ownership/related-informations',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
