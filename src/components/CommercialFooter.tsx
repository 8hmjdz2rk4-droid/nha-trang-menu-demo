import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Wifi,
  ShieldAlert,
  ArrowUp,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { restaurantConfig } from '../restaurantConfig';
import { translations } from '../translations';

interface CommercialFooterProps {
  currentLang: Language;
  onOpenQrModal: () => void;
  onOpenWaiterModal: () => void;
}

export const CommercialFooter: React.FC<CommercialFooterProps> = ({
  currentLang,
  onOpenQrModal,
  onOpenWaiterModal,
}) => {
  const t = translations[currentLang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 mt-12 border-t border-stone-800 pb-20 sm:pb-8">
      {/* Demo Disclaimer Bar */}
      <div className="bg-[#8F3512]/60 border-b border-[#A1431E]/40 px-3 sm:px-4 py-2.5 text-stone-200">
        <div className="max-w-4xl mx-auto flex items-start sm:items-center gap-2 text-xs">
          <ShieldAlert className="w-4 h-4 text-[#FF8D66] shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1 min-w-0">
            <span className="font-bold text-white mr-1.5">{restaurantConfig.demoNotice.badgeText}:</span>
            <span className="text-[11px] sm:text-xs text-stone-200">{t.demoBanner.text}</span>
          </div>
          <button
            type="button"
            onClick={onOpenQrModal}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-[#C25E34] hover:bg-[#A1431E] text-white px-2.5 py-1 rounded-md shrink-0 transition-colors cursor-pointer"
          >
            <QrCode className="w-3 h-3" />
            {t.qrGenerator.buttonLabel}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-7 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Column 1: Brand & Concept */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C25E34] text-white flex items-center justify-center font-bold text-xs">
                {restaurantConfig.logo.text}
              </div>
              <span className="text-base sm:text-lg font-bold text-white font-display">
                {restaurantConfig.restaurantName}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {restaurantConfig.subtitle[currentLang]}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              {restaurantConfig.taxNote[currentLang]}
            </p>
          </div>

          {/* Column 2: Location & Hours in Nha Trang */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-[#E68864]">
              {restaurantConfig.city}
            </h4>
            <div className="flex items-start gap-2 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-[#C25E34] shrink-0 mt-0.5" />
              <span>{restaurantConfig.address}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-[#C25E34] shrink-0" />
              <span>
                {restaurantConfig.openingHours} ({restaurantConfig.workingDays[currentLang]})
              </span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <Phone className="w-3.5 h-3.5 text-[#C25E34] shrink-0" />
              <a
                href={`tel:${restaurantConfig.phone}`}
                className="hover:text-white transition-colors underline decoration-stone-700"
              >
                {restaurantConfig.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Column 3: Guest Amenities (Direct from restaurantConfig) */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-[#E68864]">
              {t.restaurantInfo.contactStaff}
            </h4>
            <div className="bg-stone-800/80 rounded-xl p-3 border border-stone-700 space-y-1">
              <div className="flex items-center gap-2 text-stone-300">
                <Wifi className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-[11px]">
                  Wi-Fi: <strong className="text-white">{restaurantConfig.wifi.name}</strong>
                </span>
              </div>
              <div className="text-[10px] text-stone-400 font-mono pl-5.5">
                Pass: <strong className="text-stone-300">{restaurantConfig.wifi.password}</strong>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onOpenWaiterModal}
                className="flex-1 py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold text-center transition-colors cursor-pointer border border-stone-700"
              >
                {t.waiterCall.buttonLabel}
              </button>
              <button
                type="button"
                onClick={onOpenQrModal}
                className="py-2 px-3 bg-[#C25E34] hover:bg-[#A1431E] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                title="Table QR Codes"
                aria-label="Table QR Codes"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-5 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#C25E34]" />
            <span>
              {restaurantConfig.restaurantName} • {restaurantConfig.subtitle[currentLang]} • Nha Trang, Vietnam
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
