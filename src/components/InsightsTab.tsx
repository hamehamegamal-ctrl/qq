import React, { useState } from 'react';
import { AIInsight, Child, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Sparkles,
  Brain,
  MessageCircle,
  Lightbulb,
  Send,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface InsightsTabProps {
  insight: AIInsight;
  child: Child;
  language: Language;
}

export const InsightsTab: React.FC<InsightsTabProps> = ({
  insight,
  child,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { sender: 'user' | 'ai'; text: string; time: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleAskQuestion = (promptText?: string) => {
    const q = promptText || userQuestion;
    if (!q.trim()) return;

    const newChat = [...chatHistory, { sender: 'user' as const, text: q, time: 'Just now' }];
    setChatHistory(newChat);
    setUserQuestion('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = '';
      if (q.includes('sharing') || q.includes('مشاركة')) {
        aiResponse =
          language === 'ar'
            ? 'سلوك المشاركة الذي أظهرته ليلى اليوم مع عمر في برج المكعبات يُعد مؤشراً حيوياً على اكتمال المرحلة النمائية الأولى للتعاطف. في المنزل، يمكنك تعزيز ذلك عبر لعبة "أدوار التلوين" حيث تتبادلان أقلام الألوان بالتناوب مع الثناء اللفظي الصريح على المبادرة.'
            : "Layla's voluntary sharing of the block with Omar today indicates healthy Stage 3 social synthesis. At home, you can reinforce this by playing turn-taking drawing games and offering specific praise like 'I love how patient you are when handing me the pencil!'";
      } else if (q.includes('block') || q.includes('مكعبات') || q.includes('reasoning') || q.includes('هندسي')) {
        aiResponse =
          language === 'ar'
            ? 'بناء المكعبات وتصنيف الأسطوانات يدرّب القشرة الجدارية المسؤولة عن الإدراك الفراغي والتنسيق بين العين واليد. تحقيقها لتوازن ٦ مكعبات متتالية يعكس ثباتاً عصبياً حركياً ممتازاً يسبق مرحلة مسك القلم بثقة.'
            : "Stacking 6 gradient cylinders exercises parietal cortex spatial mapping and bilateral hand-eye coordination. Reaching 6 balanced levels shows robust motor calibration, a foundational precursor to confident pencil grip and early writing.";
      } else if (q.includes('nap') || q.includes('نوم') || q.includes('قيلولة')) {
        aiResponse =
          language === 'ar'
            ? 'نظراً لأن ليلى استيقظت من قيلولة الروضة في الساعة 3:00 مساءً، فإن نافذة الضغط للنوم المثالية الليلة ستبدأ حوالي الساعة 8:30 إلى 9:00 مساءً. نوصي بحمام دافئ، وتعتيم الإضاءة، وقراءة قصة هادئة قبل النوم بنصف ساعة.'
            : 'Since Layla completed her 1h 45m nap at 3:00 PM, her evening sleep pressure will peak naturally between 8:30 PM and 9:00 PM. A warm bath, dim amber lighting, and her bedtime question will create a calming transition.';
      } else {
        aiResponse =
          language === 'ar'
            ? `بناءً على سجل ${child.nameAr} لليوم في صف ${child.roomAr}: تظهر مؤشرات ممتازة في التفاعل الإيجابي والنشاط البدني. نوصي بالاستمرار في تعزيز التعبير اللفظي ومكافأة الفضول المعرفي.`
            : `Based on ${child.name}'s daily classroom logs in ${child.room}: she demonstrated high curiosity and peer empathy. Continuing bilingual reading at home will accelerate her expressive vocabulary beautifully!`;
      }

      setChatHistory([
        ...newChat,
        { sender: 'ai', text: aiResponse, time: 'Just now' },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto px-4 pt-2">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-[#6B38D4] to-[#4F46E5] rounded-2xl p-4 text-white shadow-tactile-md relative overflow-hidden">
        <div className="absolute top-0 end-0 p-3 opacity-15">
          <Brain className="w-24 h-24" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-violet-200 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t.insights.title}</span>
          </div>
          <h2 className="text-base font-bold text-white mb-1">
            {language === 'ar' ? insight.headlineAr : insight.headline}
          </h2>
          <span className="text-xs text-violet-200">
            {insight.date}
          </span>
        </div>
      </div>

      {/* 2. Pedagogical Observation Synthesis */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6B38D4]">
          <BookOpen className="w-4 h-4" />
          <span>{t.insights.dailyMilestone}</span>
        </div>

        <p className="text-xs text-[#131B2E] leading-relaxed">
          {language === 'ar'
            ? insight.pedagogicalObservationAr
            : insight.pedagogicalObservation}
        </p>

        <div className="bg-[#FAF8FF] p-3 rounded-xl border border-[#E2E8F0] flex items-start gap-2.5 mt-2">
          <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#131B2E] block">
              {t.insights.educatorNoteTitle}
            </span>
            <span className="text-[#3D4947]">
              {language === 'ar' ? insight.educatorTipAr : insight.educatorTip}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Core Developmental Domains Progress */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00685F]" />
            <h3 className="text-sm font-bold text-[#131B2E]">
              {t.insights.developmentDomains}
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-[#00685F] bg-[#E6F7F5] px-2 py-0.5 rounded-full">
            {language === 'ar' ? 'نمو متوازن' : 'Balanced Growth'}
          </span>
        </div>

        <div className="space-y-3">
          {insight.domainProgress.map((domain, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#131B2E]">
                  {language === 'ar' ? domain.domainAr : domain.domain}
                </span>
                <span className="font-semibold text-[#6D7A77] text-[11px] tabular-nums">
                  {domain.score}%
                </span>
              </div>
              <div className="w-full bg-[#FAF8FF] h-2 rounded-full overflow-hidden border border-[#E2E8F0]">
                <div
                  className="bg-gradient-to-r from-[#00685F] to-[#0D9488] h-full rounded-full transition-all duration-500"
                  style={{ width: `${domain.score}%` }}
                />
              </div>
              <div className="text-[10px] text-[#6D7A77]">
                {language === 'ar' ? domain.levelAr : domain.level}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tonight's Recommended Bedtime Prompt Card */}
      <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl p-4 border border-amber-300 shadow-tactile-sm">
        <div className="flex items-center gap-2 text-amber-900 mb-1">
          <span className="text-lg">🌙</span>
          <h3 className="text-sm font-bold">
            {t.insights.bedtimePromptTitle}
          </h3>
        </div>
        <p className="text-[11px] text-amber-950 font-medium mb-2 leading-relaxed">
          {t.insights.bedtimePromptDesc}
        </p>
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-amber-200/60 shadow-sm text-xs font-semibold text-[#131B2E] italic leading-relaxed">
          "{language === 'ar' ? insight.eveningBedtimePromptAr : insight.eveningBedtimePrompt}"
        </div>
      </div>

      {/* 5. Interactive Early Childhood AI Consultant */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[#6B38D4]" />
          <h3 className="text-sm font-bold text-[#131B2E]">
            {t.insights.askAiHeading}
          </h3>
        </div>

        {/* Suggested Quick Questions */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-[#6D7A77] block">
            {language === 'ar' ? 'أسئلة مقترحة بنقرة واحدة:' : 'Suggested pedagogical topics:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {t.insights.suggestedQuestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleAskQuestion(sug)}
                className="text-[11px] text-[#00685F] font-medium bg-[#E6F7F5] hover:bg-[#00685F] hover:text-white px-2.5 py-1.5 rounded-full border border-[#00685F]/20 transition-all text-start"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Stream */}
        {chatHistory.length > 0 && (
          <div className="space-y-2.5 pt-2 border-t border-[#E2E8F0]/80">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#00685F] text-white rounded-br-none'
                      : 'bg-[#FAF8FF] border border-[#E2E8F0] text-[#131B2E] rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <span className="text-[10px] font-bold text-[#6B38D4] block mb-1">
                      ✨ {language === 'ar' ? 'مستشار الطفولة المبكرة' : 'Nursery Pedagogy Advisor'}
                    </span>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-[#6B38D4] p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>
                  {language === 'ar' ? 'جارٍ تحليل الملاحظات التربوية...' : 'Synthesizing pedagogical insight...'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder={t.insights.askAiPlaceholder}
            className="flex-1 h-11 px-3 rounded-full bg-[#FAF8FF] border border-[#E2E8F0] text-xs text-[#131B2E] placeholder:text-[#6D7A77] focus:outline-none focus:border-[#6B38D4]"
          />
          <button
            onClick={() => handleAskQuestion()}
            className="min-h-[44px] min-w-[44px] rounded-full bg-[#6B38D4] hover:bg-[#8455EF] text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
