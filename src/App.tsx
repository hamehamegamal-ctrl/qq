/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, ChildId } from './types';
import {
  CHILDREN_DATA,
  METRIC_SUMMARIES,
  TIMELINE_ITEMS_LAYLA,
  TIMELINE_ITEMS_ZAYN,
  BUS_TELEMETRY,
  MEDICATIONS_DATA,
  ALLERGIES_DATA,
  INCLUSIVE_NOTES,
  AI_INSIGHT_DATA,
  CLASSROOM_MOMENTS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { TimelineTab } from './components/TimelineTab';
import { TransitTab } from './components/TransitTab';
import { HealthTab } from './components/HealthTab';
import { InsightsTab } from './components/InsightsTab';
import { MomentsTab } from './components/MomentsTab';
import { VoiceNoteModal } from './components/VoiceNoteModal';
import { DropOffNoteModal } from './components/DropOffNoteModal';
import { PickupPassModal } from './components/PickupPassModal';
import { NotificationsModal } from './components/NotificationsModal';
import { LightboxModal } from './components/LightboxModal';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export default function App() {
  const [selectedChildId, setSelectedChildId] = useState<ChildId>('layla');
  const [activeTab, setActiveTab] = useState<ActiveTab>('timeline');
  const [language, setLanguage] = useState<Language>('en');
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Modals
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isDropoffModalOpen, setIsDropoffModalOpen] = useState(false);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState<{ imageUrl: string; title: string } | null>(null);

  const currentChild = CHILDREN_DATA[selectedChildId];
  const availableChildren = Object.values(CHILDREN_DATA);
  const currentMetrics = METRIC_SUMMARIES[selectedChildId];
  const currentTimeline =
    selectedChildId === 'layla' ? TIMELINE_ITEMS_LAYLA : TIMELINE_ITEMS_ZAYN;

  // Sync RTL and lang attribute
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleDeviceFrame = () => {
    setIsMobileFrame((prev) => !prev);
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F0F2FA] text-[#131B2E] flex flex-col items-center justify-start p-0 sm:py-6 sm:px-4"
    >
      {/* Container wrapper: either phone frame or wide canvas */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isMobileFrame
            ? 'max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] bg-[#FAF8FF] sm:rounded-[44px] shadow-2xl sm:ring-8 sm:ring-slate-800/90 sm:border-4 sm:border-slate-700/50 flex flex-col overflow-hidden'
            : 'max-w-4xl min-h-screen bg-[#FAF8FF] sm:rounded-3xl shadow-lg border border-[#E2E8F0] flex flex-col'
        }`}
      >
        {/* Smartphone top hardware notch/island only on phone mockup mode */}
        {isMobileFrame && (
          <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 bg-[#FAF8FF] select-none text-[12px] font-semibold text-[#131B2E]">
            <span>09:41</span>
            {/* Dynamic Island pill */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00685F] animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#131B2E]">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Global App Header */}
        <Header
          currentChild={currentChild}
          availableChildren={availableChildren}
          onSelectChild={(id) => setSelectedChildId(id)}
          language={language}
          onToggleLanguage={toggleLanguage}
          isMobileFrame={isMobileFrame}
          onToggleDeviceFrame={toggleDeviceFrame}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        {/* Main Content Viewport with Smooth Scroll */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative pt-2">
          {activeTab === 'timeline' && (
            <TimelineTab
              child={currentChild}
              metrics={currentMetrics}
              timelineItems={currentTimeline}
              language={language}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onOpenDropoffModal={() => setIsDropoffModalOpen(true)}
              onOpenPickupModal={() => setIsPickupModalOpen(true)}
              onSelectPhotoMoment={(imageUrl, title) =>
                setLightboxData({ imageUrl, title })
              }
            />
          )}

          {activeTab === 'transit' && (
            <TransitTab telemetry={BUS_TELEMETRY} language={language} />
          )}

          {activeTab === 'health' && (
            <HealthTab
              allergies={ALLERGIES_DATA}
              medications={MEDICATIONS_DATA}
              inclusiveNotes={INCLUSIVE_NOTES}
              language={language}
            />
          )}

          {activeTab === 'insights' && (
            <InsightsTab
              insight={AI_INSIGHT_DATA}
              child={currentChild}
              language={language}
            />
          )}

          {activeTab === 'moments' && (
            <MomentsTab
              moments={CLASSROOM_MOMENTS}
              language={language}
              onOpenLightbox={(imageUrl, title) =>
                setLightboxData({ imageUrl, title })
              }
            />
          )}
        </main>

        {/* Floating Tactile Bottom Navigation Dock */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          language={language}
        />

        {/* Simulated iOS Home Indicator Indicator on Phone Mode */}
        {isMobileFrame && (
          <div className="hidden sm:block absolute bottom-1 inset-x-0 h-1 pointer-events-none z-50">
            <div className="w-28 h-1 bg-slate-900/30 rounded-full mx-auto" />
          </div>
        )}
      </div>

      {/* Interactive Modals */}
      <VoiceNoteModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
      />

      <DropOffNoteModal
        isOpen={isDropoffModalOpen}
        onClose={() => setIsDropoffModalOpen(false)}
        language={language}
      />

      <PickupPassModal
        isOpen={isPickupModalOpen}
        onClose={() => setIsPickupModalOpen(false)}
        child={currentChild}
        language={language}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        language={language}
      />

      <LightboxModal
        isOpen={!!lightboxData}
        onClose={() => setLightboxData(null)}
        imageUrl={lightboxData?.imageUrl || null}
        title={lightboxData?.title || null}
        language={language}
      />
    </div>
  );
}
