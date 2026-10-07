import React, { useState } from 'react';
import { Medication, Allergy, InclusiveNote, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  ShieldAlert,
  AlertCircle,
  Pill,
  HeartPulse,
  Thermometer,
  CheckCircle2,
  Clock,
  Sparkles,
  Accessibility,
  Plus,
  FileText,
} from 'lucide-react';

interface HealthTabProps {
  allergies: Allergy[];
  medications: Medication[];
  inclusiveNotes: InclusiveNote[];
  language: Language;
}

export const HealthTab: React.FC<HealthTabProps> = ({
  allergies,
  medications,
  inclusiveNotes,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [medsList, setMedsList] = useState<Medication[]>(medications);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedTime, setNewMedTime] = useState('11:30 AM');
  const [newMedInstructions, setNewMedInstructions] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: newMedName,
      nameAr: newMedName,
      dosage: newMedDose || '1 dose as directed',
      dosageAr: newMedDose || 'جرعة واحدة حسب التوجيه',
      timeScheduled: newMedTime,
      isCompleted: false,
      instructions: newMedInstructions || 'Follow parental note and keep in nursery cold box.',
      instructionsAr: newMedInstructions || 'الالتزام بملاحظة ولي الأمر وحفظ الدواء مبرداً.',
    };

    setMedsList([newMed, ...medsList]);
    setNewMedName('');
    setNewMedDose('');
    setNewMedInstructions('');
    setShowAddModal(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto px-4 pt-2">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F43F5E] uppercase tracking-wider mb-1">
              <HeartPulse className="w-4 h-4" />
              <span>{t.health.title}</span>
            </div>
            <h2 className="text-base font-bold text-[#131B2E]">
              {language === 'ar' ? 'سجل الرعاية والسلامة الطبية' : 'Medical & Dietary Safeguards'}
            </h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="min-h-[44px] px-3.5 py-2 rounded-full bg-[#E6F7F5] hover:bg-[#00685F] text-[#00685F] hover:text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? 'طلب إعطاء دواء' : 'Add Medication'}</span>
          </button>
        </div>

        {successToast && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {language === 'ar'
                ? 'تم إرسال طلب الدواء بنجاح وسيقوم تمريض الروضة بمراجعته فوراً!'
                : 'Medication request logged and dispatched to nursery nursing desk!'}
            </span>
          </div>
        )}
      </div>

      {/* 2. Critical Allergies (Rose semantic alert) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#F43F5E]">
            <ShieldAlert className="w-4 h-4" />
            <span>{t.health.allergiesHeading}</span>
          </div>
          <span className="text-[10px] font-bold text-[#F43F5E] bg-[#F43F5E]/10 px-2 py-0.5 rounded-full">
            {t.health.allergyHigh}
          </span>
        </div>

        <div className="grid gap-2.5">
          {allergies.map((allergy) => (
            <div
              key={allergy.id}
              className={`bg-white rounded-2xl p-4 border border-s-4 shadow-tactile-sm ${
                allergy.severity === 'high'
                  ? 'border-s-[#F43F5E] border-[#E2E8F0]'
                  : 'border-s-[#F59E0B] border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-[#131B2E]">
                  {language === 'ar' ? allergy.substanceAr : allergy.substance}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    allergy.severity === 'high'
                      ? 'bg-rose-50 text-rose-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {allergy.severity === 'high' ? t.health.allergyHigh : t.health.allergyMedium}
                </span>
              </div>

              <div className="text-xs text-[#3D4947] mb-2">
                <strong className="text-[#131B2E]">
                  {language === 'ar' ? 'الأعراض المحتملة: ' : 'Known Reaction: '}
                </strong>
                {language === 'ar' ? allergy.reactionAr : allergy.reaction}
              </div>

              <div className="bg-[#FAF8FF] p-2.5 rounded-xl border border-[#E2E8F0] flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 text-[#F43F5E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#131B2E] block">
                    {t.health.emergencyAction}
                  </span>
                  <span className="text-[#3D4947]">
                    {language === 'ar' ? allergy.emergencyPlanAr : allergy.emergencyPlan}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Prescribed Medication Schedule */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-[#00685F]" />
            <h3 className="text-sm font-bold text-[#131B2E]">
              {t.health.medicationsHeading}
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-[#00685F] bg-[#E6F7F5] px-2 py-0.5 rounded-full">
            {t.common.verified}
          </span>
        </div>

        <div className="space-y-3">
          {medsList.map((med) => (
            <div
              key={med.id}
              className="p-3 rounded-xl border border-[#E2E8F0] bg-[#FAF8FF] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#131B2E]">
                  {language === 'ar' ? med.nameAr : med.name}
                </h4>
                {med.isCompleted ? (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {language === 'ar' ? 'أُعطي بنجاح' : 'Administered'}
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {med.timeScheduled}
                  </span>
                )}
              </div>

              <div className="text-xs text-[#3D4947]">
                <strong>{language === 'ar' ? 'الجرعة: ' : 'Dosage: '}</strong>
                {language === 'ar' ? med.dosageAr : med.dosage}
              </div>

              <div className="text-[11px] text-[#6D7A77] leading-relaxed">
                {language === 'ar' ? med.instructionsAr : med.instructions}
              </div>

              {med.isCompleted && med.administeredBy && (
                <div className="text-[10px] text-[#00685F] font-semibold pt-1 border-t border-[#E2E8F0]/60 flex items-center justify-between">
                  <span>
                    {t.health.administeredAt}: {med.administeredTime}
                  </span>
                  <span>
                    {t.common.teacher}: {med.administeredBy}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Daily Temperature & Vitals Check */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-[#0EA5E9]" />
            <h3 className="text-sm font-bold text-[#131B2E]">
              {t.health.tempLogHeading}
            </h3>
          </div>
          <span className="text-[10px] text-[#6D7A77] font-medium">
            {t.health.normalTemp}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 bg-[#FAF8FF] rounded-xl border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-[#6D7A77] block">
              {language === 'ar' ? 'فحص الصباح (08:30 ص)' : 'Morning Check (08:30 AM)'}
            </span>
            <span className="text-lg font-black text-[#00685F] tabular-nums">36.7°C</span>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              ✓ {language === 'ar' ? 'طبيعي ومثالي' : 'Normal'}
            </span>
          </div>

          <div className="p-3 bg-[#FAF8FF] rounded-xl border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-[#6D7A77] block">
              {language === 'ar' ? 'فحص بعد القيلولة (03:45 م)' : 'Post-Nap Check (03:45 PM)'}
            </span>
            <span className="text-lg font-black text-[#00685F] tabular-nums">36.8°C</span>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              ✓ {language === 'ar' ? 'طبيعي ومستقر' : 'Optimal'}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Inclusive Nursery Care Accommodations (♿) */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-tactile-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#8B5CF6]/15 flex items-center justify-center text-[#6B38D4]">
            <Accessibility className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#131B2E]">
              {t.health.inclusiveHeading}
            </h3>
            <span className="text-[10px] text-[#6D7A77]">
              {t.health.inclusiveDesc}
            </span>
          </div>
        </div>

        <div className="space-y-2 mt-3">
          {inclusiveNotes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-xl bg-[#FAF8FF] border border-[#E2E8F0] space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#6B38D4]">
                  {language === 'ar' ? note.categoryAr : note.category}
                </span>
                <span className="text-[10px] text-[#6D7A77] font-medium">
                  {note.specialist}
                </span>
              </div>
              <p className="text-xs text-[#3D4947] leading-relaxed">
                {language === 'ar' ? note.descriptionAr : note.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Medication Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-tactile-lg border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-[#00685F]" />
                <h3 className="text-sm font-bold text-[#131B2E]">
                  {language === 'ar' ? 'طلب إعطاء دواء في الروضة' : 'Request Medication Administration'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#6D7A77] hover:text-[#131B2E] text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMedication} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#131B2E] block mb-1">
                  {language === 'ar' ? 'اسم الدواء أو المستحضر' : 'Medication Name'}
                </label>
                <input
                  type="text"
                  required
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: فيتامين د أو شراب خافض حرارة' : 'e.g. Vitamin D3 drops or Cough syrup'}
                  className="w-full h-11 px-3 rounded-xl bg-[#FAF8FF] border border-[#E2E8F0] text-xs text-[#131B2E] focus:outline-none focus:border-[#00685F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#131B2E] block mb-1">
                    {language === 'ar' ? 'الجرعة المحددة' : 'Dosage'}
                  </label>
                  <input
                    type="text"
                    value={newMedDose}
                    onChange={(e) => setNewMedDose(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: 2.5 مل' : 'e.g. 2.5 ml or 2 drops'}
                    className="w-full h-11 px-3 rounded-xl bg-[#FAF8FF] border border-[#E2E8F0] text-xs text-[#131B2E] focus:outline-none focus:border-[#00685F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#131B2E] block mb-1">
                    {language === 'ar' ? 'الموعد المطلوب' : 'Time'}
                  </label>
                  <input
                    type="text"
                    value={newMedTime}
                    onChange={(e) => setNewMedTime(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#FAF8FF] border border-[#E2E8F0] text-xs text-[#131B2E] focus:outline-none focus:border-[#00685F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#131B2E] block mb-1">
                  {language === 'ar' ? 'تعليمات الطبيب أو الحفظ' : 'Pediatrician Instructions / Storage'}
                </label>
                <textarea
                  rows={2}
                  value={newMedInstructions}
                  onChange={(e) => setNewMedInstructions(e.target.value)}
                  placeholder={language === 'ar' ? 'يحفظ في الثلاجة، يُعطى بعد وجبة الغداء...' : 'Store in refrigerator, give after lunch...'}
                  className="w-full p-3 rounded-xl bg-[#FAF8FF] border border-[#E2E8F0] text-xs text-[#131B2E] focus:outline-none focus:border-[#00685F]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 min-h-[44px] rounded-full border border-[#E2E8F0] text-xs font-semibold text-[#6D7A77] hover:bg-slate-100"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-[44px] rounded-full bg-[#00685F] text-white text-xs font-bold hover:bg-[#008378] shadow-md"
                >
                  {language === 'ar' ? 'تأكيد وإرسال للتمريض' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
