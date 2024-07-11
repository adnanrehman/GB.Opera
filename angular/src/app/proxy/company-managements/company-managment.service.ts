import type { CompanyManagementDto, ManagementDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyManagmentService {
  apiName = 'Default';
  

  createOrUpdateCompanyManagementByModel = (model: ManagementDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ManagementDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-company-management',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  getCompaniesManagementByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyManagementDto[]>({
      method: 'GET',
      url: '/api/app/company-managment/companies-management',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
