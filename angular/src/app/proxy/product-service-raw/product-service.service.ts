import type { ProcductServiceRaw, ProductsRaw } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  apiName = 'Default';
  

  getAllProcductServiceRaw = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProcductServiceRaw[]>({
      method: 'GET',
      url: '/api/app/product-service/procduct-service-raw',
    },
    { apiName: this.apiName,...config });
  

  getProductServiceRawByIDByProductServiceRawID = (ProductServiceRawID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductsRaw[]>({
      method: 'GET',
      url: '/api/app/product-service/product-service-raw-by-iD',
      params: { productServiceRawID: ProductServiceRawID },
    },
    { apiName: this.apiName,...config });
  

  saveUpdateByGbFact = (gbFact: ProductsRaw, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductsRaw>({
      method: 'POST',
      url: '/api/app/product-service/save-update',
      body: gbFact,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
