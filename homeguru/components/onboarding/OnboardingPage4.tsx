'use client';
import React, { useState } from 'react';
import { ArrowRight, MathOperations, Flask, BookOpen, Globe, Translate, Desktop, ChartBar, TrendUp, Sparkle, MusicNote, PersonSimpleRun, PaintBrush, Code, ChatTeardrop, Microphone, Camera, PencilLine } from '@phosphor-icons/react';
import { ACADEMIC_SUBJECTS, NON_ACADEMIC_SUBJECTS } from './stepData';

const ACADEMIC_ICONS: Record<string, React.ElementType> = {
  'Mathematics': MathOperations, 'Science': Flask, 'English': BookOpen, 'Social Studies': Globe,
  'Hindi': Translate, 'Computer Science': Desktop, 'Accountancy': ChartBar, 'Economics': TrendUp, 'Others': Sparkle,
};
const NON_ACADEMIC_ICONS: Record<string, React.ElementType> = {
  'Music': MusicNote, 'Dance': PersonSimpleRun, 'Art & Design': PaintBrush, 'Coding': Code,
  'Languages': ChatTeardrop, 'Public Speaking': Microphone, 'Photography': Camera, 'Creative Writing': PencilLine, 'Others': Sparkle,
};

interface Props { interest: string; onNext: (subject: string) => void; onBack: () => void; }

export default function OnboardingPage4({ interest, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = interest === 'Academic' ? ACADEMIC_SUBJECTS : NON_ACADEMIC_SUBJECTS;
  const iconMap = interest === 'Academic' ? ACADEMIC_ICONS : NON_ACADEMIC_ICONS;

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="pt-8 px-7 text-center">
        <h1 className="font-season text-[24px] text-[#0a0a0a] font-bold leading-[1.15] tracking-[-0.01em]">What do you want to focus on?</h1>
        <p className="font-matter text-[13px] text-[#888] mt-2.5 leading-[1.5]">Pick a subject that excites you the most.</p>
      </div>

      <div className="flex-1 overflow-y-auto w-full px-6 mt-6">
        <div className="grid grid-cols-2 gap-2.5">
          {options.map((option) => {
            const sel = selected === option;
            const Icon = iconMap[option] || Sparkle;
            return (
              <button key={option} type="button" onClick={() => setSelected(option)}
                className={`relative overflow-hidden rounded-[18px] p-4 font-matter text-[13px] cursor-pointer transition-all duration-200 active:scale-[0.96] flex flex-col items-center gap-2.5 ${sel ? 'bg-white text-[#0a0a0a] font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'bg-white/50 text-[#666] hover:bg-white/80'}`}
                style={{ border: sel ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.03)' }}>
                {sel && (
                  <>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                  </>
                )}
                <div className={`relative z-10 w-10 h-10 rounded-[12px] flex items-center justify-center ${sel ? 'bg-[#FFF7ED]' : 'bg-black/[0.03]'}`}>
                  <Icon size={20} weight={sel ? 'fill' : 'regular'} className={sel ? 'text-[#F97316]' : 'text-[#bbb]'} />
                </div>
                <span className="relative z-10">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full px-6 pb-6 pt-4 space-y-2.5">
        <button type="button" disabled={!selected} onClick={() => selected && onNext(selected)}
          className="group w-full py-[14px] rounded-full font-matter text-[15px] font-bold text-white transition-all active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2"
          style={{ background: '#0a0a0a', opacity: selected ? 1 : 0.2, boxShadow: selected ? '0 4px 0 rgba(0,0,0,0.15)' : 'none' }}>
          Continue <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <button type="button" onClick={onBack} className="w-full font-matter text-[12px] text-[#bbb] hover:text-[#888] cursor-pointer text-center py-1 transition-colors">Back</button>
      </div>
    </div>
  );
}
