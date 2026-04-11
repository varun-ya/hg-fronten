'use client';
import React, { useState } from 'react';
import { BookOpen, Palette, ArrowRight } from '@phosphor-icons/react';

interface Props { onNext: (interest: string) => void; onBack: () => void; }

export default function OnboardingPage3({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="pt-8 px-7 text-center">
        <h1 className="font-season text-[24px] text-[#0a0a0a] font-bold leading-[1.15] tracking-[-0.01em]">What are you more interested in?</h1>
        <p className="font-matter text-[13px] text-[#888] mt-2.5 leading-[1.5]">This helps us tailor your learning experience.</p>
      </div>

      <div className="flex-1 flex items-center justify-center w-full px-6">
        <div className="flex gap-3 w-full">
          {[
            { label: 'Academic', desc: 'School subjects & exam prep', Icon: BookOpen },
            { label: 'Non-Academic', desc: 'Skills, hobbies & passions', Icon: Palette },
          ].map(({ label, desc, Icon }) => {
            const sel = selected === label;
            return (
              <button key={label} type="button" onClick={() => setSelected(label)}
                className={`flex-1 flex flex-col items-center gap-3.5 rounded-[20px] px-4 py-8 cursor-pointer transition-all duration-200 active:scale-[0.97] relative overflow-hidden ${sel ? 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : 'bg-white/50 hover:bg-white/80'}`}
                style={{ border: sel ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.03)' }}>
                {sel && (
                  <>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                  </>
                )}
                <div className={`relative z-10 w-14 h-14 rounded-[16px] flex items-center justify-center transition-colors ${sel ? 'bg-[#FFF7ED]' : 'bg-black/[0.03]'}`}>
                  <Icon size={26} weight={sel ? 'fill' : 'regular'} className={sel ? 'text-[#F97316]' : 'text-[#bbb]'} />
                </div>
                <span className={`relative z-10 font-matter font-semibold text-[15px] ${sel ? 'text-[#0a0a0a]' : 'text-[#666]'}`}>{label}</span>
                <span className="relative z-10 font-matter text-[11px] text-[#aaa] text-center leading-[1.4]">{desc}</span>
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
