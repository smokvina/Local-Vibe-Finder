
import { Category } from './types';

export const CATEGORY_MAP: Record<Category, { title: string; }> = {
  [Category.PARTIES_CLUBS]: { title: '🔥 Top Partyji i Klubovi' },
  [Category.CONCERTS_MUSIC]: { title: '🎶 Koncerti i Live Glazba' },
  [Category.CULTURE_EVENTS]: { title: '🎭 Kultura i Manifestacije' },
};
