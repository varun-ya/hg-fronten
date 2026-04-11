'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Trophy, CheckCircle, Sparkle, Confetti } from '@phosphor-icons/react';

interface Props { onNext: () => void; onBack: () => void; }

export default function AdminStepCongrats({ onNext, onBack }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <div className={`max-w-[520px] mx-auto px-8 py-16 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#FFFBEB] flex items-center justify-center">
          <Trophy size={24} weight="fill" className="text-[#F59E0B]" />
        </div>
        <div className="flex items-center gap-1">
          <Confetti size={16} weight="fill" className="text-[#F97316]" />
          <Confetti size={16} weight="fill" className="text-[#F97316]" style={{ transform: 'scaleX(-1)' }} />
        </div>
      </div>

      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">
        Congratulations!
      </h1>
      <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">
        You&apos;ve passed the qualification test and are now eligible to become a <span className="font-semibold text-[#0F172A]">HomeGuru Tutor</span>.
      </p>

      <div className="flex flex-col gap-3 mt-8">
        {[
          { icon: CheckCircle, text: 'Qualification challenge cleared', color: '#22C55E', bg: '#F0FDF4' },
          { icon: Sparkle, text: 'You are eligible to teach on HomeGuru', color: '#F59E0B', bg: '#FFFBEB' },
        ].map(({ icon: Icon, text, color, bg }) => (
          <div key={text} className="flex items-center gap-3 px-5 py-4 rounded-[14px] border border-[#F0F0F0]">
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Icon size={16} weight="fill" style={{ color }} />
            </div>
            <span className="font-matter text-[14px] text-[#1E293B]">{text}</span>
          </div>
        ))}
      </div>

      <p className="font-matter text-[13px] text-[#94A3B8] leading-[1.6] mt-6">
        Just a few more steps — complete the payment and verify your ID to go live and start getting students.
      </p>

      <div className="flex items-center justify-between mt-10">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" onClick={onNext}
          className="px-8 py-3 rounded-[12px] bg-[#0F172A] text-white font-matter text-[14px] font-semibold flex items-center gap-2 hover:bg-[#1E293B] active:scale-[0.99] transition-all cursor-pointer">
          Continue <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}




