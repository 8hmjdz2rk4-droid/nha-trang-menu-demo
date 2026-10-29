export type Language = 'en' | 'ru' | 'vi';

export type CategoryId =
  | 'popular'
  | 'appetizers'
  | 'soups'
  | 'mains'
  | 'seafood'
  | 'drinks'
  | 'desserts';

export interface LocalizedString {
  en: string;
  ru: string;
  vi: string;
}

export interface Dish {
  id: string;
  name: LocalizedString;
  vietnameseOriginalName: string; // Original authentic Vietnamese dish name (e.g., 'Phở Bò Tái Nạm')
  description: LocalizedString;
  price: number; // in VND (Vietnamese Dong)
  category: CategoryId;
  imageUrl: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  spiceLevel?: 1 | 2 | 3;
  isVegetarian?: boolean;
  portionSize?: LocalizedString;
  preparationTimeMinutes?: number;
  ingredients?: LocalizedString;
  allergens?: LocalizedString;
}

export interface RestaurantConfig {
  id: string;

  // 1. Restaurant Name & Subtitle
  restaurantName: string;
  brandName: string; // Backward compatibility alias
  subtitle: LocalizedString;
  tagline: LocalizedString; // Backward compatibility alias
  description: LocalizedString;

  // 2. Logo
  logo: {
    type?: 'text' | 'image';
    text: string;
    imageUrl?: string;
  };
  logoEmblem?: string;

  // 3. Location & Opening Hours
  city: string;
  address: string;
  openingHours: string;
  workingHours: string; // Backward compatibility alias
  workingDays: LocalizedString;

  // 4. Contact & Staff Lines
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappNumber?: string; // Backward compatibility alias
  zalo: string;
  zaloId?: string; // Backward compatibility alias

  // 5. Guest Amenities (Wi-Fi)
  wifi: {
    name: string;
    password: string;
  };

  // 6. Brand Colors
  brandColors: {
    primary: string; // Terracotta #C25E34
    primaryDark: string; // #A1431E
    primaryLight: string; // #FDF6F0
    bgWarm: string; // #FAF8F5
    textDark: string; // #1C1917
  };

  // 7. Localization & Currencies
  availableLanguages: Language[];
  defaultLanguage: Language;
  currency: string;
  defaultTableNumber: string;

  // 8. Visual Media & Notes
  heroImage: string;
  taxNote: LocalizedString;

  // 9. Demo Disclaimer Control
  demoNotice: {
    isDemo: boolean;
    badgeText: string;
  };
}

export interface CategoryInfo {
  id: CategoryId;
  label: LocalizedString;
  iconName: string;
}
