import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Copy,
  Check,
  QrCode,
  Download,
  Printer,
} from 'lucide-react';
import { Language } from '../types';
import { restaurantConfig } from '../restaurantConfig';
import { translations } from '../translations';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  currentTable: string;
  onSelectTable: (tbl: string) => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  currentTable,
  onSelectTable,
}) => {
  const [selectedTable, setSelectedTable] = useState(currentTable || 'Table 1');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const t = translations[currentLang];

  // Base URL calculation (safe in browser)
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const targetUrl = `${origin}${pathname}?table=${encodeURIComponent(
    selectedTable
  )}&lang=${currentLang}`;

  // Generate QR code when table or URL changes
  useEffect(() => {
    if (!isOpen) return;
    QRCode.toDataURL(
      targetUrl,
      {
        width: 320,
        margin: 2,
        color: {
          dark: '#1C1917', // Stone 900
          light: '#FFFFFF',
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [isOpen, targetUrl, selectedTable, currentLang]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleTableChange = (table: string) => {
    setSelectedTable(table);
    onSelectTable(table);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = `nha-trang-menu-${selectedTable.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-stone-200"
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

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E68864] mb-1">
            <QrCode className="w-4 h-4" />
            <span>NHA TRANG TABLE TENT GENERATOR</span>
          </div>

          <h3 className="text-xl font-bold font-display">{t.qrGenerator.title}</h3>
          <p className="text-xs text-stone-300 mt-1">{t.qrGenerator.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Table Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              {t.qrGenerator.selectHint}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['Table 1', 'Table 2', 'Table 3', 'Table 5', 'Table 8', 'Table 10', 'Table 12', 'VIP 1'].map(
                (tbl) => (
                  <button
                    key={tbl}
                    type="button"
                    onClick={() => handleTableChange(tbl)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedTable === tbl
                        ? 'bg-[#C25E34] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {tbl}
                  </button>
                )
              )}
            </div>
          </div>

          {/* QR Card Graphic for Acrylic Tent Preview */}
          <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
            {/* Top brand */}
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#C25E34] mb-1">
              {restaurantConfig.restaurantName}
            </div>
            <div className="text-sm font-bold text-stone-900 mb-3">
              {restaurantConfig.subtitle[currentLang]}
            </div>

            {/* QR Code image */}
            <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-200">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR code for ${selectedTable}`}
                  className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-stone-400 text-xs">
                  Generating QR...
                </div>
              )}
            </div>

            {/* Table Number Badge */}
            <div className="mt-3 px-4 py-1 bg-stone-900 text-white rounded-full text-xs font-bold tracking-wide">
              {selectedTable}
            </div>

            <p className="text-[11px] text-stone-500 mt-2 max-w-xs">
              {t.qrGenerator.printHint}
            </p>
          </div>

          {/* Target URL with Copy Button */}
          <div className="bg-stone-100 rounded-xl p-2.5 flex items-center justify-between gap-2 border border-stone-200">
            <span className="text-xs text-stone-600 truncate font-mono select-all">
              {targetUrl}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-800 hover:bg-stone-50 flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t.qrGenerator.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-600" />
                  <span>{t.qrGenerator.copyLink}</span>
                </>
              )}
            </button>
          </div>

          {/* Action buttons: Download & Print */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#C25E34] text-white rounded-xl text-xs font-semibold hover:bg-[#A1431E] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tent Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
