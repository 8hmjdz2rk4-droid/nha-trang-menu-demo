import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { restaurantConfig } from '../restaurantConfig';
import { translations } from '../translations';

interface WaiterCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  tableNumber: string;
  onUpdateTableNumber: (newTable: string) => void;
}

export const WaiterCallModal: React.FC<WaiterCallModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  tableNumber,
  onUpdateTableNumber,
}) => {
  const [editingTable, setEditingTable] = useState(false);
  const [tempTable, setTempTable] = useState(tableNumber);
  const t = translations[currentLang];

  if (!isOpen) return null;

  const handleSaveTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempTable.trim()) {
      onUpdateTableNumber(tempTable.trim());
      setEditingTable(false);
    }
  };

  // Prepare WhatsApp pre-filled request (clearly marked as demo request)
  const whatsappMessage = encodeURIComponent(
    `[DEMO REQUEST] Hello ${restaurantConfig.restaurantName} team! Tourist at ${tableNumber} is requesting waiter assistance. (Fictional demo - Nha Trang Menu)`
  );
  const whatsappUrl = restaurantConfig.whatsapp
    ? `https://wa.me/${restaurantConfig.whatsapp.replace('+', '')}?text=${whatsappMessage}`
    : null;

  const zaloUrl = restaurantConfig.zaloId
    ? `https://zalo.me/${restaurantConfig.zaloId}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label={t.dishDetails.close}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-stone-300 font-semibold">
              {restaurantConfig.restaurantName}
            </span>
          </div>

          <h3 className="text-xl font-bold font-display">{t.waiterCall.title}</h3>
          <p className="text-xs text-stone-300 mt-1">{t.waiterCall.subtitle}</p>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Table Number Selector & Confirmation */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">
                  {t.waiterCall.tablePrompt}
                </span>
                <span className="text-lg font-bold text-stone-900">
                  {tableNumber}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setEditingTable(!editingTable)}
                className="text-xs font-semibold text-[#C25E34] hover:underline cursor-pointer"
              >
                {editingTable ? t.dishDetails.close : t.waiterCall.changeTable}
              </button>
            </div>

            {editingTable && (
              <form onSubmit={handleSaveTable} className="mt-3 flex gap-2 pt-2 border-t border-stone-200">
                <input
                  type="text"
                  value={tempTable}
                  onChange={(e) => setTempTable(e.target.value)}
                  placeholder="e.g. Table 7"
                  className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#C25E34]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#C25E34] text-white text-xs font-semibold rounded-lg hover:bg-[#A1431E] transition-colors cursor-pointer"
                >
                  {t.waiterCall.saveTable}
                </button>
              </form>
            )}
          </div>

          {/* Real Contact Channels */}
          <div className="space-y-2.5">
            {/* Direct Phone Call to Restaurant Desk */}
            <a
              href={`tel:${restaurantConfig.phone}`}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FDF6F0] border border-[#F2DACD] hover:bg-[#F9ECE3] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C25E34] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900 group-hover:text-[#C25E34] transition-colors">
                    {t.waiterCall.directCall}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    {restaurantConfig.phoneDisplay}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#C25E34] uppercase tracking-wider">
                Call
              </span>
            </a>

            {/* WhatsApp table request */}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 hover:bg-emerald-50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {t.waiterCall.whatsappCall}
                    </div>
                    <div className="text-xs text-stone-500">
                      {t.waiterCall.whatsappCallDesc}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Open
                </span>
              </a>
            )}

            {/* Zalo Contact (popular in Vietnam) */}
            {zaloUrl && (
              <a
                href={zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 hover:bg-blue-50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900 group-hover:text-blue-700 transition-colors">
                      {t.waiterCall.zaloCall}
                    </div>
                    <div className="text-xs text-stone-500">
                      {t.waiterCall.zaloCallDesc}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Zalo
                </span>
              </a>
            )}
          </div>

          {/* Genuine staff notice */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 flex items-start gap-2 text-xs text-stone-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              {t.waiterCall.staffNotice}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {t.dishDetails.close}
          </button>
        </div>
      </div>
    </div>
  );
};
