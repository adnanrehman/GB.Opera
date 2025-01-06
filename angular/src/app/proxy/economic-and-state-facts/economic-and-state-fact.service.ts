import type { ESDFactModel } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ESDFactDto } from '../commons/models';

@Injectable({
  providedIn: 'root',
})
export class EconomicAndStateFactService {
  apiName = 'Default';
  

  deletESDFactByIdByESDFactID = (ESDFactID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'DELETE',
      url: '/api/app/economic-and-state-fact/delet-eSDFact-by-id',
      params: { esdFactID: ESDFactID },
    },
    { apiName: this.apiName,...config });
  

  getAllESDFactMappings = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ESDFactDto[]>({
      method: 'GET',
      url: '/api/app/economic-and-state-fact/e-sDFact-mappings',
    },
    { apiName: this.apiName,...config });
  

  getESDFactbyIdByESDFactID = (ESDFactID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ESDFactModel[]>({
      method: 'GET',
      url: '/api/app/economic-and-state-fact/e-sDFactby-id',
      params: { esdFactID: ESDFactID },
    },
    { apiName: this.apiName,...config });
  

  saveUpdateESDFactByInput = (input: ESDFactModel, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ESDFactModel>({
      method: 'POST',
      url: '/api/app/economic-and-state-fact/save-update-eSDFact',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
