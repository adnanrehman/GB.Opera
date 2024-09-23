import type { UploadFinancialListDto, UploadFinancials, UploadwithHasDtos, Users } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  apiName = 'Default';
  

  createUploadFinancialByInput = (input: UploadFinancials, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/upload/upload-financial',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getFinancialsBycompanyIdByCompanyID = (CompanyID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UploadFinancialListDto[]>({
      method: 'GET',
      url: '/api/app/upload/financials-bycompany-id',
      params: { companyID: CompanyID },
    },
    { apiName: this.apiName,...config });
  

  uploadwithHasDtosByMarketIDAndSectorID = (MarketID: number, SectorID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UploadwithHasDtos>({
      method: 'POST',
      url: '/api/app/upload/uploadwith-has-dtos',
      params: { marketID: MarketID, sectorID: SectorID },
    },
    { apiName: this.apiName,...config });
  

  _getEntryReEntryUsers = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Users[]>({
      method: 'POST',
      url: '/api/app/upload/_get-entry-re-entry-users',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
