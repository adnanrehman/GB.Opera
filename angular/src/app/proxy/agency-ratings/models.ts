
export interface AgencyDto {
  agencyId: number;
  agency?: string;
  aAgency?: string;
  introduction?: string;
  aIntroduction?: string;
  website?: string;
  isCredit: boolean;
}

export interface AgencyRatingDto {
  agencies: AgencyDto[];
  ratings: RatingDto[];
}

export interface RatingDto {
  ratingId: number;
  rating?: string;
  aRating?: string;
  brief?: string;
  aBrief?: string;
  isCredit: boolean;
}
