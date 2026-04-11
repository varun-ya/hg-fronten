'use client';
import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { EXAM_DATA } from './stepData';

interface Props { onSubmit: () => void; onBack: () => void; }

export default function OnboardingAspirant({ onSubmit, onBack }: Props) {
  const [category, setCategory] = useState<string | null>(null);
  const [exam, setExam] = useState<string | null>(null);
  const [customExam, setCustomExam] = useState('');

  const categories = Object.keys(EXAM_DATA);
  const grouped = category ? EXAM_DATA[category] : {};
  const pickedOthers = exam === 'Others';
  const ok = exam !== null && (!pickedOthers || customExam.trim().length > 0);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="pt-8 px-7 text-center">
        <h1 className="font-season text-[24px] text-[#0a0a0a] font-bold leading-[1.15]">What are you preparing for?</h1>
        <p className="font-matter text-[13px] text-[#888] mt-2.5">Pick your field, then your exam.</p>
      </div>

      {/* Category chips */}
      <div className="w-full mt-5 shrink-0">
        <div className="flex gap-2 px-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => {
            const on = category === cat;
            return (
              <button key={cat} type="button" onClick={() => { setCategory(cat); setExam(null); setCustomExam(''); }}
                className={`relative overflow-hidden px-4 py-2 rounded-full font-matter text-[13px] whitespace-nowrap cursor-pointer transition-all duration-200 active:scale-[0.97] shrink-0 ${on ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] font-semibold text-[#0a0a0a]' : 'bg-white/50 text-[#666]'}`}
                style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.04)' }}>
                {on && (
                  <>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                  </>
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exam list */}
      <div className="flex-1 overflow-y-auto w-full px-6 mt-3">
        {!category ? (
          <div className="flex items-center justify-center h-full">
            <span className="font-matter text-[14px] text-[#bbb]">Pick a field above</span>
          </div>
        ) : (
          <div className="space-y-1">
            {Object.entries(grouped).map(([sub, exams]) => (
              <div key={sub}>
                {sub && <p className="font-matter text-[10px] font-bold text-[#bbb] uppercase tracking-[1px] mt-3 mb-2">{sub}</p>}
                {exams.map(e => {
                  const on = exam === e;
                  return (
                    <button key={e} type="button" onClick={() => setExam(e)}
                      className={`relative overflow-hidden w-full text-left rounded-[14px] px-[18px] py-[13px] mb-2 font-matter text-[14px] cursor-pointer transition-all duration-200 active:scale-[0.97] flex items-center justify-between ${on ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#0a0a0a] font-semibold' : 'bg-white/50 text-[#555] hover:bg-white/80'}`}
                      style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.03)' }}>
                      {on && (
                        <>
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                        </>
                      )}
                      <span className="relative z-10">{e}</span>
                      {on && <CheckCircle size={20} weight="fill" className="relative z-10 text-[#F97316]" />}
                    </button>
                  );
                })}
              </div>
            ))}
            {/* Others */}
            <button type="button" onClick={() => setExam('Others')}
              className={`relative overflow-hidden w-full text-left rounded-[14px] px-[18px] py-[13px] mb-2 font-matter text-[14px] cursor-pointer transition-all duration-200 active:scale-[0.97] flex items-center justify-between ${pickedOthers ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#0a0a0a] font-semibold' : 'bg-white/50 text-[#555] hover:bg-white/80'}`}
              style={{ border: pickedOthers ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.03)' }}>
              {pickedOthers && (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                </>
              )}
              <span className="relative z-10">Others</span>
              {pickedOthers && <CheckCircle size={20} weight="fill" className="relative z-10 text-[#F97316]" />}
            </button>
            {pickedOthers && (
              <input type="text" value={customExam} onChange={e => setCustomExam(e.target.value)} placeholder="Type your exam name"
                className="w-full px-[18px] py-[14px] rounded-[14px] border border-[#E5E7EB] bg-white font-matter text-[14px] text-[#1A1A1A] placeholder-[#C0C0C0] outline-none mb-2" />
            )}
          </div>
        )}
      </div>

      <div className="w-full px-6 pb-6 pt-4 space-y-2.5">
        <button type="button" onClick={ok ? onSubmit : undefined}
          className="group w-full py-[14px] rounded-full font-matter text-[15px] font-bold text-white transition-all active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2"
          style={{ background: '#0a0a0a', opacity: ok ? 1 : 0.2, boxShadow: ok ? '0 4px 0 rgba(0,0,0,0.15)' : 'none' }}>
          Let&apos;s Go! <ArrowRight size={15} weight="bold" />
        </button>
        <button type="button" onClick={onBack} className="w-full font-matter text-[12px] text-[#bbb] hover:text-[#888] cursor-pointer text-center py-1 transition-colors">Back</button>
      </div>
    </div>
  );
}
