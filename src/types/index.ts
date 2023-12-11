export interface AnimalProfile {
  name: string;
  taxonomy: Record<string, string>;
  locations: string[];
  characteristics: Record<string, string>;
  isFavourite?: boolean;
  rating?: number;
  preferences?: Record<string, string>;
  likedCharacteristics?: Record<string, string>;
  dislikedCharacteristics?: Record<string, string>;
}
