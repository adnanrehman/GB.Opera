
export interface ESDFactModel {
  esdFactID: number;
  parentID: number;
  esdFact?: string;
  aesdFact?: string;
  isTitle: boolean;
  daily: boolean;
  weekly: boolean;
  monthly: boolean;
  quarterly: boolean;
  yearly: boolean;
  forcast: boolean;
  measurementUnit?: string;
  currency?: string;
  rootParentESDFactID: number;
}
