'use client';
import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { COLLEGE_COURSES_GROUPED, COLLEGE_BRANCHES, COLLEGE_YEARS } from './stepData';

interface Props { onSubmit: () => void; onBack: () => void; }

export default function OnboardingCollege({ onSubmit, onBack }: Props) {
  const [field, setField] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [branch, setBranch] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [customCourse, setCustomCourse] = useState('');
  const [customBranch, setCustomBranch] = useState('');

  const fields = Object.keys(COLLEGE_COURSES_GROUPED);
  const courses = field ? [...COLLEGE_COURSES_GROUPED[field]!, 'Others'] : [];
  const courseIsOthers = course === 'Others';
  const branches = (course && !courseIsOthers && COLLEGE_BRANCHES[course]) ? COLLEGE_BRANCHES[course] : [];
  const branchIsOthers = branch !== null && branches.length > 0 && branches[branch] === 'Others';

  const ok = (() => {
    if (!course && !courseIsOthers) return false;
    if (courseIsOthers && !customCourse.trim()) return false;
    if (branches.length > 0 && branch === null) return false;
    if (branchIsOthers && !customBranch.trim()) return false;
    if (year === null) return false;
    return true;
  })();

  const tile = (label: string, on: boolean, onClick: () => void) => (
    <button type="button" onClick={onClick}
      className={`relative overflow-hidden w-full text-left rounded-[14px] px-[18px] py-[13px] mb-2 font-matter text-[14px] cursor-pointer transition-all duration-200 active:scale-[0.97] flex items-center justify-between ${on ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#0a0a0a] font-semibold' : 'bg-white/50 text-[#555] hover:bg-white/80'}`}
      style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.03)' }}>
      {on && (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
        </>
      )}
      <span className="relative z-10">{label}</span>
      {on && <CheckCircle size={20} weight="fill" className="relative z-10 text-[#6366F1]" />}
    </button>
  );

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="pt-8 px-7 text-center">
        <h1 className="font-season text-[24px] text-[#0a0a0a] font-bold leading-[1.15]">Your college details</h1>
        <p className="font-matter text-[13px] text-[#888] mt-2.5">Pick your field, course, and year.</p>
      </div>

      {/* Field chips */}
      <div className="w-full mt-5 shrink-0">
        <div className="flex gap-2 px-6 overflow-x-auto pb-2 scrollbar-hide">
          {fields.map(f => {
            const on = field === f;
            return (
              <button key={f} type="button" onClick={() => { setField(f); setCourse(null); setBranch(null); setCustomCourse(''); setCustomBranch(''); }}
                className={`relative overflow-hidden px-4 py-2 rounded-full font-matter text-[12px] whitespace-nowrap cursor-pointer transition-all duration-200 active:scale-[0.97] shrink-0 ${on ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] font-semibold text-[#0a0a0a]' : 'bg-white/50 text-[#666]'}`}
                style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.04)' }}>
                {on && (
                  <>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                  </>
                )}
                <span className="relative z-10">{f}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto w-full px-6 mt-3">
        {!field ? (
          <div className="flex items-center justify-center h-full">
            <span className="font-matter text-[14px] text-[#bbb]">Pick a field above</span>
          </div>
        ) : (
          <div>
            <p className="font-matter text-[10px] font-bold text-[#bbb] uppercase tracking-[1px] mb-2">COURSE</p>
            {courses.map(c => tile(c, course === c, () => { setCourse(c); setBranch(null); setCustomCourse(''); setCustomBranch(''); }))}
            {courseIsOthers && (
              <input type="text" value={customCourse} onChange={e => setCustomCourse(e.target.value)} placeholder="Type your course"
                className="w-full px-[18px] py-[14px] rounded-[14px] border border-[#E5E7EB] bg-white font-matter text-[14px] text-[#1A1A1A] placeholder-[#C0C0C0] outline-none mb-2" />
            )}

            {/* Branch */}
            {course && !courseIsOthers && branches.length > 0 && (
              <>
                <p className="font-matter text-[10px] font-bold text-[#bbb] uppercase tracking-[1px] mt-3 mb-2">BRANCH / SPECIALIZATION</p>
                {branches.map((b, i) => tile(b, branch === i, () => { setBranch(i); setCustomBranch(''); }))}
                {branchIsOthers && (
                  <input type="text" value={customBranch} onChange={e => setCustomBranch(e.target.value)} placeholder="Type your branch"
                    className="w-full px-[18px] py-[14px] rounded-[14px] border border-[#E5E7EB] bg-white font-matter text-[14px] text-[#1A1A1A] placeholder-[#C0C0C0] outline-none mb-2" />
                )}
              </>
            )}

            {/* Year */}
            <p className="font-matter text-[10px] font-bold text-[#bbb] uppercase tracking-[1px] mt-3 mb-2">YEAR</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {COLLEGE_YEARS.map((y, i) => {
                const on = year === i;
                return (
                  <button key={y} type="button" onClick={() => setYear(i)}
                    className={`relative overflow-hidden px-5 py-3 rounded-[14px] font-matter text-[14px] cursor-pointer transition-all duration-200 active:scale-[0.97] ${on ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] font-semibold text-[#0a0a0a]' : 'bg-white/50 text-[#555]'}`}
                    style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.03)' }}>
                    {on && (
                      <>
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                      </>
                    )}
                    <span className="relative z-10">{y}</span>
                  </button>
                );
              })}
            </div>
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
