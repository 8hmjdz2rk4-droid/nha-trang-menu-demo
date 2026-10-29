import React, { useState, useMemo, useEffect } from 'react';
import { Utensils, PhoneCall, QrCode } from 'lucide-react';
import { Language, CategoryId, Dish } from './types';
import { restaurantConfig } from './restaurantConfig';
import { demoDishes } from './menuData';
import { translations } from './translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchAndFilter } from './components/SearchAndFilter';
import { DishCard } from './components/DishCard';
import { DishModal } from './components/DishModal';
import { WaiterCallModal } from './components/WaiterCallModal';
import { QrCodeModal } from './components/QrCodeModal';
import { CommercialFooter } from './components/CommercialFooter';

export default function App() {
  // Parse query params on load (e.g. ?table=Table%205&lang=ru)
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'ru' || urlLang === 'vi') {
        return urlLang;
      }
    }
    return restaurantConfig.defaultLanguage || 'en';
  });

  const [tableNumber, setTableNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTable = params.get('table');
      if (urlTable) {
        return urlTable;
      }
    }
    return restaurantConfig.defaultTableNumber || 'Table 1';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [activeDietaryFilter, setActiveDietaryFilter] = useState<'all' | 'vegetarian' | 'spicy' | 'seafood'>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const t = translations[currentLang];

  // Synchronize document language and title
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Filtered dishes memo
  const filteredDishes = useMemo(() => {
    return demoDishes.filter((dish) => {
      // 1. Search Query filter (checks English, Russian, Vietnamese names, original VN name, description, and ingredients)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesNameEn = dish.name.en.toLowerCase().includes(query);
        const matchesNameRu = dish.name.ru.toLowerCase().includes(query);
        const matchesNameVi = dish.name.vi.toLowerCase().includes(query);
        const matchesOrig = dish.vietnameseOriginalName.toLowerCase().includes(query);
        const matchesDesc = dish.description[currentLang].toLowerCase().includes(query);
        const matchesIngredients = dish.ingredients
          ? dish.ingredients[currentLang].toLowerCase().includes(query)
          : false;

        if (
          !matchesNameEn &&
          !matchesNameRu &&
          !matchesNameVi &&
          !matchesOrig &&
          !matchesDesc &&
          !matchesIngredients
        ) {
          return false;
        }
      }

      // 2. Category filter
      if (activeCategory === 'popular') {
        if (!dish.isPopular) return false;
      } else if (activeCategory !== 'all') {
        if (dish.category !== activeCategory) return false;
      }

      // 3. Dietary Filter
      if (activeDietaryFilter === 'vegetarian') {
        if (!dish.isVegetarian) return false;
      } else if (activeDietaryFilter === 'spicy') {
        if (!dish.isSpicy) return false;
      } else if (activeDietaryFilter === 'seafood') {
        if (dish.category !== 'seafood') return false;
      }

      return true;
    });
  }, [searchQuery, activeCategory, activeDietaryFilter, currentLang]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveDietaryFilter('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#F2DACD] selection:text-[#A1431E]">
      {/* Header with Language Switcher and Table selector */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        tableNumber={tableNumber}
        onOpenWaiterModal={() => setIsWaiterModalOpen(true)}
        onOpenQrModal={() => setIsQrModalOpen(true)}
      />

      <main className="flex-1 pb-24 sm:pb-16">
        {/* Hero Section with Nha Trang Branding */}
        <Hero currentLang={currentLang} />

        {/* Search Bar & Category Navigation */}
        <SearchAndFilter
          currentLang={currentLang}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeDietaryFilter={activeDietaryFilter}
          onSelectDietaryFilter={setActiveDietaryFilter}
          totalResultsCount={filteredDishes.length}
        />

        {/* Dishes Grid */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
              {filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  currentLang={currentLang}
                  onSelect={(d) => setSelectedDish(d)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 text-center max-w-md mx-auto my-6 shadow-xs">
              <div className="w-12 h-12 bg-amber-50 text-[#C25E34] rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-stone-900 mb-1">
                {t.emptyState.title}
              </h3>
              <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                {t.emptyState.description}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2.5 bg-[#C25E34] hover:bg-[#A1431E] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {t.emptyState.resetFilters}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Mobile Bottom Action Bar (iPhone 390px optimized) */}
      <aside
        aria-label="Mobile quick actions"
        className="fixed bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-auto sm:right-6 sm:w-auto z-40 flex items-center gap-2 max-w-sm sm:max-w-none mx-auto pb-[env(safe-area-inset-bottom)]"
      >
        <button
          type="button"
          onClick={() => setIsWaiterModalOpen(true)}
          className="flex-1 sm:flex-none py-3.5 px-4 sm:px-5 bg-[#C25E34] hover:bg-[#A1431E] text-white rounded-2xl shadow-xl shadow-[#C25E34]/25 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm border border-[#A1431E] transition-all active:scale-95 cursor-pointer"
        >
          <PhoneCall className="w-4 h-4 animate-pulse shrink-0" />
          <span>{t.waiterCall.buttonLabel} ({tableNumber})</span>
        </button>

        <button
          type="button"
          onClick={() => setIsQrModalOpen(true)}
          className="py-3.5 px-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl shadow-xl flex items-center justify-center font-bold text-xs border border-stone-800 transition-all active:scale-95 cursor-pointer shrink-0"
          title="Table QR Code"
          aria-label="Table QR Code"
        >
          <QrCode className="w-4 h-4 text-[#FF8D66]" />
        </button>
      </aside>

      {/* Dish Detailed View Modal */}
      <DishModal
        dish={selectedDish}
        currentLang={currentLang}
        onClose={() => setSelectedDish(null)}
      />

      {/* Waiter Call Modal (Direct hotline, WhatsApp & Zalo) */}
      <WaiterCallModal
        isOpen={isWaiterModalOpen}
        onClose={() => setIsWaiterModalOpen(false)}
        currentLang={currentLang}
        tableNumber={tableNumber}
        onUpdateTableNumber={setTableNumber}
      />

      {/* Table QR Code Generator Modal */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        currentLang={currentLang}
        currentTable={tableNumber}
        onSelectTable={setTableNumber}
      />

      {/* Commercial Footer */}
      <CommercialFooter
        currentLang={currentLang}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenWaiterModal={() => setIsWaiterModalOpen(true)}
      />
    </div>
  );
}
