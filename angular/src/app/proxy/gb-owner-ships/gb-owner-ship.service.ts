import type { GbOwnerShip } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GbOwnerShipService {
  apiName = 'Default';
  

  deletGBOwnershipByIdByGBOwnershipID = (GBOwnershipID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'POST',
      url: '/api/app/gb-owner-ship/delet-gBOwnership-by-id',
      params: { gbOwnershipID: GBOwnershipID },
    },
    { apiName: this.apiName,...config });
  

  getAllFactsOwnershipMappings = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbOwnerShip[]>({
      method: 'GET',
      url: '/api/app/gb-owner-ship/facts-ownership-mappings',
    },
    { apiName: this.apiName,...config });
  

  getGBOwnershipbyIdByGBOwnershipID = (GBOwnershipID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbOwnerShip[]>({
      method: 'GET',
      url: '/api/app/gb-owner-ship/g-bOwnershipby-id',
      params: { gbOwnershipID: GBOwnershipID },
    },
    { apiName: this.apiName,...config });
  

  saveUpdateGbOwnerShipByGbOwnerShip = (gbOwnerShip: GbOwnerShip, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GbOwnerShip>({
      method: 'POST',
      url: '/api/app/gb-owner-ship/save-update-gb-owner-ship',
      body: gbOwnerShip,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
