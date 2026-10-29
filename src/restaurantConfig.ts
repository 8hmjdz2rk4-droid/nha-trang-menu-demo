import { RestaurantConfig } from './types';

/**
 * ============================================================================
 * COMMERCIAL RESTAURANT CONFIGURATION (NHA TRANG, VIETNAM)
 * ============================================================================
 *
 * NOTE: All values below are explicitly FICTIONAL DEMO PLACEHOLDERS.
 * To adapt this menu for a real client restaurant in Nha Trang, simply replace
 * these demo placeholders with the client's actual contact information, address,
 * and Wi-Fi credentials.
 */
export const restaurantConfig: RestaurantConfig = {
  id: 'nha-trang-menu-commercial-demo',

  // 1. Restaurant Name & Subtitle
  restaurantName: 'NHA TRANG MENU',
  brandName: 'NHA TRANG MENU', // Backward compatibility alias
  subtitle: {
    en: 'Digital Restaurant Menu',
    ru: 'Цифровое меню ресторана',
    vi: 'Thực đơn số nhà hàng',
  },
  tagline: {
    en: 'Digital Restaurant Menu',
    ru: 'Цифровое меню ресторана',
    vi: 'Thực đơn số nhà hàng',
  },
  description: {
    en: 'Experience the harmonious balance of five elemental flavors in Nha Trang. We honor traditional Vietnamese recipes using fresh local seafood from Nha Trang Bay and fragrant highland herbs from Dalat.',
    ru: 'Гармония пяти вкусов в самом центре Нячанга. Традиционные семейные рецепты, свежайшие морепродукты из залива Нячанг и ароматные горные травы из Далата.',
    vi: 'Trải nghiệm sự giao thoa hài hòa của ngũ vị phương Nam ngay tại vịnh biển Nha Trang. Món ăn gia truyền chế biến từ hải sản địa phương tươi ngon và thảo mộc Đà Lạt tự nhiên.',
  },

  // 2. Logo Configuration
  logo: {
    type: 'text',
    text: 'NT', // Monogram badge shown in header and footer
    imageUrl: undefined, // Optional: url to client PNG/SVG logo
  },
  logoEmblem: 'NT',

  // 3. Location & Opening Hours (Fictional Demo Address)
  city: 'Nha Trang, Vietnam',
  address: '00 Demo Boulevard, Loc Tho, Nha Trang, Khanh Hoa, Vietnam (Sample Address)',
  openingHours: '10:00 — 23:00 (Demo Hours)',
  workingHours: '10:00 — 23:00 (Demo Hours)',
  workingDays: {
    en: 'Daily (Sample Hours)',
    ru: 'Ежедневно (Демо-график)',
    vi: 'Mỗi ngày (Giờ hoạt động mẫu)',
  },

  // 4. Contact & Staff Hotline (Fictional Demo Placeholders)
  phone: '+84000000000',
  phoneDisplay: '+84 (0) 000 000 000 (Demo)',
  whatsapp: '84000000000',
  whatsappNumber: '84000000000',
  zalo: '0000000000',
  zaloId: '0000000000',

  // 5. Guest Amenities (Fictional Demo Wi-Fi Credentials)
  wifi: {
    name: 'DEMO_RESTAURANT_WIFI',
    password: 'demo123456',
  },

  // 6. Brand Colors (Warm Terracotta & Soft Stone)
  brandColors: {
    primary: '#C25E34', // Warm terracotta
    primaryDark: '#A1431E', // Deep terracotta
    primaryLight: '#FDF6F0', // Soft terracotta cream
    bgWarm: '#FAF8F5', // Off-white warm dining background
    textDark: '#1C1917', // Stone 900
  },

  // 7. Localization & Currencies
  availableLanguages: ['en', 'ru', 'vi'],
  defaultLanguage: 'en',
  currency: '₫',
  defaultTableNumber: 'Table 1',

  // 8. Visual Media & Legal / Tax Notes
  heroImage: 'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=1600&q=85',
  taxNote: {
    en: 'All prices in VND include 8% VAT. Service charge not included.',
    ru: 'Все цены в VND включают НДС 8%. Чаевые остаются на ваше усмотрение.',
    vi: 'Giá đã bao gồm 8% thuế GTGT. Chưa bao gồm phí phục vụ.',
  },

  // 9. Subtle Demo Badge (Protects presenter from accidental real claims)
  demoNotice: {
    isDemo: true,
    badgeText: 'DEMO MENU',
  },
};
