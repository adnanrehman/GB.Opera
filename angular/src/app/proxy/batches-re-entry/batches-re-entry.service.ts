import type { BatchStatusUpdateDto, BatchesESDFactsMappingDto, BatchesReEntryDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BatchesReEntryService {
  apiName = 'Default';
  

  getBatchesForReEntryByBatchID = (batchID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BatchesESDFactsMappingDto[]>({
      method: 'GET',
      url: '/api/app/batches-re-entry/batches-for-re-entry',
      params: { batchID },
    },
    { apiName: this.apiName,...config });
  

  getBatchesReEntryByUserId = (userId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BatchesReEntryDto[]>({
      method: 'GET',
      url: `/api/app/batches-re-entry/batches-re-entry/${userId}`,
    },
    { apiName: this.apiName,...config });
  

  updateBatchStatusByInput = (input: BatchStatusUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/batches-re-entry/batch-status',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
