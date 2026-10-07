import React, { useState } from 'react';
import { Child, MetricSummary, TimelineItem, Language, MoodType } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Mic,
  FileEdit,
  QrCode,
  Phone,
  Moon,
  Utensils,
  Sparkles,
  Heart,
  CheckCircle2,
  Clock,
  UserCheck,
  Smile,
  ShieldCheck,
  SunMedium,
  Compass,
} from 'lucide-react';

interface TimelineTabProps {
  child: Child;
  metrics: MetricSummary;
  timelineItems: TimelineItem[];
  language: Language;
  onOpenVoiceModal: () => void;
  onOpenDropoffModal: () => void;
  onOpenPickupModal: () => void;
  onSelectPhotoMoment?: (imageUrl: string, title: string) => void;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({
  child,
  metrics,
  timelineItems,
  language,
  onOpenVoiceModal,
  onOpenDropoffModal,
  onOpenPickupModal,
  onSelectPhotoMoment,
}) => {
  const t = TRANSLATIONS[language];
  const [items, setItems] = useState<TimelineItem[]>(timelineItems);
  const [selectedMood, setSelectedMood] = useState<MoodType>(child.currentMood);
  const [copiedPhoneToast, setCopiedPhoneToast] = useState(false);

  // Sync if child changes
  React.useEffect(() => {
    setItems(timelineItems);
    setSelectedMood(child.currentMood);
  }, [child.id, timelineItems]);

  const handleToggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLiked = !item.hasLiked;
          return {
            ...item,
            hasLiked: nextLiked,
            likes: nextLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleCallNursery = () => {
    setCopiedPhoneToast(true);
    setTimeout(() => setCopiedPhoneToast(false), 2500);
  };

  const moodOptions: { type: MoodType; emoji: string; labelEn: string; labelAr: string }[] = [
    { type: 'happy', emoji: '☀️', labelEn: 'Happy', labelAr: 'سعيدة' },
    { type: 'playful', emoji: '🎈', labelEn: 'Playful', labelAr: 'مرحة' },
    { type: 'calm', emoji: '🌿', labelEn: 'Calm', labelAr: 'هادئة' },
    { type: 'curious', emoji: '🔍', labelEn: 'Curious', labelAr: 'مستكشفة' },
    { type: 'tired', emoji: '💤', labelEn: 'Restful', labelAr: 'نعسانة' },
  ];

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto px-4 pt-2">
      {/* 1. Reassuring Hero Status Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-md relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 end-0 -mt-6 -me-6 w-32 h-32 bg-[#00685F]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#00685F] ring-1 ring-[#00685F]/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00685F] uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#008378] animate-ping" />
                  {t.common.checkedIn}
                </span>
                <span className="text-xs text-[#6D7A77]">·</span>
                <span className="text-xs font-medium text-[#6D7A77]">{child.checkInTime}</span>
              </div>
              <h2 className="text-base font-bold text-[#131B2E]">
                {language === 'ar' ? child.roomAr : child.room}
              </h2>
              <p className="text-xs text-[#3D4947]">
                {t.common.teacher}: <span className="font-semibold text-[#131B2E]">{language === 'ar' ? child.teacherAr : child.teacher}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <div className="bg-[#FAF8FF] px-2.5 py-1.5 rounded-xl border border-[#E2E8F0] text-center">
              <span className="text-[10px] font-semibold text-[#6D7A77] block">{t.common.temp}</span>
              <span className="text-xs font-bold text-[#00685F] tabular-nums">{child.temperature}</span>
            </div>
            <div className="bg-[#FAF8FF] px-2.5 py-1.5 rounded-xl border border-[#E2E8F0] text-center">
              <span className="text-[10px] font-semibold text-[#6D7A77] block">{t.common.status}</span>
              <span className="text-xs font-bold text-[#0D9488]">{t.common.activeNow}</span>
            </div>
          </div>
        </div>

        {/* Quick Action Pills Grid (Tactile Touchpoints >= 44px hitbox) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-3 border-t border-[#E2E8F0]/70">
          <button
            onClick={onOpenVoiceModal}
            className="min-h-[44px] px-3 py-2 rounded-full bg-[#FAF8FF] hover:bg-[#E6F7F5] border border-[#E2E8F0] text-[#00685F] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-tactile-sm active:scale-95"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="truncate">{t.quickActions.voiceNote}</span>
          </button>

          <button
            onClick={onOpenDropoffModal}
            className="min-h-[44px] px-3 py-2 rounded-full bg-[#FAF8FF] hover:bg-[#FAF8FF]/80 border border-[#E2E8F0] text-[#131B2E] font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-tactile-sm active:scale-95"
          >
            <FileEdit className="w-3.5 h-3.5 text-[#855300]" />
            <span className="truncate">{t.quickActions.dropOffNote}</span>
          </button>

          <button
            onClick={onOpenPickupModal}
            className="min-h-[44px] px-3 py-2 rounded-full bg-[#FAF8FF] hover:bg-[#FAF8FF]/80 border border-[#E2E8F0] text-[#131B2E] font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-tactile-sm active:scale-95"
          >
            <QrCode className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span className="truncate">{t.quickActions.pickupPass}</span>
          </button>

          <button
            onClick={handleCallNursery}
            className="min-h-[44px] px-3 py-2 rounded-full bg-[#FAF8FF] hover:bg-[#FAF8FF]/80 border border-[#E2E8F0] text-[#131B2E] font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-tactile-sm active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-[#F43F5E]" />
            <span className="truncate">{t.quickActions.callNursery}</span>
          </button>
        </div>

        {copiedPhoneToast && (
          <div className="mt-2 text-center text-xs font-semibold text-[#00685F] bg-[#E6F7F5] py-1.5 rounded-lg animate-in fade-in">
            {language === 'ar' ? 'جارٍ الاتصال بغرفة الرعاية: +965 2200 4455' : 'Connecting Nursery Line: +965 2200 4455'}
          </div>
        )}
      </div>

      {/* 2. Metric Highlight Cards (Tactile 2-column Grid) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Nap Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#E2E8F0] shadow-tactile-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#6D7A77] flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-[#0EA5E9]" />
              {t.metrics.sleepNap}
            </span>
            <span className="text-[10px] text-[#6D7A77] font-medium">{metrics.napTarget}</span>
          </div>
          <div className="my-1">
            <span className="text-2xl font-extrabold text-[#131B2E] tabular-nums tracking-tight">
              {metrics.napHours}
            </span>
          </div>
          <div className="w-full bg-[#F2F3FF] h-1.5 rounded-full overflow-hidden mb-1">
            <div className="bg-[#0EA5E9] h-full rounded-full w-[85%]" />
          </div>
          <span className="text-[11px] text-[#3D4947] truncate">
            {language === 'ar' ? metrics.napStatusAr : metrics.napStatus}
          </span>
        </div>

        {/* Meal Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#E2E8F0] shadow-tactile-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#6D7A77] flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-[#F59E0B]" />
              {t.metrics.mealsNutrition}
            </span>
            <span className="text-[10px] text-[#F59E0B] font-bold">{metrics.mealPercent}% {t.metrics.eaten}</span>
          </div>
          <div className="my-1">
            <span className="text-2xl font-extrabold text-[#131B2E] tabular-nums tracking-tight">
              {metrics.hydrationMl}
              <span className="text-xs font-normal text-[#6D7A77] ms-1">ml</span>
            </span>
          </div>
          <div className="w-full bg-[#F2F3FF] h-1.5 rounded-full overflow-hidden mb-1">
            <div className="bg-[#F59E0B] h-full rounded-full w-[92%]" />
          </div>
          <span className="text-[11px] text-[#3D4947] truncate">
            {language === 'ar' ? metrics.mealDetailAr : metrics.mealDetail}
          </span>
        </div>
      </div>

      {/* 3. Interactive Mood Selector */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-xs font-bold text-[#131B2E]">{t.metrics.moodVibe}</span>
          </div>
          <span className="text-xs font-semibold text-[#00685F]">
            {language === 'ar' ? metrics.moodLabelAr : metrics.moodLabel}
          </span>
        </div>

        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar pt-1">
          {moodOptions.map((m) => {
            const isSelected = selectedMood === m.type;
            return (
              <button
                key={m.type}
                onClick={() => setSelectedMood(m.type)}
                className={`flex-1 min-h-[44px] py-1.5 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#6B38D4] shadow-sm'
                    : 'bg-[#FAF8FF] border-[#E2E8F0] text-[#6D7A77] hover:border-slate-300'
                }`}
              >
                <span className="text-lg leading-none">{m.emoji}</span>
                <span className="text-[10px] font-semibold mt-1 whitespace-nowrap">
                  {language === 'ar' ? m.labelAr : m.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Timeline Chronology Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00685F]" />
            <h3 className="text-sm font-bold text-[#131B2E] tracking-tight">
              {language === 'ar' ? 'الجدول الزمني والأنشطة اليومية' : 'Daily Chronology & Activity Feed'}
            </h3>
          </div>
          <span className="text-xs text-[#6D7A77] font-medium">
            {t.common.today}
          </span>
        </div>

        {/* Timeline Items */}
        <div className="relative space-y-3 before:absolute before:top-4 before:bottom-4 before:start-4 before:w-0.5 before:bg-[#E2E8F0] before:-z-0">
          {items.map((item) => {
            const colorBorderMap = {
              emerald: 'border-s-[#0D9488]',
              amber: 'border-s-[#F59E0B]',
              lavender: 'border-s-[#8B5CF6]',
              sky: 'border-s-[#0EA5E9]',
              rose: 'border-s-[#F43F5E]',
            };

            const colorBadgeMap = {
              emerald: 'bg-[#0D9488]/10 text-[#00685F]',
              amber: 'bg-[#F59E0B]/10 text-[#855300]',
              lavender: 'bg-[#8B5CF6]/10 text-[#6B38D4]',
              sky: 'bg-[#0EA5E9]/10 text-[#0284C7]',
              rose: 'bg-[#F43F5E]/10 text-[#E11D48]',
            };

            return (
              <div
                key={item.id}
                className={`relative z-10 bg-white rounded-2xl p-4 border border-[#E2E8F0] border-s-4 ${colorBorderMap[item.colorCue]} shadow-tactile-sm transition-all hover:shadow-tactile-md`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#131B2E] tabular-nums">
                      {item.time}
                    </span>
                    <span className="text-xs text-[#6D7A77]">·</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${colorBadgeMap[item.colorCue]}`}>
                      {item.educator}
                    </span>
                  </div>

                  {/* Heart / Send Gratitude Button */}
                  <button
                    onClick={() => handleToggleLike(item.id)}
                    className={`flex items-center gap-1 min-h-[36px] px-2 py-1 rounded-full text-xs transition-colors ${
                      item.hasLiked
                        ? 'bg-[#F43F5E]/10 text-[#F43F5E] font-semibold'
                        : 'text-[#6D7A77] hover:bg-slate-100'
                    }`}
                    title={t.common.heartNote}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${item.hasLiked ? 'fill-[#F43F5E]' : ''}`}
                    />
                    <span className="tabular-nums text-[11px]">{item.likes}</span>
                  </button>
                </div>

                <h4 className="text-sm font-bold text-[#131B2E] mb-1">
                  {language === 'ar' ? item.titleAr : item.title}
                </h4>

                <p className="text-xs text-[#3D4947] leading-relaxed mb-2.5">
                  {language === 'ar' ? item.descriptionAr : item.description}
                </p>

                {/* Optional Media Attachment */}
                {item.imageUrl && (
                  <div
                    onClick={() => onSelectPhotoMoment && onSelectPhotoMoment(item.imageUrl!, language === 'ar' ? item.titleAr : item.title)}
                    className="relative rounded-xl overflow-hidden mb-2 cursor-pointer group aspect-[16/10] bg-slate-100 ring-1 ring-black/5"
                  >
                    <img
                      src={item.imageUrl}
                      alt={language === 'ar' ? item.titleAr : item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-white text-[11px] font-medium flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        {language === 'ar' ? 'اضغط للتكبير والمشاركة' : 'Tap to expand photo'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
