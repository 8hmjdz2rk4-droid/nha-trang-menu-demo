import React from 'react';
import { Flame, Leaf, Eye, Clock } from 'lucide-react';
import { Dish, Language } from '../types';
import { translations } from '../translations';

const ChiliIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
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

interface DishCardProps {
  dish: Dish;
  currentLang: Language;
  onSelect: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, currentLang, onSelect }) => {
  const t = translations[currentLang];

  // Format price with Vietnamese Dong convention (e.g. 95.000 ₫)
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(dish.price);

  return (
    <article
      onClick={() => onSelect(dish)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-[#C25E34]/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer transform active:scale-[0.99]"
    >
      {/* Visual Image container with badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <img
          src={dish.imageUrl}
          alt={dish.name[currentLang]}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient vignette for badges readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20" />

        {/* Top badges: Signature / Spicy / Vegetarian */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {dish.isPopular && (
              <span className="inline-flex items-center gap-1 bg-[#C25E34] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                <Flame className="w-3 h-3" />
                {t.badges.popular}
              </span>
            )}
            {dish.isVegetarian && (
              <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                <Leaf className="w-3 h-3" />
                {t.badges.vegetarian}
              </span>
            )}
            {dish.isSpicy && (
              <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                <ChiliIcon className="w-3 h-3" />
                {dish.spiceLevel && dish.spiceLevel > 1 ? `${t.badges.spicy} 2x` : t.badges.spicy}
              </span>
            )}
          </div>

          {dish.preparationTimeMinutes && (
            <span className="inline-flex items-center gap-1 bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[10px] font-medium px-2 py-0.5 rounded-full border border-stone-700/60">
              <Clock className="w-2.5 h-2.5 text-amber-300" />
              {dish.preparationTimeMinutes} {t.dishDetails.minutes}
            </span>
          )}
        </div>

        {/* Price tag pinned to bottom-right of photo for maximum visual clarity */}
        <div className="absolute bottom-2.5 right-2.5">
          <div className="bg-stone-900/90 backdrop-blur-md text-white font-bold text-sm sm:text-base px-2.5 py-1 rounded-xl shadow-md border border-stone-700 flex items-baseline gap-0.5">
            <span className="text-[#FF8D66] font-semibold">{formattedPrice}</span>
            <span className="text-xs text-stone-300">₫</span>
          </div>
        </div>

        {/* Vietnamese Original name badge on bottom-left of photo */}
        <div className="absolute bottom-2.5 left-2.5 max-w-[55%]">
          <span className="inline-block bg-black/60 backdrop-blur-xs text-white/95 text-[10px] font-medium px-2 py-0.5 rounded-md truncate">
            {dish.vietnameseOriginalName}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Dish title in current language */}
          <h3 className="font-bold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-[#C25E34] transition-colors">
            {dish.name[currentLang]}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
            {dish.description[currentLang]}
          </p>
        </div>

        {/* Bottom micro-info & Tap CTA */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span className="text-[11px] text-stone-400 font-normal">
            {dish.portionSize ? dish.portionSize[currentLang] : ''}
          </span>

          <span className="inline-flex items-center gap-1 font-semibold text-[#C25E34] group-hover:underline decoration-[#C25E34] text-xs">
            <Eye className="w-3.5 h-3.5" />
            {t.viewDetails}
          </span>
        </div>
      </div>
    </article>
  );
};
