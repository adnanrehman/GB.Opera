import type { CompanyOwnershipFactDto, CompanyOwnershipFactEditDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyOwnershipFactService {
  apiName = 'Default';
  

  createOrUpdateCompanyOwnershipsByDto = (dto: CompanyOwnershipFactEditDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyOwnershipFactEditDto>({
      method: 'POST',
      url: '/api/app/company-ownership-fact/or-update-company-ownerships',
      body: dto,
    },
    { apiName: this.apiName,...config });
  

  getCompanyOwnershipPreviewByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyOwnershipFactDto[]>({
      method: 'GET',
      url: '/api/app/company-ownership-fact/company-ownership-preview',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
