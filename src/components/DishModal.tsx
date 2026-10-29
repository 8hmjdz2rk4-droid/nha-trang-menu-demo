import React, { useEffect } from 'react';
import {
  X,
  Flame,
  Leaf,
  AlertTriangle,
  Clock,
  Scale,
  Sparkles,
} from 'lucide-react';
import { Dish, Language } from '../types';
import { translations } from '../translations';

const ChiliIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    className={className}
  >
    <path d="M12 2c-.5 2-2 3.5-4 4-3 1-5 4-5 8 0 5 4 8 9 8s9-3 9-8c0-4-3-7-6-8.5C14.5 4.5 13.5 3 12 2z" />
  </svg>
);

interface DishModalProps {
  dish: Dish | null;
  currentLang: Language;
  onClose: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, currentLang, onClose }) => {
  const t = translations[currentLang];

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (dish) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [dish]);

  if (!dish) return null;

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(dish.price);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative bg-white w-full sm:max-w-xl max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label={t.dishDetails.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto max-h-[88vh]">
          {/* Header Image */}
          <div className="relative aspect-16/10 w-full bg-stone-900">
            <img
              src={dish.imageUrl}
              alt={dish.name[currentLang]}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />

            {/* Badges on Modal Image */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {dish.isPopular && (
                <span className="inline-flex items-center gap-1 bg-[#C25E34] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                  <Flame className="w-3.5 h-3.5" />
                  {t.badges.popular}
                </span>
              )}
              {dish.isVegetarian && (
                <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                  <Leaf className="w-3.5 h-3.5" />
                  {t.badges.vegetarian}
                </span>
              )}
              {dish.isSpicy && (
                <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                  <ChiliIcon className="w-3.5 h-3.5" />
                  {t.badges.spicy}
                </span>
              )}
            </div>

            {/* Price on Image */}
            <div className="absolute bottom-3 right-3">
              <div className="bg-[#C25E34] text-white px-3.5 py-1.5 rounded-xl shadow-lg font-bold text-lg flex items-baseline gap-1">
                <span>{formattedPrice}</span>
                <span className="text-xs font-normal">₫</span>
              </div>
            </div>

            {/* Vietnamese Authentic Name badge */}
            <div className="absolute bottom-3 left-3 max-w-[65%]">
              <span className="text-xs font-semibold text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md block truncate">
                {dish.vietnameseOriginalName}
              </span>
            </div>
          </div>

          {/* Modal Details Body */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 leading-snug">
                {dish.name[currentLang]}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
                {dish.description[currentLang]}
              </p>
            </div>

            {/* Meta tags: Portion & Cooking Time */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {dish.portionSize && (
                <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-2.5 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-stone-500 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                      {t.dishDetails.portion}
                    </span>
                    <span className="text-xs font-medium text-stone-800">
                      {dish.portionSize[currentLang]}
                    </span>
                  </div>
                </div>
              )}

              {dish.preparationTimeMinutes && (
                <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-2.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                      {t.dishDetails.preparationTime}
                    </span>
                    <span className="text-xs font-medium text-stone-800">
                      ~{dish.preparationTimeMinutes} {t.dishDetails.minutes}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients Section */}
            {dish.ingredients && (
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C25E34]" />
                  <span>{t.dishDetails.ingredients}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {dish.ingredients[currentLang]}
                </p>
              </div>
            )}

            {/* Certified Allergen Section */}
            {dish.allergens ? (
              <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wide mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{t.dishDetails.allergens}</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                  {dish.allergens[currentLang]}
                </p>
                <p className="text-[11px] text-rose-700/80 mt-1 italic">
                  {t.dishDetails.verifiedNotice}
                </p>
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3 text-[11px] text-stone-500">
                <span className="font-semibold text-stone-700">{t.dishDetails.allergens}:</span>{' '}
                {t.dishDetails.verifiedNotice}
              </div>
            )}

            {/* Bottom Actions & Demo disclaimer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10px] text-stone-400 font-medium tracking-wide">
                • DEMO MENU • Fictional pricing & ingredients for preview
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer text-center"
              >
                {t.dishDetails.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
