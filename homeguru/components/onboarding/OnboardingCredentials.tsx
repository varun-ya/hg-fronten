'use client';
import React, { useState } from 'react';
import { Eye, EyeSlash, CaretDown, MagnifyingGlass, CheckCircle } from '@phosphor-icons/react';
import { COUNTRY_CODES } from './stepData';

const Field = ({ children, error }: { children: React.ReactNode; error?: boolean }) => (
  <div className={`flex items-center gap-2 px-4 h-[52px] rounded-[14px] bg-white transition-all ${error ? 'border-[1.5px] border-[#EF4444]' : 'border border-[#E2E8F0] focus-within:border-[#0F172A] focus-within:shadow-[0_0_0_3px_rgba(15,23,42,0.06)]'}`}>
    {children}
  </div>
);

interface Props { onNext: () => void; }

export default function OnboardingCredentials({ onNext }: Props) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [otp, setOtp] = useState('');
  const [code, setCode] = useState('+91');
  const [hide, setHide] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otpOk, setOtpOk] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [tried, setTried] = useState(false);
  const [showCodePicker, setShowCodePicker] = useState(false);
  const [codeQuery, setCodeQuery] = useState('');

  const emailOk = /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email.trim());
  const phoneOk = phone.replace(/\D/g, '').length >= 7;
  const passOk = pass.length >= 6;
  const canProceed = emailOk && phoneOk && passOk && otpOk;

  const sendOtp = () => { if (!phoneOk) return; setOtpSent(true); };
  const verifyOtp = () => { if (otp.trim().length >= 4) setOtpOk(true); };
  const sendEmailLink = () => { if (!emailOk) return; setEmailSent(true); };
  const handleContinue = () => { setTried(true); if (canProceed) onNext(); };

  const filteredCodes = codeQuery
    ? COUNTRY_CODES.filter(([c, n]) => c.includes(codeQuery) || n.toLowerCase().includes(codeQuery.toLowerCase()))
    : COUNTRY_CODES;

  const inp = 'flex-1 px-0 py-0 font-matter text-[14px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent';

  return (
    <div className="flex flex-col w-full h-full">

      {/* Header */}
      <div className="pt-8 px-7 pb-2">
        <h1 className="font-season text-[26px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">Create your account</h1>
        <p className="font-matter text-[13px] text-[#94A3B8] mt-1.5">Takes a few seconds. No credit card.</p>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-2 space-y-4">

        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-matter text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] pl-1 block">Email</label>
          <Field error={tried && !emailOk}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" className={inp} />
            {emailOk && !emailSent && (
              <button type="button" onClick={sendEmailLink}
                className="shrink-0 px-3 py-1.5 rounded-full bg-[#0F172A] text-white font-matter text-[11px] font-semibold cursor-pointer">
                Verify
              </button>
            )}
            {emailSent && <CheckCircle size={18} weight="fill" className="text-[#22C55E] shrink-0" />}
          </Field>
          {emailSent && (
            <p className="font-matter text-[11px] text-[#22C55E] pl-1 flex items-center gap-1">
              <CheckCircle size={11} weight="fill" /> Check inbox for verification link
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="font-matter text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] pl-1 block">Phone</label>
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowCodePicker(true)}
              className="flex items-center gap-1.5 px-3.5 h-[52px] rounded-[14px] border border-[#E2E8F0] bg-white font-matter text-[14px] font-medium text-[#0F172A] cursor-pointer shrink-0 hover:border-[#0F172A] transition-colors">
              {code} <CaretDown size={10} className="text-[#94A3B8]" />
            </button>
            <Field error={tried && !phoneOk}>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="Phone number" disabled={otpOk} className={inp} />
              {!otpOk && phoneOk && (
                <button type="button" onClick={sendOtp}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-[#0F172A] text-white font-matter text-[11px] font-semibold cursor-pointer">
                  {otpSent ? 'Resend' : 'OTP'}
                </button>
              )}
              {otpOk && <CheckCircle size={18} weight="fill" className="text-[#22C55E] shrink-0" />}
            </Field>
          </div>
        </div>

        {/* OTP */}
        {otpSent && !otpOk && (
          <div className="space-y-1.5">
            <label className="font-matter text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] pl-1 block">OTP</label>
            <Field>
              <input type="text" inputMode="numeric" value={otp} onChange={e => setOtp(e.target.value)}
                placeholder="Enter OTP from WhatsApp" className={inp} />
              <button type="button" onClick={verifyOtp}
                className="shrink-0 px-3 py-1.5 rounded-full bg-[#22C55E] text-white font-matter text-[11px] font-semibold cursor-pointer">
                Verify
              </button>
            </Field>
          </div>
        )}

        {otpOk && (
          <p className="font-matter text-[11px] text-[#22C55E] pl-1 flex items-center gap-1">
            <CheckCircle size={11} weight="fill" /> Phone verified
          </p>
        )}

        {/* Password */}
        <div className="space-y-1.5">
          <label className="font-matter text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] pl-1 block">Password</label>
          <Field error={tried && !passOk}>
            <input type={hide ? 'password' : 'text'} value={pass} onChange={e => setPass(e.target.value)}
              placeholder="Min 6 characters" className={inp} />
            <button type="button" onClick={() => setHide(!hide)} className="shrink-0 text-[#CBD5E1] hover:text-[#94A3B8] cursor-pointer transition-colors">
              {hide ? <EyeSlash size={16} /> : <Eye size={16} />}
            </button>
          </Field>
          {pass.length > 0 && (
            <div className="flex gap-1 pl-1">
              {[1,2,3].map(i => (
                <div key={i} className={`h-[3px] flex-1 rounded-full transition-all ${pass.length >= i * 3 ? i === 1 ? 'bg-[#EF4444]' : i === 2 ? 'bg-[#F97316]' : 'bg-[#22C55E]' : 'bg-[#F1F5F9]'}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Continue */}
      <div className="px-6 pb-6 pt-3">
        <button type="button" onClick={handleContinue}
          className="w-full py-4 rounded-full font-matter text-[15px] font-bold text-white transition-all active:scale-[0.97] cursor-pointer hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
          style={{ background: '#0a0a0a', opacity: canProceed ? 1 : 0.4 }}>
          Continue
        </button>
      </div>

      {/* Country Code Picker */}
      {showCodePicker && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={() => { setShowCodePicker(false); setCodeQuery(''); }}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          <div className="relative bg-white w-full max-w-[440px] rounded-t-[24px] md:rounded-[24px] max-h-[60vh] flex flex-col" onClick={e => e.stopPropagation()}
            style={{ boxShadow: '0 -4px 40px rgba(0,0,0,0.1)' }}>
            <div className="flex justify-center pt-3 pb-2"><div className="w-10 h-1 rounded-full bg-[#E2E8F0]" /></div>
            <div className="px-5 pb-3">
              <div className="flex items-center gap-2 px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0]">
                <MagnifyingGlass size={14} className="text-[#94A3B8] shrink-0" />
                <input type="text" value={codeQuery} onChange={e => setCodeQuery(e.target.value)} autoFocus
                  placeholder="Search country or code" className="flex-1 font-matter text-[14px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-4">
              {filteredCodes.map(([c, name]) => (
                <button key={c} type="button" onClick={() => { setCode(c); setShowCodePicker(false); setCodeQuery(''); }}
                  className="w-full px-5 py-3 text-left font-matter text-[14px] text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer transition-colors flex items-center justify-between">
                  <span>{name}</span>
                  <span className="text-[#94A3B8] text-[13px]">{c}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
