import { Category } from './types';

export const CATEGORY_MAP: Record<Category, { title: string; }> = {
  [Category.PARTIES_CLUBS]: { title: '🔥 Top Partyji i Klubovi' },
  [Category.CONCERTS_MUSIC]: { title: '🎶 Glazba i Koncerti' },
  [Category.CULTURE_EVENTS]: { title: '🎭 Kultura i Manifestacije' },
  [Category.SPORT_LEISURE]: { title: '🏃 Sport i Rekreacija' },
  [Category.GASTRO_FOOD]: { title: '🍽️ Gastro i Piće' },
  [Category.COMMUNITY_FAIRS]: { title: '🛍️ Zajednica i Sajmovi' },
  [Category.FAMILY_KIDS]: { title: '👨‍👩‍👧‍👦 Obitelj i Djeca' },
  [Category.EDUCATION_TECH]: { title: '🧠 Edukacija i Tech' },
};
