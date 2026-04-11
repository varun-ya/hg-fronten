'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpenText, Code, CreditCard, IdentificationCard, Broadcast, SpinnerGap, Check } from '@phosphor-icons/react';

interface Props { onNext: () => void; }

const steps = [
  { label: 'Subjects & Skills', desc: 'Tell us what you can teach', icon: BookOpenText },
  { label: 'Qualification Test', desc: 'Show us your problem-solving skills', icon: Code },
  { label: 'Listing Fee', desc: '₹499/year · valid for 365 days', icon: CreditCard },
  { label: 'ID Verification', desc: 'Upload a government-issued ID', icon: IdentificationCard },
  { label: 'Go Live', desc: 'Start getting students instantly', icon: Broadcast },
];

export default function AdminStep1Welcome({ onNext }: Props) {
  // -1=idle, 0..4=loading that step, 5=all done
  const [loadingIdx, setLoadingIdx] = useState(-1);
  const [doneIdx, setDoneIdx] = useState(-1);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    steps.forEach((_, i) => {
      // Start spinning on step i
      timers.push(setTimeout(() => setLoadingIdx(i), 500 + i * 800));
      // Mark step i as done
      timers.push(setTimeout(() => { setDoneIdx(i); setLoadingIdx(-1); }, 500 + i * 800 + 500));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-[520px] mx-auto px-8 py-16">
      <style>{`
        @keyframes searchSpin { to { transform: rotate(360deg); } }
        @keyframes fadeSlide { from { opacity:0; transform:translateX(-6px); filter:blur(2px); } to { opacity:1; transform:translateX(0); filter:blur(0); } }
        @keyframes checkPop { 0% { transform:scale(0); } 60% { transform:scale(1.2); } 100% { transform:scale(1); } }
        .search-spin { animation: searchSpin 1s linear infinite; }
        .fade-slide { animation: fadeSlide 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .check-pop { animation: checkPop 0.3s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <p className="font-matter text-[12px] font-semibold text-[#F97316] uppercase tracking-[0.12em]">Tutor Onboarding</p>

      <h1 className="font-season text-[36px] text-[#0F172A] leading-[1.1] tracking-[-0.03em] mt-3">
        Your journey to<br />becoming a <span className="text-[#F97316]">HomeGuru</span>
      </h1>
      <p className="font-matter text-[15px] text-[#94A3B8] leading-[1.6] mt-4">
        5 simple steps. Takes about 10 minutes.
      </p>

      <div className="flex flex-col gap-1 mt-12">
        {steps.map(({ label, desc, icon: Icon }, i) => {
          const isDone = i <= doneIdx;
          const isLoading = i === loadingIdx;
          const isWaiting = !isDone && !isLoading;

          return (
            <div key={label}
              className="flex items-center gap-3 py-3 transition-opacity duration-400"
              style={{ opacity: isDone ? 1 : isLoading ? 1 : 0.35 }}>

              {/* Icon area */}
              <div className="w-[20px] flex items-center justify-center shrink-0">
                {isLoading ? (
                  <SpinnerGap size={18} weight="bold" className="text-[#F97316] search-spin" />
                ) : isDone ? (
                  <Check size={18} weight="bold" className="text-[#22C55E] check-pop" />
                ) : (
                  <Icon size={18} weight="light" className="text-[#D4D4D4]" />
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                {isDone ? (
                  <>
                    <p className="font-matter text-[14.5px] text-[#555] font-medium fade-slide">{label}</p>
                    <p className="font-matter text-[12px] text-[#94A3B8] fade-slide">{desc}</p>
                  </>
                ) : isLoading ? (
                  <>
                    <p className="font-matter text-[14.5px] text-[#888] font-medium">{label}</p>
                    <p className="font-matter text-[12px] text-[#C4C4C4]">{desc}</p>
                  </>
                ) : (
                  <>
                    <p className="font-matter text-[14.5px] text-[#D4D4D4] font-medium">{label}</p>
                    <p className="font-matter text-[12px] text-[#E8E8E8]">{desc}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button type="button" onClick={onNext}
        className="w-full mt-12 py-4 rounded-full bg-[#0a0a0a] text-white font-matter text-[15px] font-semibold flex items-center justify-center gap-2.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all cursor-pointer">
        Let&apos;s Begin <ArrowRight size={16} weight="bold" />
      </button>
    </div>
  );
}
