import React from 'react';
import { Child, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Bell, Smartphone, Monitor, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentChild: Child;
  availableChildren: Child[];
  onSelectChild: (id: 'layla' | 'zayn') => void;
  language: Language;
  onToggleLanguage: () => void;
  isMobileFrame: boolean;
  onToggleDeviceFrame: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChild,
  availableChildren,
  onSelectChild,
  language,
  onToggleLanguage,
  isMobileFrame,
  onToggleDeviceFrame,
  onOpenNotifications,
}) => {
  const t = TRANSLATIONS[language];
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8FF]/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-3 transition-colors">
      <div className="flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Child Selector & Brand */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 -m-1 rounded-full hover:bg-[#EAEDFF] transition-all text-left group"
            aria-label="Switch child"
          >
            <div className="relative">
              <img
                src={currentChild.avatarUrl}
                alt={language === 'ar' ? currentChild.nameAr : currentChild.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#00685F] shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#0D9488] border-2 border-white rounded-full" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#131B2E] tracking-tight group-hover:text-[#00685F] transition-colors">
                  {language === 'ar' ? currentChild.nameAr : currentChild.name}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#6D7A77] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              <span className="text-[11px] font-medium text-[#00685F] line-clamp-1">
                {language === 'ar' ? currentChild.roomAr : currentChild.room}
              </span>
            </div>
          </button>

          {/* Child Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-12 start-0 z-50 w-64 bg-white rounded-2xl shadow-tactile-lg border border-[#E2E8F0] p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#6D7A77] uppercase tracking-wider">
                  {language === 'ar' ? 'أطفالك المسجلون' : 'Your Enrolled Children'}
                </div>
                {availableChildren.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onSelectChild(child.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                      child.id === currentChild.id
                        ? 'bg-[#E6F7F5] text-[#00685F]'
                        : 'hover:bg-[#FAF8FF] text-[#131B2E]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={child.avatarUrl}
                        alt={child.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold">
                          {language === 'ar' ? child.nameAr : child.name}
                        </div>
                        <div className="text-[10px] text-[#6D7A77]">
                          {language === 'ar' ? child.ageAr : child.age}
                        </div>
                      </div>
                    </div>
                    {child.id === currentChild.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#00685F]" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Global Controls: Language, Device Toggle, Notifications */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switch */}
          <button
            onClick={onToggleLanguage}
            className="h-8 px-2.5 rounded-full text-xs font-semibold bg-white border border-[#E2E8F0] text-[#131B2E] hover:border-[#00685F] hover:text-[#00685F] transition-all flex items-center gap-1 shadow-tactile-sm"
            title="Switch Language / تغيير اللغة"
          >
            <span className="text-[11px] font-bold">
              {language === 'ar' ? 'English' : 'عربي'}
            </span>
          </button>

          {/* Mobile frame vs Expanded frame */}
          <button
            onClick={onToggleDeviceFrame}
            className="h-8 px-2.5 rounded-full text-xs font-medium bg-white border border-[#E2E8F0] text-[#6D7A77] hover:text-[#131B2E] transition-all flex items-center gap-1.5 shadow-tactile-sm hidden sm:flex"
            title={isMobileFrame ? t.common.deviceModeExpanded : t.common.deviceModeMobile}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#00685F]" />
                <span className="text-[11px] font-medium">{t.common.deviceModeExpanded}</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#00685F]" />
                <span className="text-[11px] font-medium">{t.common.deviceModeMobile}</span>
              </>
            )}
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#131B2E] hover:bg-[#FAF8FF] transition-colors shadow-tactile-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 end-1 w-2 h-2 bg-[#F43F5E] rounded-full ring-2 ring-white animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
};
