'use client';
import React, { useState } from 'react';
import { ArrowRight, Leaf, Plant, Tree, Mountains, Trophy } from '@phosphor-icons/react';

interface Props { subject: string; onNext: () => void; onBack: () => void; }

const LEVEL_ICONS = [Leaf, Plant, Tree, Mountains, Trophy];
const LEVEL_COLORS = ['#22C55E', '#22C55E', '#F59E0B', '#F97316', '#8B5CF6'];

export default function OnboardingPage5({ subject, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    `I'm new to ${subject}`,
    'I know some basics',
    `I can handle basic ${subject} concepts`,
    `I can work with various ${subject} topics`,
    `I can discuss most ${subject} topics in detail`,
  ];

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="pt-8 px-7 text-center">
        <h1 className="font-season text-[24px] text-[#0a0a0a] font-bold leading-[1.15] tracking-[-0.01em]">How much {subject} do you know?</h1>
        <p className="font-matter text-[13px] text-[#888] mt-2.5 leading-[1.5]">This helps us find the right starting point.</p>
      </div>

      <div className="flex-1 overflow-y-auto w-full px-6 mt-6">
        <div className="space-y-2.5">
          {options.map((option, idx) => {
            const sel = selected === idx;
            const Icon = LEVEL_ICONS[idx];
            return (
              <button key={idx} type="button" onClick={() => setSelected(idx)}
                className={`relative overflow-hidden w-full text-left rounded-[16px] px-4 py-[14px] font-matter text-[13px] cursor-pointer transition-all duration-200 active:scale-[0.97] flex items-center gap-3.5 ${sel ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#0a0a0a] font-semibold' : 'bg-white/50 text-[#555] hover:bg-white/80'}`}
                style={{ border: sel ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.03)' }}>
                {sel && (
                  <>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                  </>
                )}
                <div className={`relative z-10 w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${sel ? 'bg-[#FFF7ED]' : 'bg-black/[0.03]'}`}>
                  <Icon size={18} weight={sel ? 'fill' : 'regular'} style={{ color: sel ? LEVEL_COLORS[idx] : '#bbb' }} />
                </div>
                <span className="relative z-10 flex-1">{option}</span>
                {sel && <span className="relative z-10 w-5 h-5 rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full px-6 pb-6 pt-4 space-y-2.5">
        <button type="button" disabled={selected === null} onClick={onNext}
          className="group w-full py-[14px] rounded-full font-matter text-[15px] font-bold text-white transition-all active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2"
          style={{ background: '#0a0a0a', opacity: selected !== null ? 1 : 0.2, boxShadow: selected !== null ? '0 4px 0 rgba(0,0,0,0.15)' : 'none' }}>
          Continue <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <button type="button" onClick={onBack} className="w-full font-matter text-[12px] text-[#bbb] hover:text-[#888] cursor-pointer text-center py-1 transition-colors">Back</button>
      </div>
    </div>
  );
}
