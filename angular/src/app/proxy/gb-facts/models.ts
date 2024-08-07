
export interface GbFactListDto {
  gbFactID: number;
  gbFact?: string;
  parentId: number;
  agbFact?: string;
}

export interface GbFactsAccount {
  gbFactID: number;
  gbFact: string;
  parentID: number;
  agbFact?: string;
  isGBAccount: boolean;
  isTitle: boolean;
}
