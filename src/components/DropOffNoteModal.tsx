import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { FileEdit, CheckCircle2, Send } from 'lucide-react';

interface DropOffNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DropOffNoteModal: React.FC<DropOffNoteModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [noteText, setNoteText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSelectQuickPick = (pick: string) => {
    setNoteText((prev) => (prev ? `${prev}. ${pick}` : pick));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setNoteText('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 border border-[#E2E8F0] shadow-tactile-lg space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#855300]">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131B2E]">
                {t.dropoffModal.title}
              </h3>
              <p className="text-[11px] text-[#6D7A77]">
                {t.dropoffModal.subtitle}
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

        {isSuccess ? (
          <div className="py-8 text-center space-y-2 animate-in zoom-in-95">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-[#131B2E]">
              {t.dropoffModal.success}
            </h4>
            <p className="text-xs text-[#6D7A77]">
              {language === 'ar'
                ? 'ستظهر الملاحظة في ملف الطفل الصباحي للمعلمة'
                : 'Note pinned to classroom morning clipboard'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-[#6D7A77] block mb-1">
                {language === 'ar' ? 'خيارات سريعة بنقرة واحدة:' : 'Quick tap phrases:'}
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {t.dropoffModal.quickPicks.map((pick, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectQuickPick(pick)}
                    className="text-[11px] bg-[#FAF8FF] hover:bg-[#E6F7F5] hover:text-[#00685F] text-[#3D4947] border border-[#E2E8F0] px-2.5 py-1 rounded-full transition-all text-start"
                  >
                    + {pick}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                rows={3}
                required
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={t.dropoffModal.notePlaceholder}
                className="w-full p-3 rounded-2xl bg-[#FAF8FF] border border-[#E2E8F0] text-xs text-[#131B2E] focus:outline-none focus:border-[#00685F]"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-h-[44px] rounded-full border border-[#E2E8F0] text-xs font-semibold text-[#6D7A77] hover:bg-slate-50"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 min-h-[44px] rounded-full bg-[#00685F] hover:bg-[#008378] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t.dropoffModal.submitBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
