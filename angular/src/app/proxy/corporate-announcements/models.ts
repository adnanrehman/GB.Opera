
export interface CorporateAnnouncementDto {
  corporateAnnouncementID: number;
  companyID: number;
  announcementTypeID: number;
  announcedDate?: string;
  announcedDateTime?: string;
  ticker?: string;
  announcement?: string;
  aAnnouncement?: string;
  gulfbaseID: number;
  creationDate?: string;
  isActive: boolean;
}
