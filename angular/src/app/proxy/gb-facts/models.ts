
export interface GbFactDto {
  name: string;
  publishDate: string;
  price: number;
}

export interface GbFactListDto {
  gbFactID: number;
  gbFact?: string;
  parentId: number;
}
