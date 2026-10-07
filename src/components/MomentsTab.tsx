import React, { useState } from 'react';
import { MomentItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Image as ImageIcon,
  Heart,
  Share2,
  Download,
  MessageCircleHeart,
  Sparkles,
  Check,
} from 'lucide-react';

interface MomentsTabProps {
  moments: MomentItem[];
  language: Language;
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const MomentsTab: React.FC<MomentsTabProps> = ({
  moments,
  language,
  onOpenLightbox,
}) => {
  const t = TRANSLATIONS[language];
  const [activeFilter, setActiveFilter] = useState<'all' | 'sensory' | 'language'>('all');
  const [likesMap, setLikesMap] = useState<Record<string, { count: number; liked: boolean }>>({
    'mom-1': { count: 12, liked: true },
    'mom-2': { count: 18, liked: false },
  });
  const [appreciationSent, setAppreciationSent] = useState<Record<string, boolean>>({});

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      const nextLiked = !current.liked;
      return {
        ...prev,
        [id]: {
          count: nextLiked ? current.count + 1 : current.count - 1,
          liked: nextLiked,
        },
      };
    });
  };

  const handleSendAppreciation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAppreciationSent((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAppreciationSent((prev) => ({ ...prev, [id]: false }));
    }, 3000);
  };

  const filterButtons: { id: 'all' | 'sensory' | 'language'; label: string }[] = [
    { id: 'all', label: t.moments.all },
    { id: 'sensory', label: t.moments.sensory },
    { id: 'language', label: t.moments.language },
  ];

  const filteredMoments = moments.filter((m) => {
    if (activeFilter === 'sensory') return m.id === 'mom-1';
    if (activeFilter === 'language') return m.id === 'mom-2';
    return true;
  });

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto px-4 pt-2">
      {/* 1. Header & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#00685F]">
            <ImageIcon className="w-4 h-4" />
            <span>{t.moments.title}</span>
          </div>
          <span className="text-[11px] font-semibold text-[#6D7A77]">
            {filteredMoments.length} {language === 'ar' ? 'صور موثقة' : 'Captured Moments'}
          </span>
        </div>
        <p className="text-xs text-[#3D4947] mb-3">
          {t.moments.subtitle}
        </p>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === btn.id
                  ? 'bg-[#00685F] text-white shadow-sm'
                  : 'bg-[#FAF8FF] border border-[#E2E8F0] text-[#6D7A77] hover:border-[#00685F]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Photo Gallery Grid */}
      <div className="space-y-4">
        {filteredMoments.map((moment) => {
          const currentLike = likesMap[moment.id] || {
            count: moment.likes,
            liked: false,
          };
          const sent = appreciationSent[moment.id];

          return (
            <div
              key={moment.id}
              onClick={() => onOpenLightbox(moment.imageUrl, language === 'ar' ? moment.titleAr : moment.title)}
              className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-tactile-sm hover:shadow-tactile-md transition-all cursor-pointer group"
            >
              {/* Image Preview with Scrim */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={moment.imageUrl}
                  alt={language === 'ar' ? moment.titleAr : moment.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />

                <div className="absolute top-3 end-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
                    {moment.timestamp}
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                  <span className="text-[11px] font-semibold text-amber-300 block mb-0.5">
                    {language === 'ar' ? moment.activityTagAr : moment.activityTag}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {language === 'ar' ? moment.titleAr : moment.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-3.5 space-y-2.5">
                <p className="text-xs text-[#3D4947] leading-relaxed">
                  {language === 'ar' ? moment.captionAr : moment.caption}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]/70">
                  <span className="text-[11px] text-[#6D7A77]">
                    {t.common.teacher}: <strong className="text-[#131B2E]">{moment.educator}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Send appreciation button */}
                    <button
                      onClick={(e) => handleSendAppreciation(moment.id, e)}
                      className={`min-h-[36px] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                        sent
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#FAF8FF] border border-[#E2E8F0] text-[#00685F] hover:bg-[#E6F7F5]'
                      }`}
                      title={t.moments.leaveGratitude}
                    >
                      {sent ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{language === 'ar' ? 'أُرسل الشكر!' : 'Sent Gratitude!'}</span>
                        </>
                      ) : (
                        <>
                          <MessageCircleHeart className="w-3.5 h-3.5 text-[#F43F5E]" />
                          <span>{language === 'ar' ? 'شكر المعلمة' : 'Thank Educator'}</span>
                        </>
                      )}
                    </button>

                    {/* Heart button */}
                    <button
                      onClick={(e) => handleToggleLike(moment.id, e)}
                      className={`min-h-[36px] min-w-[36px] px-2 rounded-full flex items-center justify-center gap-1 transition-all ${
                        currentLike.liked
                          ? 'bg-rose-50 text-rose-600 font-bold'
                          : 'bg-[#FAF8FF] border border-[#E2E8F0] text-[#6D7A77] hover:bg-slate-100'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${currentLike.liked ? 'fill-rose-500' : ''}`}
                      />
                      <span className="text-xs tabular-nums">{currentLike.count}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
