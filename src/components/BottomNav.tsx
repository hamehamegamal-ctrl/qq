import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CalendarClock, Bus, ShieldAlert, Sparkles, Image as ImageIcon } from 'lucide-react';

export type ActiveTab = 'timeline' | 'transit' | 'health' | 'insights' | 'moments';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'timeline', label: t.tabs.timeline, icon: CalendarClock },
    { id: 'transit', label: t.tabs.transit, icon: Bus, badge: '8m' },
    { id: 'health', label: t.tabs.health, icon: ShieldAlert },
    { id: 'insights', label: t.tabs.insights, icon: Sparkles },
    { id: 'moments', label: t.tabs.moments, icon: ImageIcon },
  ];

  return (
    <nav className="fixed bottom-3 inset-x-0 z-40 max-w-md mx-auto px-3 pointer-events-auto">
      <div className="bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-full p-1.5 shadow-tactile-dock flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-full transition-all duration-200 group ${
                isActive
                  ? 'text-[#00685F] font-semibold'
                  : 'text-[#6D7A77] hover:text-[#131B2E]'
              }`}
            >
              {/* Active Background Capsule Glow */}
              {isActive && (
                <span className="absolute inset-0 bg-[#00685F]/10 rounded-full -z-10 animate-in fade-in zoom-in-95 duration-150" />
              )}

              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#00685F]' : 'group-hover:scale-105'
                  }`}
                  strokeWidth={isActive ? 2.3 : 1.9}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -end-2.5 px-1 py-0.2 bg-[#0EA5E9] text-white text-[9px] font-bold rounded-full leading-tight shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap leading-none">
                {item.label}
              </span>

              {/* Micro dot indicator */}
              {isActive && (
                <span className="w-1 h-1 bg-[#00685F] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
