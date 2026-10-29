import React from 'react';
import { PhoneCall, QrCode } from 'lucide-react';
import { Language } from '../types';
import { restaurantConfig } from '../restaurantConfig';
import { translations } from '../translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  tableNumber: string;
  onOpenWaiterModal: () => void;
  onOpenQrModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  tableNumber,
  onOpenWaiterModal,
  onOpenQrModal,
}) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Left: Brand Identity + Subtle DEMO MENU badge */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C25E34] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs border border-[#A1431E] shrink-0 tracking-wider">
            {restaurantConfig.logo.text}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-stone-900 leading-tight truncate">
                {restaurantConfig.restaurantName}
              </h1>
              {restaurantConfig.demoNotice.isDemo && (
                <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-stone-100 text-stone-500 border border-stone-300/80 shrink-0">
                  {restaurantConfig.demoNotice.badgeText}
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-[#C25E34] font-medium tracking-wide uppercase truncate">
              {restaurantConfig.subtitle[currentLang]}
            </p>
          </div>
        </div>

        {/* Right: Table Number & Language Switcher (Desktop also gets Call Waiter) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Table Number Badge (Interactive: click to open QR or change table) */}
          <button
            type="button"
            onClick={onOpenQrModal}
            className="flex items-center gap-1 bg-stone-900 text-white hover:bg-stone-800 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border border-stone-800 shadow-2xs"
            title="Click to view QR code or change table"
            aria-label={`Table ${tableNumber}, tap to view QR code`}
          >
            <QrCode className="w-3 h-3 text-[#E68864]" />
            <span className="font-bold text-[#FF8D66] text-[11px] sm:text-xs">
              {tableNumber}
            </span>
          </button>

          {/* Language Switcher (Touch-friendly 390px iPhone layout) */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200" role="group" aria-label="Language selection">
            {(['en', 'ru', 'vi'] as Language[]).map((lang) => {
              const isActive = currentLang === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`min-w-[28px] sm:min-w-[32px] py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all text-center cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Switch language to ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Desktop-only top Waiter Call button (Mobile uses fixed bottom bar) */}
          <button
            type="button"
            onClick={onOpenWaiterModal}
            className="hidden md:flex items-center gap-1.5 bg-[#C25E34] hover:bg-[#A1431E] active:scale-95 text-white px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm shadow-sm transition-all duration-150 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.waiterCall.buttonLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
