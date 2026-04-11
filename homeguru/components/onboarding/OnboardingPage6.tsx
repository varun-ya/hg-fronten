'use client';
import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import OwlAnimation from '@/components/animations/OwlAnimation';

interface Props { onNext: () => void; onBack: () => void; }

export default function OnboardingPage6({ onNext, onBack }: Props) {
  return (
    <div className="flex flex-col items-center w-full h-full px-7">

      {/* Owl */}
      <div className="pt-8 flex justify-center">
        <div className="scale-[1.15]"><OwlAnimation /></div>
      </div>

      {/* Big number — the hero */}
      <div className="flex-1 flex flex-col justify-center w-full">
        <p className="font-matter text-[11px] font-bold text-[#F59E0B] uppercase tracking-[0.14em] mb-4">Your unfair advantage</p>

        <h1 className="font-season leading-[1.0] tracking-[-0.03em] text-[#0F172A]" style={{ fontSize: 38 }}>
          Your teacher never had<br />
          <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>a tutor. You will.</span>
        </h1>

        <p className="font-matter text-[13px] text-[#94A3B8] leading-[1.7] mt-4 max-w-[260px]">
          200+ studies show 1-on-1 tutoring is the most powerful learning method ever studied.
        </p>

        {/* Minimal stats */}
        <div className="flex items-center gap-6 mt-8">
          {[['50K+', 'students'], ['4.9★', 'rating'], ['800+', 'tutors']].map(([v, l]) => (
            <div key={l}>
              <p className="font-season text-[20px] text-[#0F172A] leading-none tracking-[-0.02em]">{v}</p>
              <p className="font-matter text-[10px] text-[#94A3B8] mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full pb-6 pt-2 space-y-2.5">
        <button type="button" onClick={onNext}
          className="group w-full py-[14px] rounded-full font-matter text-[15px] font-bold text-white transition-all active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
          style={{ background: '#0a0a0a' }}>
          Let&apos;s go <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <button type="button" onClick={onBack}
          className="w-full font-matter text-[12px] text-[#bbb] hover:text-[#888] cursor-pointer text-center py-1 transition-colors">
          Back
        </button>
      </div>
    </div>
  );
}
