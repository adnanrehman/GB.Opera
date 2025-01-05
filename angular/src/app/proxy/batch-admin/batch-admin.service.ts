import type { BatchAdminDto, SearchBatches } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BatchAdminService {
  apiName = 'Default';
  

  adminBatchesByReportTypeAndCountryID = (ReportType: string, CountryID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SearchBatches[]>({
      method: 'POST',
      url: '/api/app/batch-admin/admin-batches',
      params: { reportType: ReportType, countryID: CountryID },
    },
    { apiName: this.apiName,...config });
  

  countriesForBatches = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, BatchAdminDto>({
      method: 'POST',
      url: '/api/app/batch-admin/countries-for-batches',
    },
    { apiName: this.apiName,...config });
  

  getBatchesEntryByBatchID = (BatchID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SearchBatches[]>({
      method: 'GET',
      url: '/api/app/batch-admin/batches-entry',
      params: { batchID: BatchID },
    },
    { apiName: this.apiName,...config });
  

  insertBatchesadminByList = (list: SearchBatches, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SearchBatches>({
      method: 'POST',
      url: '/api/app/batch-admin/batchesadmin',
      body: list,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
