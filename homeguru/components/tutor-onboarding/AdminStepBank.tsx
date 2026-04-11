'use client';
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';

interface Props { onNext: () => void; onBack: () => void; }

export default function AdminStepBank({ onNext, onBack }: Props) {
  const [accName, setAccName] = useState('');
  const [accNo, setAccNo] = useState('');
  const [confirmAccNo, setConfirmAccNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [tried, setTried] = useState(false);

  const nameErr = accName.trim().length < 2 ? 'Required' : null;
  const numErr = accNo.trim().length < 8 ? 'Min 8 digits' : null;
  const confirmErr = !confirmAccNo ? 'Required' : confirmAccNo !== accNo ? 'Does not match' : null;
  const ifscErr = ifsc.trim().length !== 11 ? '11 characters' : null;

  const canProceed = !nameErr && !numErr && !confirmErr && !ifscErr;

  const handleContinue = () => {
    setTried(true);
    if (canProceed) onNext();
  };

  const inp = 'w-full px-4 py-3 rounded-[12px] font-matter text-[14px] text-[#0F172A] placeholder-[#CBD5E1] outline-none border border-[#E2E8F0] bg-white focus:border-[#0a0a0a] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)] transition-all';
  const label = 'font-matter text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em] mb-2 block';

  return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      <h1 className="font-season text-[28px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">Bank Account</h1>
      <p className="font-matter text-[14px] text-[#64748B] leading-[1.6] mt-2 mb-8">For receiving session payments.</p>

      <div className="flex flex-col gap-5">
        <div>
          <label className={label}>Account Holder Name</label>
          <input type="text" value={accName} onChange={e => setAccName(e.target.value)} placeholder="Account holder name" className={`${inp} ${tried && nameErr ? 'border-[#DC2626]' : ''}`} />
          {tried && nameErr && <p className="font-matter text-[11px] text-[#DC2626] mt-1">{nameErr}</p>}
        </div>

        <div>
          <label className={label}>Account Number</label>
          <input type="password" value={accNo} onChange={e => setAccNo(e.target.value.replace(/\D/g, '').slice(0, 18))} placeholder="Account number" className={`${inp} ${tried && numErr ? 'border-[#DC2626]' : ''}`} />
          {tried && numErr && <p className="font-matter text-[11px] text-[#DC2626] mt-1">{numErr}</p>}
        </div>

        <div>
          <label className={label}>Re-enter Account Number</label>
          <input type="text" value={confirmAccNo} onChange={e => setConfirmAccNo(e.target.value.replace(/\D/g, '').slice(0, 18))} placeholder="Re-enter account number" className={`${inp} ${tried && confirmErr ? 'border-[#DC2626]' : ''}`} />
          {tried && confirmErr && <p className="font-matter text-[11px] text-[#DC2626] mt-1">{confirmErr}</p>}
        </div>

        <div>
          <label className={label}>IFSC Code</label>
          <input type="text" value={ifsc} onChange={e => setIfsc(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11))} placeholder="e.g. SBIN0001234" className={`${inp} ${tried && ifscErr ? 'border-[#DC2626]' : ''}`} />
          {tried && ifscErr && <p className="font-matter text-[11px] text-[#DC2626] mt-1">{ifscErr}</p>}
        </div>

        <div className="px-4 py-3 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A]">
          <p className="font-matter text-[12px] text-[#92400E] leading-[1.6]">Your bank account details will be verified instantly. Payments for sessions will be credited to this account.</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-12">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" onClick={handleContinue}
          className={`px-8 py-3 rounded-full font-matter text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${canProceed ? 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]' : 'bg-[#ddd] text-[#aaa] cursor-not-allowed'}`}>
          Verify Account <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}
