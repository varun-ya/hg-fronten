'use client';
import React from 'react';
import { ArrowRight, SignIn } from '@phosphor-icons/react';
import OwlAnimation from '@/components/animations/OwlAnimation';

interface Props { onNext: () => void; onLogin?: () => void; }

export default function OnboardingPage1({ onNext, onLogin }: Props) {
  return (
    <div className="flex flex-col items-center w-full h-full relative overflow-hidden bg-gradient-to-b from-white via-[#FAFAFA] to-white">

      {/* Refined gradient accents */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 60%)' }} className="absolute inset-0" />
        <div style={{ background: 'radial-gradient(ellipse 40% 30% at 0% 100%, rgba(139,92,246,0.05) 0%, transparent 50%)' }} className="absolute inset-0" />
      </div>

      {/* Logo + badge */}
      <div className="pt-12 flex flex-col items-center gap-4 relative z-10">
        <img src="/images/homeguru.png" alt="HomeGuru" className="h-[32px] w-auto object-contain" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF7ED] to-[#FFFBF5] border border-[#F97316]/20 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
          <span className="font-matter text-[11px] font-semibold text-[#92400E] tracking-[0.08em]">INDIA'S #1 HOME TUTORING</span>
        </div>
      </div>

      {/* Heading */}
      <div className="mt-8 text-center relative z-10 px-6">
        <h1 className="font-season text-[44px] text-[#0F172A] leading-[1.1] tracking-[-0.03em]">
          I want to
        </h1>
        <h1 className="font-season text-[44px] leading-[1.1] tracking-[-0.03em] bg-clip-text text-transparent mt-1"
          style={{ backgroundImage: 'linear-gradient(135deg, #0F172A 0%, #F97316 100%)' }}>
          Learn
        </h1>
        <p className="font-matter text-[14px] text-[#64748B] leading-[1.6] mt-4 max-w-[280px] mx-auto">
          Personalized 1-on-1 sessions with verified tutors, online.
        </p>
      </div>

      {/* Mascot */}
      <div className="flex-1 flex items-center justify-center relative z-10 py-6">
        <div className="scale-[1.5]">
          <OwlAnimation />
        </div>
      </div>

      {/* Social proof - Refined */}
      <div className="w-full px-6 mb-6 relative z-10">
        <div className="flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl py-4 px-5 border border-[#F0F0F0] shadow-sm">
          {/* Avatar stack */}
          <div className="flex items-center">
            {['#F97316','#8B5CF6','#3B82F6','#22C55E'].map((color, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[11px] font-bold shadow-sm" style={{ background: color, marginLeft: i === 0 ? 0 : -10, zIndex: 4 - i }}>
                {['R','P','A','S'][i]}
              </div>
            ))}
          </div>
          <div>
            <p className="font-matter text-[13px] font-semibold text-[#0F172A] leading-[1.3]">12,000+ students</p>
            <div className="flex items-center gap-1 mt-0.5">
              {[1,2,3,4,5].map(s => <span key={s} className="text-[#F97316] text-[11px]">★</span>)}
              <span className="font-matter text-[11px] text-[#64748B] ml-1 font-medium">4.9 (2.4K reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full px-6 pb-8 space-y-3 relative z-10">
        <button type="button" onClick={onNext}
          className="group w-full py-4 rounded-full font-matter text-[16px] font-semibold text-white transition-all active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] bg-[#0F172A]">
          Get Started
          <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </button>
        <button type="button" onClick={onLogin}
          className="w-full py-4 rounded-full font-matter text-[15px] font-medium text-[#475569] transition-all active:scale-[0.97] cursor-pointer bg-white flex items-center justify-center gap-2 hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
          <SignIn size={16} weight="regular" />
          Log in
        </button>
        <p className="font-matter text-[11px] text-[#94A3B8] text-center pt-2">
          Powered by <span className="text-[#64748B] font-semibold">Osmium AI</span>
        </p>
      </div>
    </div>
  );
}
