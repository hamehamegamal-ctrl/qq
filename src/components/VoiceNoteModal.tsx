import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Mic, Square, Play, Pause, Send, CheckCircle2, Volume2, Sparkles } from 'lucide-react';

interface VoiceNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const VoiceNoteModal: React.FC<VoiceNoteModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isOpen) return null;

  const handleStartRecording = () => {
    setSelectedPreset(null);
    setIsRecording(true);
    setRecordSeconds(0);
    setHasRecorded(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
  };

  const handleSelectPreset = (preset: string) => {
    setSelectedPreset(preset);
    setHasRecorded(true);
    setRecordSeconds(6);
  };

  const handleSendVoiceNote = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
      // reset states
      setHasRecorded(false);
      setRecordSeconds(0);
      setSelectedPreset(null);
    }, 1800);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 border border-[#E2E8F0] shadow-tactile-lg space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E6F7F5] flex items-center justify-center text-[#00685F]">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131B2E]">
                {t.voiceModal.title}
              </h3>
              <p className="text-[11px] text-[#6D7A77]">
                {t.voiceModal.recipient}
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

        {isSent ? (
          <div className="py-8 text-center space-y-2 animate-in zoom-in-95">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-[#131B2E]">
              {t.voiceModal.sentSuccess}
            </h4>
            <p className="text-xs text-[#6D7A77]">
              {language === 'ar'
                ? 'تم استلام الرسالة الصوتية في غرفة الصف'
                : 'Notification ping delivered to teacher tablet'}
            </p>
          </div>
        ) : (
          <>
            {/* Recording Deck */}
            <div className="bg-[#FAF8FF] rounded-2xl p-4 border border-[#E2E8F0] flex flex-col items-center justify-center text-center space-y-3">
              {/* Waveform Visualization */}
              <div className="flex items-center justify-center gap-1 h-12 w-full px-4">
                {Array.from({ length: 24 }).map((_, i) => {
                  const barHeight = isRecording
                    ? Math.max(12, ((i * 17 + recordSeconds * 23) % 44) + 6)
                    : hasRecorded
                    ? (i % 3 === 0 ? 24 : 14)
                    : 6;

                  return (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isRecording
                          ? 'bg-[#00685F]'
                          : hasRecorded
                          ? 'bg-[#0D9488]/60'
                          : 'bg-[#CBD5E1]'
                      }`}
                      style={{ height: `${barHeight}px` }}
                    />
                  );
                })}
              </div>

              {/* Timer */}
              <div className="text-xs font-bold text-[#131B2E] tabular-nums">
                {formatTime(recordSeconds)}
              </div>

              {selectedPreset && (
                <div className="text-xs text-[#00685F] font-semibold bg-[#E6F7F5] px-3 py-1 rounded-full max-w-xs truncate">
                  {selectedPreset}
                </div>
              )}

              {/* Main Record Trigger */}
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="w-14 h-14 rounded-full bg-[#00685F] hover:bg-[#008378] text-white flex items-center justify-center shadow-tactile-lg active:scale-95 transition-all ring-4 ring-[#00685F]/20"
                    title="Start Recording"
                  >
                    <Mic className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="w-14 h-14 rounded-full bg-[#F43F5E] hover:bg-rose-600 text-white flex items-center justify-center shadow-tactile-lg active:scale-95 transition-all ring-4 ring-[#F43F5E]/20 animate-pulse"
                    title="Stop Recording"
                  >
                    <Square className="w-6 h-6 fill-current" />
                  </button>
                )}

                {hasRecorded && !isRecording && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] text-[#131B2E] flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all"
                    title="Preview Audio"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ms-0.5" />}
                  </button>
                )}
              </div>

              <span className="text-[11px] text-[#6D7A77]">
                {isRecording
                  ? t.voiceModal.recording
                  : hasRecorded
                  ? t.voiceModal.paused
                  : t.voiceModal.recordPrompt}
              </span>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#6D7A77] block">
                {t.voiceModal.presetsTitle}
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
                {t.voiceModal.presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(preset)}
                    className={`w-full text-left p-2 rounded-xl text-xs transition-all border ${
                      selectedPreset === preset
                        ? 'bg-[#E6F7F5] border-[#00685F] text-[#00685F] font-semibold'
                        : 'bg-[#FAF8FF] border-[#E2E8F0] text-[#131B2E] hover:bg-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-h-[44px] rounded-full border border-[#E2E8F0] text-xs font-semibold text-[#6D7A77] hover:bg-slate-50"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                disabled={!hasRecorded}
                onClick={handleSendVoiceNote}
                className={`flex-1 min-h-[44px] rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all ${
                  hasRecorded
                    ? 'bg-[#00685F] hover:bg-[#008378] text-white active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{t.voiceModal.sendBtn}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
