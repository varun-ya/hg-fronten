'use client';
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ShieldCheck, SpinnerGap, CheckCircle } from '@phosphor-icons/react';

interface Props { onNext: () => void; onBack: () => void; }

export default function AdminStep2IDVerification({ onNext, onBack }: Props) {
  const [aadhaar, setAadhaar] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tried, setTried] = useState(false);

  const formatAadhaar = (v: string) => v.replace(/\D/g, '').slice(0, 12).replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  const aadhaarDigits = aadhaar.replace(/\s/g, '');
  const aadhaarErr = aadhaarDigits.length !== 12 ? '12 digits required' : null;

  const handleVerify = () => {
    setTried(true);
    if (aadhaarErr) return;
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setVerified(true); }, 2000);
  };

  const inputCls = 'w-full px-4 py-3 rounded-[12px] font-matter text-[14px] text-[#0F172A] placeholder-[#CBD5E1] outline-none border border-[#E2E8F0] bg-white focus:border-[#0a0a0a] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)] transition-all';

  if (verified) {
    return (
      <div className="max-w-[520px] mx-auto px-8 py-14">
        <div className="flex flex-col items-center text-center mt-8">
          <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center">
            <CheckCircle size={32} weight="fill" className="text-[#22C55E]" />
          </div>
          <h1 className="font-season text-[28px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-5">Identity Verified!</h1>
          <p className="font-matter text-[14px] text-[#64748B] leading-[1.6] mt-3">Your Aadhaar and PAN card have been verified successfully via DigiLocker.</p>
        </div>

        <div className="flex flex-col gap-2.5 mt-8">
          {['Aadhaar verified', 'PAN card fetched', 'Identity confirmed'].map(item => (
            <div key={item} className="flex items-center gap-3 px-5 py-3 rounded-[12px] border border-[#F0F0F0]">
              <CheckCircle size={16} weight="fill" className="text-[#22C55E] shrink-0" />
              <span className="font-matter text-[14px] text-[#1E293B]">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-12">
          <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
            <ArrowLeft size={14} /> Back
          </button>
          <button type="button" onClick={onNext}
            className="px-8 py-3 rounded-full font-matter text-[14px] font-semibold flex items-center gap-2 bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97] transition-all cursor-pointer">
            Continue <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      <h1 className="font-season text-[28px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">Identity Verification</h1>
      <p className="font-matter text-[14px] text-[#64748B] leading-[1.6] mt-2 mb-8">Verify your identity via DigiLocker to keep our platform safe.</p>

      {/* DigiLocker info */}
      <div className="rounded-[14px] px-5 py-4 bg-[#F8FAFC] border border-[#E2E8F0] mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-[#3B82F6] shrink-0" />
          <div>
            <p className="font-matter text-[13px] font-semibold text-[#0F172A]">DigiLocker Verification</p>
            <p className="font-matter text-[11px] text-[#94A3B8]">Aadhaar-based identity check</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex flex-col gap-1.5">
          {['Instant verification via DigiLocker', 'Your data is encrypted & secure', 'No physical documents needed'].map(t => (
            <div key={t} className="flex items-center gap-2">
              <CheckCircle size={12} weight="fill" className="text-[#22C55E] shrink-0" />
              <span className="font-matter text-[12px] text-[#64748B]">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aadhaar input */}
      <div>
        <label className="font-matter text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em] mb-2 block">Aadhaar Number</label>
        <input
          type="text"
          value={aadhaar}
          onChange={e => setAadhaar(formatAadhaar(e.target.value))}
          placeholder="XXXX XXXX XXXX"
          className={`${inputCls} ${tried && aadhaarErr ? 'border-[#DC2626]' : ''}`}
        />
        {tried && aadhaarErr && <p className="font-matter text-[11px] text-[#DC2626] mt-1">{aadhaarErr}</p>}
      </div>

      <div className="flex items-center justify-between mt-12">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" onClick={handleVerify} disabled={verifying}
          className={`px-8 py-3 rounded-full font-matter text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${aadhaarDigits.length === 12 && !verifying ? 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]' : 'bg-[#ddd] text-[#aaa] cursor-not-allowed'}`}>
          {verifying ? <><SpinnerGap size={15} className="animate-spin" /> Verifying...</> : <>Verify with DigiLocker <ArrowRight size={15} weight="bold" /></>}
        </button>
      </div>
    </div>
  );
}
