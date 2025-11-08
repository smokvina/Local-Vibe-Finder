
export enum Category {
  PARTIES_CLUBS = 'PARTIES_CLUBS',
  CONCERTS_MUSIC = 'CONCERTS_MUSIC',
  CULTURE_EVENTS = 'CULTURE_EVENTS',
}

export interface Event {
  name: string;
  dateTime: string;
  address: string;
  description: string;
  sourceUrl: string;
  category: Category;
}
