import { Language, CategoryId } from './types';

export interface TranslationDictionary {
  appName: string;
  searchPlaceholder: string;
  clearSearch: string;
  viewDetails: string;
  popularSectionTitle: string;
  dishesCount: (count: number) => string;
  allCategories: string;
  categories: Record<CategoryId, string>;
  categoryDescriptions: Record<CategoryId, string>;
  dietaryFilters: {
    all: string;
    vegetarian: string;
    spicy: string;
    seafood: string;
  };
  badges: {
    popular: string;
    spicy: string;
    vegetarian: string;
    vietnameseOriginal: string;
  };
  dishDetails: {
    price: string;
    ingredients: string;
    allergens: string;
    portion: string;
    preparationTime: string;
    minutes: string;
    close: string;
    allergenWarningTitle: string;
    verifiedNotice: string;
  };
  waiterCall: {
    title: string;
    buttonLabel: string;
    subtitle: string;
    tablePrompt: string;
    tableCurrent: string;
    changeTable: string;
    saveTable: string;
    directCall: string;
    directCallDesc: string;
    whatsappCall: string;
    whatsappCallDesc: string;
    zaloCall: string;
    zaloCallDesc: string;
    staffNotice: string;
    configuredHotline: string;
  };
  qrGenerator: {
    buttonLabel: string;
    title: string;
    subtitle: string;
    selectHint: string;
    printHint: string;
    tablePrefix: string;
    copyLink: string;
    copied: string;
    openLink: string;
  };
  demoBanner: {
    badge: string;
    text: string;
    cta: string;
  };
  emptyState: {
    title: string;
    description: string;
    resetFilters: string;
  };
  restaurantInfo: {
    hours: string;
    address: string;
    hotline: string;
    contactStaff: string;
    wifiName: string;
    wifiPassword: string;
    viewLocation: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'NHA TRANG MENU',
    searchPlaceholder: 'Search dishes, pho, seafood, rolls...',
    clearSearch: 'Clear',
    viewDetails: 'Details',
    popularSectionTitle: 'Chef’s Recommendations',
    dishesCount: (count) => `${count} ${count === 1 ? 'dish' : 'dishes'} available`,
    allCategories: 'All Menu',
    categories: {
      popular: 'Popular',
      appetizers: 'Appetizers',
      soups: 'Soups',
      mains: 'Main Dishes',
      seafood: 'Seafood',
      drinks: 'Drinks',
      desserts: 'Desserts',
    },
    categoryDescriptions: {
      popular: 'Most beloved Vietnamese classics curated for travelers.',
      appetizers: 'Light, crunchy bites and fresh handmade rolls.',
      soups: 'Slow-simmered rich broths with artisanal rice noodles.',
      mains: 'Hearty traditional meat, poultry, and clay pot specialties.',
      seafood: 'Wild-caught fresh coastal treasures from Nha Trang Bay.',
      drinks: 'Legendary Vietnamese coffees, fresh tropical juices & smoothies.',
      desserts: 'Traditional sweet coconut chè and tropical delicacies.',
    },
    dietaryFilters: {
      all: 'All',
      vegetarian: 'Vegetarian 🌱',
      spicy: 'Spicy 🌶️',
      seafood: 'Seafood 🦐',
    },
    badges: {
      popular: 'Signature',
      spicy: 'Spicy',
      vegetarian: 'Vegetarian',
      vietnameseOriginal: 'Vietnamese name',
    },
    dishDetails: {
      price: 'Price',
      ingredients: 'Ingredients',
      allergens: 'Allergen Information',
      portion: 'Serving Size',
      preparationTime: 'Est. Prep Time',
      minutes: 'min',
      close: 'Close',
      allergenWarningTitle: 'Certified Allergen Guidance',
      verifiedNotice: 'Verified kitchen data. Please inform staff if you have severe allergies.',
    },
    waiterCall: {
      title: 'Call Staff / Waiter',
      buttonLabel: 'Call Waiter',
      subtitle: 'Instant direct connection to our floor staff and service desk',
      tablePrompt: 'Your Table Number',
      tableCurrent: 'Table',
      changeTable: 'Change',
      saveTable: 'Confirm',
      directCall: 'Instant Phone Call',
      directCallDesc: 'Direct line to floor manager & service team',
      whatsappCall: 'Message via WhatsApp',
      whatsappCallDesc: 'Send instant table assistance request',
      zaloCall: 'Contact via Zalo',
      zaloCallDesc: 'Vietnam’s primary messaging app',
      staffNotice: 'Staff will attend to your table shortly after receiving your message or call.',
      configuredHotline: 'Verified direct contact hotline:',
    },
    qrGenerator: {
      buttonLabel: 'QR Code Preview',
      title: 'Table QR Code Generator',
      subtitle: 'Printable QR code for restaurant tables in Nha Trang',
      selectHint: 'Choose a table number to generate a direct link:',
      printHint: 'Tourists scanning this code will open the menu with their table number pre-selected.',
      tablePrefix: 'Table',
      copyLink: 'Copy Table Link',
      copied: 'Copied!',
      openLink: 'Open Preview',
    },
    demoBanner: {
      badge: 'COMMERCIAL DEMO',
      text: 'Demonstration menu. Recipes, prices, and imagery are displayed for demonstration and commercial review.',
      cta: 'Commercial Architecture Active',
    },
    emptyState: {
      title: 'No dishes found',
      description: 'Try adjusting your search query or removing active dietary filters.',
      resetFilters: 'Reset all filters',
    },
    restaurantInfo: {
      hours: 'Opening Hours',
      address: 'Address',
      hotline: 'Hotline',
      contactStaff: 'Need Help?',
      wifiName: 'DEMO_RESTAURANT_WIFI',
      wifiPassword: 'demo123456',
      viewLocation: 'Nha Trang Beachside',
    },
  },
  ru: {
    appName: 'NHA TRANG MENU',
    searchPlaceholder: 'Поиск блюд, супов, морепродуктов...',
    clearSearch: 'Очистить',
    viewDetails: 'Подробнее',
    popularSectionTitle: 'Рекомендации шефа',
    dishesCount: (count) => `${count} ${count === 1 ? 'блюдо' : count < 5 ? 'блюда' : 'блюд'}`,
    allCategories: 'Всё меню',
    categories: {
      popular: 'Популярное',
      appetizers: 'Закуски',
      soups: 'Супы',
      mains: 'Основные блюда',
      seafood: 'Морепродукты',
      drinks: 'Напитки',
      desserts: 'Десерты',
    },
    categoryDescriptions: {
      popular: 'Самые любимые блюда вьетнамской кухни для первого знакомства.',
      appetizers: 'Легкие хрустящие закуски и свежие ручные спринг-роллы.',
      soups: 'Наваристые бульоны долгого томления с домашней рисовой лапшой.',
      mains: 'Сытные традиционные блюда в глиняных горшочках и на гриле.',
      seafood: 'Свежайший улов из залива Нячанг: креветки, кальмары, рыба.',
      drinks: 'Знаменитый вьетнамский кофе, фруктовые смузи и освежающие соки.',
      desserts: 'Традиционные сладкие кокосовые десерты Чэ и тропические сладости.',
    },
    dietaryFilters: {
      all: 'Все',
      vegetarian: 'Вегетарианское 🌱',
      spicy: 'Острое 🌶️',
      seafood: 'Морепродукты 🦐',
    },
    badges: {
      popular: 'Хит',
      spicy: 'Острое',
      vegetarian: 'Веган',
      vietnameseOriginal: 'Вьетнамское название',
    },
    dishDetails: {
      price: 'Стоимость',
      ingredients: 'Состав блюда',
      allergens: 'Аллергены',
      portion: 'Размер порции',
      preparationTime: 'Время готовки',
      minutes: 'мин',
      close: 'Закрыть',
      allergenWarningTitle: 'Подтвержденные данные об аллергенах',
      verifiedNotice: 'Данные предоставлены кухней. Если у вас сильная аллергия, пожалуйста, предупредите персонал.',
    },
    waiterCall: {
      title: 'Связь с персоналом / Официант',
      buttonLabel: 'Вызов официанта',
      subtitle: 'Прямая связь со сменой зала и администратором ресторана',
      tablePrompt: 'Номер вашего столика',
      tableCurrent: 'Столик',
      changeTable: 'Изменить',
      saveTable: 'Подтвердить',
      directCall: 'Прямой звонок администратору',
      directCallDesc: 'Срочный вызов на линию ресторана в Нячанге',
      whatsappCall: 'Запрос через WhatsApp',
      whatsappCallDesc: 'Отправить сообщение с номером столика',
      zaloCall: 'Связь через Zalo',
      zaloCallDesc: 'Главный мессенджер во Вьетнаме',
      staffNotice: 'Официант подойдёт к указанному столику сразу после поступления звонка или сообщения.',
      configuredHotline: 'Подключенный телефон заведения:',
    },
    qrGenerator: {
      buttonLabel: 'QR-коды столиков',
      title: 'Генератор QR-кода столика',
      subtitle: 'Готовый QR-код для печати на тейбл-тентах ресторанов Нячанга',
      selectHint: 'Выберите номер столика для формирования персональной ссылки:',
      printHint: 'При сканировании турист сразу открывает меню с автоматически выбранным столиком.',
      tablePrefix: 'Столик',
      copyLink: 'Скопировать ссылку',
      copied: 'Скопировано!',
      openLink: 'Открыть просмотр',
    },
    demoBanner: {
      badge: 'ДЕМОНСТРАЦИОННАЯ ВЕРСИЯ',
      text: 'Демонстрационные данные. Цены, рецепты и фотографии представлены для демонстрации возможностей платформы.',
      cta: 'Модульная архитектура',
    },
    emptyState: {
      title: 'Блюда не найдены',
      description: 'Попробуйте изменить поисковый запрос или сбросить фильтры.',
      resetFilters: 'Сбросить фильтры',
    },
    restaurantInfo: {
      hours: 'Часы работы',
      address: 'Адрес',
      hotline: 'Горячая линия',
      contactStaff: 'Помощь зала',
      wifiName: 'DEMO_RESTAURANT_WIFI',
      wifiPassword: 'demo123456',
      viewLocation: 'Пляжная линия Нячанга',
    },
  },
  vi: {
    appName: 'NHA TRANG MENU',
    searchPlaceholder: 'Tìm món ăn, phở, hải sản, cuốn...',
    clearSearch: 'Xóa',
    viewDetails: 'Chi tiết',
    popularSectionTitle: 'Món Ngon Nổi Bật',
    dishesCount: (count) => `${count} món ăn`,
    allCategories: 'Tất cả thực đơn',
    categories: {
      popular: 'Phổ biến',
      appetizers: 'Khai vị',
      soups: 'Món nước',
      mains: 'Món chính',
      seafood: 'Hải sản',
      drinks: 'Đồ uống',
      desserts: 'Tráng miệng',
    },
    categoryDescriptions: {
      popular: 'Tuyển tập những hương vị đặc trưng được du khách yêu thích nhất.',
      appetizers: 'Gỏi cuốn thanh mát, nem rán giòn tan bắt vị giác.',
      soups: 'Nước dùng ninh xương thảo mộc thơm lừng cùng sợi bánh thủ công.',
      mains: 'Món ngon đậm đà cơm tấm, cá kho tộ mang phong vị gia đình.',
      seafood: 'Hải sản tươi sống đánh bắt tự nhiên từ vùng biển Nha Trang.',
      drinks: 'Cà phê muối, sinh tố bơ Đà Lạt thơm ngon béo ngậy.',
      desserts: 'Chè ba màu truyền thống, thạch dừa thanh nhiệt ngọt ngào.',
    },
    dietaryFilters: {
      all: 'Tất cả',
      vegetarian: 'Món Chay 🌱',
      spicy: 'Vị Cay 🌶️',
      seafood: 'Hải Sản 🦐',
    },
    badges: {
      popular: 'Bán chạy',
      spicy: 'Cay',
      vegetarian: 'Chay',
      vietnameseOriginal: 'Tên gốc tiếng Việt',
    },
    dishDetails: {
      price: 'Giá món',
      ingredients: 'Nguyên liệu',
      allergens: 'Thông tin dị ứng',
      portion: 'Khẩu phần',
      preparationTime: 'Thời gian chuẩn bị',
      minutes: 'phút',
      close: 'Đóng',
      allergenWarningTitle: 'Cảnh báo dị ứng thực phẩm',
      verifiedNotice: 'Dữ liệu xác thực từ bếp. Quý khách vui lòng báo trước với nhân viên nếu có tiền sử dị ứng.',
    },
    waiterCall: {
      title: 'Hỗ trợ / Gọi Phục vụ',
      buttonLabel: 'Gọi nhân viên',
      subtitle: 'Kết nối nhanh với nhân viên bàn và quầy quản lý',
      tablePrompt: 'Số bàn của bạn',
      tableCurrent: 'Bàn',
      changeTable: 'Đổi bàn',
      saveTable: 'Xác nhận',
      directCall: 'Gọi Hotline trực tiếp',
      directCallDesc: 'Kết nối tức thì với quản lý sảnh',
      whatsappCall: 'Nhắn qua WhatsApp',
      whatsappCallDesc: 'Gửi yêu cầu phục vụ kèm số bàn',
      zaloCall: 'Liên hệ qua Zalo',
      zaloCallDesc: 'Kênh liên lạc phổ biến tại Việt Nam',
      staffNotice: 'Nhân viên sẽ có mặt tại bàn ngay sau khi nhận được yêu cầu.',
      configuredHotline: 'Hotline đã kết nối thực tế:',
    },
    qrGenerator: {
      buttonLabel: 'Mã QR bàn',
      title: 'Tạo mã QR theo số bàn',
      subtitle: 'Mã QR in sẵn cho từng bàn tại nhà hàng Nha Trang',
      selectHint: 'Chọn số bàn để tạo đường dẫn tự động:',
      printHint: 'Du khách quét mã sẽ vào thẳng thực đơn với số bàn đã được định danh.',
      tablePrefix: 'Bàn',
      copyLink: 'Sao chép liên kết',
      copied: 'Đã sao chép!',
      openLink: 'Mở trang xem thử',
    },
    demoBanner: {
      badge: 'PHIÊN BẢN DEMO',
      text: 'Dữ liệu mẫu. Hình ảnh, thực đơn và giá cả dùng để trình diễn giải pháp thực đơn số.',
      cta: 'Cấu trúc thương mại chuẩn',
    },
    emptyState: {
      title: 'Không tìm thấy món phù hợp',
      description: 'Vui lòng thử từ khóa khác hoặc xóa bộ lọc ăn kiêng.',
      resetFilters: 'Đặt lại bộ lọc',
    },
    restaurantInfo: {
      hours: 'Giờ mở cửa',
      address: 'Địa chỉ',
      hotline: 'Hotline hỗ trợ',
      contactStaff: 'Hỗ trợ thực khách',
      wifiName: 'DEMO_RESTAURANT_WIFI',
      wifiPassword: 'demo123456',
      viewLocation: 'Mặt tiền đường Trần Phú, Nha Trang',
    },
  },
};
