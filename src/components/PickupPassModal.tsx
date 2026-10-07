import React, { useState, useEffect } from 'react';
import { Child, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { QrCode, ShieldCheck, RefreshCw, CheckCircle2, UserCheck } from 'lucide-react';

interface PickupPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child;
  language: Language;
}

export const PickupPassModal: React.FC<PickupPassModalProps> = ({
  isOpen,
  onClose,
  child,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedGuardian, setSelectedGuardian] = useState<'mom' | 'dad' | 'grandma'>('mom');
  const [securityCode, setSecurityCode] = useState('4921');
  const [seconds, setSeconds] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setSecurityCode(Math.floor(1000 + Math.random() * 9000).toString());
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-[#E2E8F0] shadow-tactile-lg space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E6F7F5] flex items-center justify-center text-[#00685F]">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131B2E]">
                {t.transit.pickupCodeTitle}
              </h3>
              <p className="text-[11px] text-[#00685F] font-semibold">
                {language === 'ar' ? child.nameAr : child.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8FF] border border-[#E2E8F0] flex items-center justify-center text-[#6D7A77] hover:text-[#131B2E] text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Guardian Segmented Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF8FF] rounded-2xl border border-[#E2E8F0]">
          <button
            onClick={() => setSelectedGuardian('mom')}
            className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all ${
              selectedGuardian === 'mom'
                ? 'bg-white text-[#00685F] shadow-sm'
                : 'text-[#6D7A77]'
            }`}
          >
            {t.transit.mom}
          </button>
          <button
            onClick={() => setSelectedGuardian('dad')}
            className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all ${
              selectedGuardian === 'dad'
                ? 'bg-white text-[#00685F] shadow-sm'
                : 'text-[#6D7A77]'
            }`}
          >
            {t.transit.dad}
          </button>
          <button
            onClick={() => setSelectedGuardian('grandma')}
            className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all ${
              selectedGuardian === 'grandma'
                ? 'bg-white text-[#00685F] shadow-sm'
                : 'text-[#6D7A77]'
            }`}
          >
            {t.transit.grandma}
          </button>
        </div>

        {/* QR Display */}
        <div className="bg-[#FAF8FF] rounded-2xl p-4 border border-[#E2E8F0] flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#E2E8F0] relative">
            <div className="w-40 h-40 relative flex items-center justify-center">
              <div className="grid grid-cols-6 gap-1.5 w-full h-full p-1.5">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isCorner =
                    i === 0 || i === 1 || i === 6 || i === 7 ||
                    i === 4 || i === 5 || i === 10 || i === 11 ||
                    i === 24 || i === 25 || i === 30 || i === 31;
                  const isFilled = isCorner || (i * 5 + 2) % 3 === 0;

                  return (
                    <div
                      key={i}
                      className={`rounded-sm transition-colors duration-500 ${
                        isFilled ? 'bg-[#00685F]' : 'bg-transparent'
                      }`}
                    />
                  );
                })}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ring-2 ring-[#00685F]">
                  <ShieldCheck className="w-6 h-6 text-[#00685F]" />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <span className="text-[10px] font-bold text-[#6D7A77] uppercase tracking-wider block">
              {language === 'ar' ? 'رمز المصادقة السريع' : 'Quick Auth Token'}
            </span>
            <span className="text-3xl font-black text-[#131B2E] tracking-widest tabular-nums">
              #{securityCode}
            </span>
          </div>

          <div className="mt-2 text-xs text-[#00685F] font-semibold bg-[#E6F7F5] px-3 py-1 rounded-full flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>
              {t.common.authorized}:{' '}
              {selectedGuardian === 'mom'
                ? t.transit.mom
                : selectedGuardian === 'dad'
                ? t.transit.dad
                : t.transit.grandma}
            </span>
          </div>

          <div className="mt-2 text-[10px] text-[#6D7A77] flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-[#00685F] animate-spin" />
            <span>
              {language === 'ar' ? `يتجدد خلال ${seconds} ثانية` : `Refreshes in ${seconds}s`}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full min-h-[44px] rounded-full bg-[#00685F] hover:bg-[#008378] text-white text-xs font-bold transition-all shadow-md active:scale-95"
        >
          {t.common.close}
        </button>
      </div>
    </div>
  );
};
