import React, { useState } from 'react';
import { Clock, Info, ChevronDown, ChevronUp, Sparkles, Utensils, MapPin } from 'lucide-react';
import { Language } from '../types';
import { restaurantConfig } from '../restaurantConfig';
import { translations } from '../translations';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const t = translations[currentLang];

  return (
    <div className="relative mb-5">
      {/* Visual Hero Banner with atmospheric image and dark terracotta gradient */}
      <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-stone-900 rounded-b-3xl sm:rounded-3xl max-w-4xl mx-auto shadow-md">
        <img
          src={restaurantConfig.heroImage}
          alt={restaurantConfig.restaurantName}
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.05]"
          loading="eager"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent" />
        <div className="absolute inset-0 bg-[#8F3512]/20 mix-blend-multiply" />

        {/* Content pinned to bottom of banner */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white flex flex-col justify-end">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <span className="inline-flex items-center gap-1 bg-[#C25E34] text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3 h-3" />
              {restaurantConfig.city}
            </span>
            <span className="inline-flex items-center gap-1 bg-stone-900/80 backdrop-blur-md text-stone-200 border border-stone-700 text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-amber-400" />
              {restaurantConfig.openingHours}
            </span>
            {restaurantConfig.demoNotice.isDemo && (
              <span className="inline-flex items-center text-[10px] font-semibold text-stone-300 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
                {restaurantConfig.demoNotice.badgeText}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white tracking-tight leading-tight">
            {restaurantConfig.restaurantName}
          </h2>

          <p className="text-xs sm:text-sm text-stone-200 font-light mt-1 max-w-xl line-clamp-2 leading-relaxed">
            {restaurantConfig.description[currentLang]}
          </p>
        </div>
      </div>

      {/* Accordion toggle for full restaurant story & cuisine philosophy */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 mt-2.5">
        <div className="bg-white border border-stone-200 rounded-xl p-2.5 sm:p-3 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-600 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Utensils className="w-3.5 h-3.5 text-[#C25E34] shrink-0" />
              <span className="font-semibold text-stone-800 truncate">
                {restaurantConfig.subtitle[currentLang]}
              </span>
              <span className="text-stone-400 hidden sm:inline">•</span>
              <span className="text-stone-500 hidden sm:inline truncate">
                {restaurantConfig.workingDays[currentLang]}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsBioExpanded(!isBioExpanded)}
              className="flex items-center gap-1 text-[#C25E34] hover:text-[#A1431E] font-semibold transition-colors cursor-pointer shrink-0 text-[11px] sm:text-xs"
            >
              <Info className="w-3 h-3" />
              <span>{isBioExpanded ? t.dishDetails.close : t.viewDetails}</span>
              {isBioExpanded ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>

          {isBioExpanded && (
            <div className="mt-2.5 pt-2.5 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed animate-fadeIn">
              <p className="mb-2 font-normal">
                {restaurantConfig.description[currentLang]}
              </p>
              <div className="flex items-start gap-1.5 text-[11px] text-stone-500 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#C25E34] shrink-0 mt-0.5" />
                <span>
                  {restaurantConfig.address} • {restaurantConfig.openingHours} ({restaurantConfig.workingDays[currentLang]})
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
