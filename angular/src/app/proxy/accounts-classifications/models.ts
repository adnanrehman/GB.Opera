
export interface ACFactsDtos {
  acFactId: number;
  parentId: number;
  acFact?: string;
  parent?: string;
  aAcFact?: string;
}

export interface GbAcFactsAccount {
  acFactID: number;
  acFact: string;
  parentID: number;
  aacFact?: string;
  isACAccount: boolean;
  isTitle: boolean;
  gbFactID?: number;
}
