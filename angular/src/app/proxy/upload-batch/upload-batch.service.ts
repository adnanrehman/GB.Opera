import type { UploadBatchDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BatchAdminDto } from '../batch-admin/models';
import type { ESDFactDto } from '../commons/models';

@Injectable({
  providedIn: 'root',
})
export class UploadBatchService {
  apiName = 'Default';
  

  countriesForBatches = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, BatchAdminDto>({
      method: 'POST',
      url: '/api/app/upload-batch/countries-for-batches',
    },
    { apiName: this.apiName,...config });
  

  getCountriesFactsTitlesByCountry = (country: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ESDFactDto[]>({
      method: 'GET',
      url: '/api/app/upload-batch/countries-facts-titles',
      params: { country },
    },
    { apiName: this.apiName,...config });
  

  insertBatchByInput = (input: UploadBatchDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UploadBatchDto>({
      method: 'POST',
      url: '/api/app/upload-batch/batch',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
