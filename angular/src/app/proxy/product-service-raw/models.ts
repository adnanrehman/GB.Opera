
export interface ProcductServiceRaw {
  productServiceRawID: number;
  parentID: number;
  name?: string;
  aName?: string;
}

export interface ProductsRaw {
  productServiceRawID: number;
  parentID?: number;
  name?: string;
  aName?: string;
  description?: string;
  aDescription?: string;
  isTitle?: boolean;
}
