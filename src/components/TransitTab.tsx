import React, { useState, useEffect } from 'react';
import { BusTelemetry, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Bus,
  Gauge,
  Thermometer,
  ShieldCheck,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  QrCode,
  CheckCircle2,
  RefreshCw,
  User,
  Radio,
  AlertTriangle,
} from 'lucide-react';

interface TransitTabProps {
  telemetry: BusTelemetry;
  language: Language;
}

export const TransitTab: React.FC<TransitTabProps> = ({ telemetry, language }) => {
  const t = TRANSLATIONS[language];
  const [selectedGuardian, setSelectedGuardian] = useState<'mom' | 'dad' | 'grandma'>('mom');
  const [eta, setEta] = useState(telemetry.etaMinutes);
  const [securityToken, setSecurityToken] = useState('4921');
  const [countdown, setCountdown] = useState(42);
  const [callAlert, setCallAlert] = useState(false);

  // Periodic security code rotation simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // generate random 4-digit code
          setSecurityToken(Math.floor(1000 + Math.random() * 9000).toString());
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCallEscort = () => {
    setCallAlert(true);
    setTimeout(() => setCallAlert(false), 3000);
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto px-4 pt-2">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-[#0284C7] to-[#00685F] rounded-2xl p-4 text-white shadow-tactile-md relative overflow-hidden">
        <div className="absolute top-0 end-0 p-4 opacity-15">
          <Bus className="w-28 h-28" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {t.common.live} {telemetry.busNumber}
            </span>
            <span className="text-xs text-white/80">·</span>
            <span className="text-xs text-white/90 font-medium">
              {language === 'ar' ? telemetry.routeTitleAr : telemetry.routeTitle}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold tracking-tight tabular-nums">
              {eta} {t.transit.minutes}
            </span>
            <span className="text-xs font-semibold text-white/80">
              {t.transit.eta}
            </span>
          </div>

          <p className="text-xs text-white/90 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              {t.transit.nextStop}:{' '}
              <strong className="underline underline-offset-2">
                {language === 'ar' ? telemetry.nextStopNameAr : telemetry.nextStopName}
              </strong>
            </span>
          </p>
        </div>
      </div>

      {/* 2. Sensor Telemetry Grid (Speed, AC, Belts) */}
      <div className="grid grid-cols-3 gap-2">
        {/* Speed */}
        <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] shadow-tactile-sm text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#6D7A77] mb-1">
            <Gauge className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>{t.transit.speed}</span>
          </div>
          <span className="text-lg font-black text-[#131B2E] tabular-nums">
            {telemetry.currentSpeedKm}
            <span className="text-[10px] font-normal text-[#6D7A77] ms-0.5">km/h</span>
          </span>
        </div>

        {/* Temperature */}
        <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] shadow-tactile-sm text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#6D7A77] mb-1">
            <Thermometer className="w-3.5 h-3.5 text-[#00685F]" />
            <span>{t.transit.cabinTemp}</span>
          </div>
          <span className="text-lg font-black text-[#131B2E] tabular-nums">
            {telemetry.cabinTempC}°C
          </span>
        </div>

        {/* Seatbelts */}
        <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] shadow-tactile-sm text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#6D7A77] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>{t.transit.seatbelts}</span>
          </div>
          <span className="text-xs font-bold text-[#00685F] flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00685F]" />
            <span>12/12</span>
          </span>
        </div>
      </div>

      {/* 3. Driver & Escort Contact Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAEDFF] flex items-center justify-center text-[#6B38D4] font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#131B2E]">
                {language === 'ar' ? telemetry.supervisorNameAr : telemetry.supervisorName}
              </div>
              <div className="text-[11px] text-[#6D7A77]">
                {t.transit.supervisor} · {language === 'ar' ? telemetry.driverNameAr : telemetry.driverName} ({t.transit.driver})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCallEscort}
              className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-full bg-[#E6F7F5] text-[#00685F] text-xs font-bold flex items-center gap-1 hover:bg-[#00685F] hover:text-white transition-all active:scale-95 shadow-sm"
              title={t.transit.callDriver}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{t.transit.callDriver}</span>
            </button>
          </div>
        </div>

        {callAlert && (
          <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>
              {language === 'ar'
                ? 'اتصال آمن مباشر بالمشرفة الصحية سلمى المطوع على متن الحافلة...'
                : 'Direct radio link open to Nurse Salma onboard Bus 04...'}
            </span>
          </div>
        )}
      </div>

      {/* 4. Live Route Stops Timeline */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00685F]" />
            <h3 className="text-sm font-bold text-[#131B2E]">
              {language === 'ar' ? 'محطات المسار والموقع الحي' : 'Live Route Stops & Progress'}
            </h3>
          </div>
          <span className="text-xs text-[#0EA5E9] font-bold flex items-center gap-1">
            <Radio className="w-3 h-3 animate-ping" />
            GPS Active
          </span>
        </div>

        <div className="relative space-y-3.5 before:absolute before:top-2 before:bottom-2 before:start-3.5 before:w-0.5 before:bg-[#E2E8F0]">
          {telemetry.stops.map((stop) => {
            return (
              <div key={stop.id} className="relative flex items-start gap-3 z-10">
                {/* Node icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                    stop.isCompleted
                      ? 'bg-[#00685F] border-[#00685F] text-white'
                      : stop.isCurrent
                      ? 'bg-[#0EA5E9] border-white text-white ring-4 ring-[#0EA5E9]/20 shadow-md animate-pulse'
                      : stop.isUserStop
                      ? 'bg-amber-400 border-white text-white ring-4 ring-amber-400/20'
                      : 'bg-white border-[#CBD5E1] text-[#94A3B8]'
                  }`}
                >
                  {stop.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Stop info */}
                <div
                  className={`flex-1 p-2 rounded-xl border transition-all ${
                    stop.isUserStop
                      ? 'bg-[#FFFBEB] border-amber-300 shadow-sm'
                      : stop.isCurrent
                      ? 'bg-[#F0F9FF] border-sky-300'
                      : 'bg-[#FAF8FF] border-[#E2E8F0]/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-bold ${
                        stop.isUserStop ? 'text-amber-900' : 'text-[#131B2E]'
                      }`}
                    >
                      {language === 'ar' ? stop.nameAr : stop.name}
                    </span>
                    <span className="text-[10px] font-semibold text-[#6D7A77] tabular-nums">
                      {stop.time}
                    </span>
                  </div>
                  {stop.isUserStop && (
                    <span className="text-[10px] font-bold text-amber-700 block mt-0.5">
                      ⭐ {language === 'ar' ? 'محطة وصول طفلك المحددة' : 'Your Child Delivery Destination'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Encrypted Digital Parent Pickup Pass */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-[#00685F]" />
            <h3 className="text-sm font-bold text-[#131B2E]">
              {t.transit.pickupCodeTitle}
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-[#6D7A77] flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-[#00685F] animate-spin" />
            {countdown}s
          </span>
        </div>

        <p className="text-xs text-[#3D4947] mb-3 leading-relaxed">
          {t.transit.pickupCodeDesc}
        </p>

        {/* Guardian Selector */}
        <div className="flex items-center gap-2 mb-4 p-1 bg-[#FAF8FF] rounded-xl border border-[#E2E8F0]">
          <button
            onClick={() => setSelectedGuardian('mom')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              selectedGuardian === 'mom'
                ? 'bg-white text-[#00685F] shadow-sm'
                : 'text-[#6D7A77]'
            }`}
          >
            {t.transit.mom}
          </button>
          <button
            onClick={() => setSelectedGuardian('dad')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              selectedGuardian === 'dad'
                ? 'bg-white text-[#00685F] shadow-sm'
                : 'text-[#6D7A77]'
            }`}
          >
            {t.transit.dad}
          </button>
          <button
            onClick={() => setSelectedGuardian('grandma')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              selectedGuardian === 'grandma'
                ? 'bg-white text-[#00685F] shadow-sm'
                : 'text-[#6D7A77]'
            }`}
          >
            {t.transit.grandma}
          </button>
        </div>

        {/* QR Visual & Rolling Token */}
        <div className="bg-[#FAF8FF] rounded-2xl p-4 border border-[#E2E8F0] flex flex-col items-center justify-center text-center">
          <div className="relative p-3 bg-white rounded-2xl shadow-sm border border-[#E2E8F0]">
            {/* SVG Stylized Secure QR Representation */}
            <div className="w-36 h-36 relative flex items-center justify-center">
              <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isCorner =
                    i === 0 || i === 1 || i === 6 || i === 7 ||
                    i === 4 || i === 5 || i === 10 || i === 11 ||
                    i === 24 || i === 25 || i === 30 || i === 31;
                  const isFilled = isCorner || (i * 7 + 3) % 4 === 0 || i % 3 === 0;

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
                <span className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center ring-2 ring-[#00685F]">
                  <ShieldCheck className="w-5 h-5 text-[#00685F]" />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <span className="text-[10px] font-bold text-[#6D7A77] uppercase tracking-wider block">
              {language === 'ar' ? 'رمز المصادقة السريع' : 'Quick Auth Token'}
            </span>
            <span className="text-2xl font-black text-[#131B2E] tracking-widest tabular-nums">
              #{securityToken}
            </span>
          </div>

          <div className="mt-2 text-[11px] text-[#00685F] font-semibold bg-[#E6F7F5] px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00685F]" />
            <span>
              {t.common.authorized}:{' '}
              {selectedGuardian === 'mom'
                ? t.transit.mom
                : selectedGuardian === 'dad'
                ? t.transit.dad
                : t.transit.grandma}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-[#6D7A77] mt-3 text-center leading-relaxed">
          {t.transit.safetyProtocol}
        </p>
      </div>
    </div>
  );
};
