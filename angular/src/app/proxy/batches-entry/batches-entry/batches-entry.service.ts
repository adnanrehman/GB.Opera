import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BatchesEntries, BatchesEntryDto, ESDFactsMappings } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BatchesEntryService {
  apiName = 'Default';
  

  getBatchesEntryByUserId = (userId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BatchesEntryDto[]>({
      method: 'GET',
      url: `/api/app/batches-entry/batches-entry/${userId}`,
    },
    { apiName: this.apiName,...config });
  

  insertBatchesEntriesByList = (list: BatchesEntries[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/batches-entry/batches-entries',
      body: list,
    },
    { apiName: this.apiName,...config });
  

  getESDFactsMappingsYearlyByBatchIDAndBatchESDfactID = (BatchID: number, BatchESDfactID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ESDFactsMappings[]>({
      method: 'GET',
      url: '/api/app/batches-entry/get-eSDFacts-mappings-yearly',
      params: { batchID: BatchID, batchESDfactID: BatchESDfactID },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
