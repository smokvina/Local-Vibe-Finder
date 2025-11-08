// FIX: Removed circular self-import of 'Category'. It was causing a conflict with the enum declaration below.
export enum Category {
  PARTIES_CLUBS = 'PARTIES_CLUBS',
  CONCERTS_MUSIC = 'CONCERTS_MUSIC',
  CULTURE_EVENTS = 'CULTURE_EVENTS',
  SPORT_LEISURE = 'SPORT_LEISURE',
  GASTRO_FOOD = 'GASTRO_FOOD',
  COMMUNITY_FAIRS = 'COMMUNITY_FAIRS',
  FAMILY_KIDS = 'FAMILY_KIDS',
  EDUCATION_TECH = 'EDUCATION_TECH',
}

export type TimeStatus = 'DANAS' | 'OVOG_TJEDNA' | 'OVOG_MJESECA';

export interface Event {
  name: string;
  dateTime: string;
  address: string;
  description: string;
  sourceUrl: string;
  category: Category;
  vibe?: 'Underground Vibe';
  extraDetails?: string;
  timeStatus: TimeStatus;
  rawDate: string; // YYYY-MM-DD
}
