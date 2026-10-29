import React from 'react';
import {
  Search,
  X,
  Flame,
  UtensilsCrossed,
  Soup,
  Beef,
  Fish,
  Coffee,
  IceCream,
  SlidersHorizontal,
} from 'lucide-react';
import { Language, CategoryId } from '../types';
import { categoriesList } from '../menuData';
import { translations } from '../translations';

interface SearchAndFilterProps {
  currentLang: Language;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  activeDietaryFilter: 'all' | 'vegetarian' | 'spicy' | 'seafood';
  onSelectDietaryFilter: (filter: 'all' | 'vegetarian' | 'spicy' | 'seafood') => void;
  totalResultsCount: number;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  currentLang,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  activeDietaryFilter,
  onSelectDietaryFilter,
  totalResultsCount,
}) => {
  const t = translations[currentLang];

  const getCategoryIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-4 h-4 ${isSelected ? 'text-white' : 'text-[#C25E34]'}`;
    switch (iconName) {
      case 'Flame':
        return <Flame className={className} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className={className} />;
      case 'Soup':
        return <Soup className={className} />;
      case 'Beef':
        return <Beef className={className} />;
      case 'Fish':
        return <Fish className={className} />;
      case 'Coffee':
        return <Coffee className={className} />;
      case 'IceCream':
        return <IceCream className={className} />;
      default:
        return <SlidersHorizontal className={className} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 mb-5">
      {/* Search Input Bar */}
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search className="w-4 h-4 text-stone-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#C25E34]/20 focus:border-[#C25E34] transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
            aria-label={t.clearSearch}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Horizontal Category Navigation Bar */}
      <div className="relative -mx-3 px-3 sm:-mx-4 sm:px-4 overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1.5 sm:gap-2 pb-2">
        {/* All menu button */}
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 ${
            activeCategory === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200/90 hover:bg-stone-50'
          }`}
        >
          <SlidersHorizontal
            className={`w-3.5 h-3.5 ${
              activeCategory === 'all' ? 'text-amber-400' : 'text-stone-400'
            }`}
          />
          <span>{t.allCategories}</span>
        </button>

        {/* Categories list */}
        {categoriesList.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-[#C25E34] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200/90 hover:bg-stone-50'
              }`}
            >
              {getCategoryIcon(cat.iconName, isSelected)}
              <span>{cat.label[currentLang]}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary filter & result count: Dietary Preferences (Vegetarian, Spicy, Seafood) */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-stone-200/60 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => onSelectDietaryFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeDietaryFilter === 'all'
                ? 'bg-stone-200 text-stone-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.dietaryFilters.all}
          </button>
          <button
            type="button"
            onClick={() => onSelectDietaryFilter('vegetarian')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeDietaryFilter === 'vegetarian'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {t.dietaryFilters.vegetarian}
          </button>
          <button
            type="button"
            onClick={() => onSelectDietaryFilter('spicy')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeDietaryFilter === 'spicy'
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {t.dietaryFilters.spicy}
          </button>
          <button
            type="button"
            onClick={() => onSelectDietaryFilter('seafood')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeDietaryFilter === 'seafood'
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {t.dietaryFilters.seafood}
          </button>
        </div>

        <span className="text-[11px] font-medium text-stone-400">
          {t.dishesCount(totalResultsCount)}
        </span>
      </div>
    </div>
  );
};
