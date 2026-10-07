import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Download, Heart, Check, X, Sparkles } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  title: string | null;
  language: Language;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !imageUrl) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative max-w-2xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-3.5 bg-black/40 border-b border-white/10 z-10">
          <span className="text-white text-xs font-semibold truncate max-w-[80%]">
            {title || (language === 'ar' ? 'صورة النشاط الصفي' : 'Classroom Moment')}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={title || 'Classroom moment'}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Footer actions */}
        <div className="p-3.5 bg-black/50 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-white/70">
            {language === 'ar' ? 'تصوير عالي الدقة موثق من معلمة الصف' : 'High resolution photo saved by educator'}
          </span>

          <button
            onClick={handleDownload}
            className="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#00685F] hover:bg-[#008378] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>{language === 'ar' ? 'تم الحفظ في الألبوم!' : 'Saved to Memories!'}</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{t.moments.downloadMemory}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
