import type { AuditorDto, BoardMemberDto, BranchDto, CompanyFinancialOverviewDto, CompanyManagementDto, CompanyProjectDto, ContactInformationDto, ManagementDto, SeniorManagementDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyManagmentService {
  apiName = 'Default';
  

  createOrUpdateAuditorsByModel = (model: AuditorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AuditorDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-auditors',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateBMembersByModel = (model: BoardMemberDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BoardMemberDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-bMembers',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateBranchesByModel = (model: BranchDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BranchDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-branches',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateCompanyManagementByModel = (model: ManagementDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ManagementDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-company-management',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateCompanyProjectsByModel = (model: CompanyProjectDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyProjectDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-company-projects',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateContactsByModel = (model: ContactInformationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContactInformationDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-contacts',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateOverviewByModel = (model: CompanyFinancialOverviewDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyFinancialOverviewDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-overview',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdateSeniorManagementByModel = (model: SeniorManagementDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SeniorManagementDto>({
      method: 'POST',
      url: '/api/app/company-managment/or-update-senior-management',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  getCompaniesManagementByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyManagementDto>({
      method: 'GET',
      url: '/api/app/company-managment/companies-management',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
