import type { CorporateAnnouncementDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CorporateAnnouncementService {
  apiName = 'Default';
  

  createOrUpdateCorporateAnnouncementByModel = (model: CorporateAnnouncementDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CorporateAnnouncementDto>({
      method: 'POST',
      url: '/api/app/corporate-announcement/or-update-corporate-announcement',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  deleteCorporateAnnouncementByCorporateAnnouncementID = (corporateAnnouncementID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/corporate-announcement/corporate-announcement',
      params: { corporateAnnouncementID },
    },
    { apiName: this.apiName,...config });
  

  getCorporateAnnouncementsByCompanyID = (companyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CorporateAnnouncementDto[]>({
      method: 'GET',
      url: '/api/app/corporate-announcement/corporate-announcements',
      params: { companyID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
