'use client';
import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';

interface Props { onGetStarted: () => void; onLogin: () => void; }

export default function AdminStepWelcome({ onGetStarted, onLogin }: Props) {
  return (
    <div className="max-w-[520px] mx-auto px-8 py-16 flex flex-col items-center min-h-[70vh] justify-center">
      <img src="/images/homeguru.png" alt="HomeGuru" className="h-[48px] w-auto object-contain mb-8" />

      <h1 className="font-season text-[36px] text-[#0F172A] leading-[1.1] tracking-[-0.03em] text-center">
        Become a <span className="text-[#F97316]">HomeGuru</span> Tutor
      </h1>
      <p className="font-matter text-[15px] text-[#94A3B8] leading-[1.6] mt-4 text-center">
        Teach students across India. Set your own schedule. Earn on your terms.
      </p>

      <div className="w-full mt-12 flex flex-col gap-3">
        <button type="button" onClick={onGetStarted}
          className="w-full py-4 rounded-full bg-[#F97316] text-white font-matter text-[15px] font-semibold flex items-center justify-center gap-2.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] active:scale-[0.98] transition-all cursor-pointer">
          Get Started <ArrowRight size={16} weight="bold" />
        </button>
        <button type="button" onClick={onLogin}
          className="w-full py-4 rounded-full bg-white text-[#0F172A] font-matter text-[15px] font-semibold flex items-center justify-center gap-2.5 border-2 border-[#E2E8F0] hover:border-[#CBD5E1] active:scale-[0.98] transition-all cursor-pointer">
          Log in
        </button>
      </div>
    </div>
  );
}
