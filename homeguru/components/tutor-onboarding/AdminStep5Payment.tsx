'use client';
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Check, SpinnerGap, ShieldCheck } from '@phosphor-icons/react';

interface Props { onNext: () => void; onBack: () => void; }

export default function AdminStep5Payment({ onNext, onBack }: Props) {
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setPaid(true); setTimeout(() => setShowSuccess(true), 200); }, 2500);
  };

  if (paid) return (
    <div className={`max-w-[520px] mx-auto px-8 py-16 transition-all duration-500 ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center">
        <CheckCircle size={28} weight="fill" className="text-[#22C55E]" />
      </div>
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-5">Payment Successful!</h1>
      <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">Your listing fee has been paid. Just one more step to go live!</p>
      <button type="button" onClick={onNext}
        className="mt-10 px-8 py-3 rounded-[12px] bg-[#0F172A] text-white font-matter text-[14px] font-semibold flex items-center gap-2 hover:bg-[#1E293B] active:scale-[0.99] transition-all cursor-pointer">
        Continue <ArrowRight size={15} weight="bold" />
      </button>
    </div>
  );

  return (
    <div className="max-w-[520px] mx-auto px-8 py-16">
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">Annual Listing Fee</h1>
      <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">Get your profile listed for <strong className="text-[#0F172A]">365 days</strong>. Renews every year to keep you visible to students across India.</p>

      <div className="relative overflow-hidden mt-10 rounded-[16px] px-8 py-8 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]" style={{ border: '1.5px solid rgba(0,0,0,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.12) 0%, transparent 55%)' }} />
        <div className="relative z-10 text-center">
          <span className="font-season text-[48px] font-normal text-[#0F172A] leading-none tracking-[-0.03em]">₹499</span>
          <p className="font-matter text-[13px] text-[#94A3B8] mt-1">per year &nbsp;·&nbsp; renews after 365 days</p>
        </div>

        <div className="relative z-10 flex flex-col gap-3 mt-8">
          {['Profile listed on HomeGuru', 'Visible to all students in your area', 'Access to teaching tools & dashboard', 'Priority support from our team'].map(item => (
            <div key={item} className="flex items-center gap-3">
              <Check size={14} weight="bold" className="text-[#22C55E] shrink-0" />
              <span className="font-matter text-[14px] text-[#475569]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <ShieldCheck size={14} className="text-[#22C55E]" />
        <span className="font-matter text-[12px] text-[#94A3B8]">Secure payment · 100% refundable within 7 days · renews annually at ₹499</span>
      </div>

      <div className="flex items-center justify-between mt-10">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" disabled={processing} onClick={handlePay}
          className="px-8 py-3 rounded-[12px] bg-[#0F172A] text-white font-matter text-[14px] font-semibold flex items-center gap-2 hover:bg-[#1E293B] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50">
          {processing ? <><SpinnerGap size={15} className="animate-spin" /> Processing...</> : 'Pay ₹499'}
        </button>
      </div>
    </div>
  );
}




