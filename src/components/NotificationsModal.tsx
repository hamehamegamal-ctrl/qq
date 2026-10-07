import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Bell, CheckCircle2, Clock, Bus, Utensils, Heart } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      icon: Bus,
      iconColor: 'text-[#0EA5E9] bg-sky-50',
      titleEn: 'Bus 04 Departed School Campus',
      titleAr: 'انطلقت الحافلة ٠٤ من بوابة الروضة',
      timeEn: '12 mins ago',
      timeAr: 'منذ ١٢ دقيقة',
      descEn: 'On route with Captain Tariq and Nurse Salma. Estimated home arrival: 8 mins.',
      descAr: 'في طريقها بإشراف الكابتن طارق والمشرفة سلمى. الوصول المتوقع: ٨ دقائق.',
    },
    {
      id: 'notif-2',
      icon: Utensils,
      iconColor: 'text-[#F59E0B] bg-amber-50',
      titleEn: 'Lunch Finished (92%)',
      titleAr: 'اكتمال وجبة الغداء (٩٢٪)',
      timeEn: '2 hours ago',
      timeAr: 'منذ ساعتين',
      descEn: 'Layla happily finished her lentil soup and steamed veggies with great appetite.',
      descAr: 'أنهت ليلى شوربة العدس والخضار بشهية رائعة وسعادة.',
    },
    {
      id: 'notif-3',
      icon: Heart,
      iconColor: 'text-[#F43F5E] bg-rose-50',
      titleEn: 'Afternoon Temperature Checked',
      titleAr: 'فحص الحرارة بعد القيلولة',
      timeEn: '3 hours ago',
      timeAr: 'منذ ٣ ساعات',
      descEn: 'Routine temperature reading: 36.8°C (Optimal & energetic).',
      descAr: 'القياس الدوري للحرارة: ٣٦.٨ مئوية (طبيعي ومستقر تماماً).',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 border border-[#E2E8F0] shadow-tactile-lg space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E6F7F5] flex items-center justify-center text-[#00685F]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131B2E]">
                {language === 'ar' ? 'التنبيهات والإشعارات الفورية' : 'Live Nursery Notifications'}
              </h3>
              <p className="text-[11px] text-[#6D7A77]">
                {language === 'ar' ? 'تحديثات مباشرة وموثقة اليوم' : 'Real-time daily classroom alerts'}
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

        {/* Notifications List */}
        <div className="space-y-2.5 max-h-[360px] overflow-y-auto no-scrollbar">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="p-3 rounded-2xl bg-[#FAF8FF] border border-[#E2E8F0] flex items-start gap-3 hover:bg-white transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-[#131B2E] truncate">
                      {language === 'ar' ? n.titleAr : n.titleEn}
                    </h4>
                    <span className="text-[10px] text-[#6D7A77] shrink-0">
                      {language === 'ar' ? n.timeAr : n.timeEn}
                    </span>
                  </div>
                  <p className="text-xs text-[#3D4947] leading-relaxed">
                    {language === 'ar' ? n.descAr : n.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full min-h-[44px] rounded-full bg-[#00685F] text-white text-xs font-bold hover:bg-[#008378] transition-all shadow-md active:scale-95"
        >
          {t.common.close}
        </button>
      </div>
    </div>
  );
};
