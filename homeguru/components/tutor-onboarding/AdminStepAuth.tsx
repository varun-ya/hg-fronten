'use client';
import React, { useState } from 'react';
import { ArrowRight, Eye, EyeSlash, CaretDown, Warning, CheckCircle, Envelope, Phone, Lock } from '@phosphor-icons/react';

interface Props { onNext: () => void; }

const COUNTRY_CODES = [
  { code: '+91', country: 'India' }, { code: '+1', country: 'United States' }, { code: '+44', country: 'United Kingdom' },
  { code: '+61', country: 'Australia' }, { code: '+971', country: 'UAE' }, { code: '+966', country: 'Saudi Arabia' },
  { code: '+65', country: 'Singapore' }, { code: '+60', country: 'Malaysia' }, { code: '+977', country: 'Nepal' },
  { code: '+94', country: 'Sri Lanka' }, { code: '+880', country: 'Bangladesh' }, { code: '+92', country: 'Pakistan' },
  { code: '+86', country: 'China' }, { code: '+81', country: 'Japan' }, { code: '+82', country: 'South Korea' },
  { code: '+49', country: 'Germany' }, { code: '+33', country: 'France' }, { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' }, { code: '+7', country: 'Russia' }, { code: '+55', country: 'Brazil' },
  { code: '+27', country: 'South Africa' }, { code: '+234', country: 'Nigeria' }, { code: '+254', country: 'Kenya' },
  { code: '+63', country: 'Philippines' }, { code: '+62', country: 'Indonesia' }, { code: '+66', country: 'Thailand' },
  { code: '+84', country: 'Vietnam' }, { code: '+52', country: 'Mexico' }, { code: '+54', country: 'Argentina' },
];

export default function AdminStepAuth({ onNext }: Props) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [codeOpen, setCodeOpen] = useState(false);
  const [codeSearch, setCodeSearch] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpOk, setOtpOk] = useState(false);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const emailValid = /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email.trim());
  const phoneDigits = phone.replace(/\D/g, '');
  const phoneValid = phoneDigits.length >= 7 && phoneDigits.length <= 15;
  const passValid = password.length >= 6;

  // Step logic: email → phone → password
  const phoneUnlocked = emailSent;
  const passUnlocked = otpOk;
  const canProceed = emailSent && otpOk && passValid;

  const handleSendEmailVerify = () => { if (emailValid) setEmailSent(true); };
  const handleSendOtp = () => { if (phoneValid) setOtpSent(true); };
  const handleVerifyOtp = () => { if (otp.replace(/\D/g, '').length >= 4) setOtpOk(true); };
  const handleContinue = () => {
    if (canProceed) { localStorage.setItem('tutorLoggedIn', 'true'); localStorage.setItem('tutorEmail', email); onNext(); }
  };

  const filteredCodes = codeSearch
    ? COUNTRY_CODES.filter(c => c.code.includes(codeSearch) || c.country.toLowerCase().includes(codeSearch.toLowerCase()))
    : COUNTRY_CODES;

  const sectionTitle = (icon: React.ReactNode, text: string, done: boolean, active: boolean, step: string) => (
    <div className="flex items-center gap-3 mb-3">
      <div className={`flex items-center gap-2 transition-all ${done ? 'text-[#22C55E]' : active ? 'text-[#0F172A]' : 'text-[#CBD5E1]'}`}>
        {done ? <CheckCircle size={14} weight="fill" className="text-[#22C55E]" /> : icon}
        <span className="font-matter text-[11px] font-semibold uppercase tracking-[0.1em]">{text}</span>
      </div>
      {!done && active && <span className="font-matter text-[10px] font-medium text-[#F97316] bg-[#FFF7ED] px-2 py-0.5 rounded-full">{step}</span>}
      <span className="flex-1 h-px bg-[#F0F0F0]" />
    </div>
  );

  return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      <style>{`input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 40px #fff inset!important;-webkit-text-fill-color:#0F172A!important;font-family:inherit!important;}`}</style>

      <p className="font-matter text-[12px] font-semibold text-[#F97316] uppercase tracking-[0.12em]">Tutor Onboarding</p>
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-3">
        Create your account
      </h1>
      <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">
        Takes a few seconds. No credit card needed.
      </p>

      {/* ── STEP 1: Email ── */}
      <div className="mt-10">
        {sectionTitle(<Envelope size={13} />, 'Email', emailSent, !emailSent, 'Step 1')}
        <div className={`flex items-center rounded-[12px] border overflow-hidden transition-all ${emailSent ? 'border-[#BBF7D0] bg-[#FAFFFE]' : 'border-[#E2E8F0] bg-white focus-within:border-[#0a0a0a] focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]'}`}>
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailSent(false); }}
            placeholder="ravi@example.com" autoComplete="off" disabled={emailSent}
            className="flex-1 px-4 py-3 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent disabled:text-[#64748B]" />
          <div className="w-px h-7 bg-[#E2E8F0]" />
          {emailSent ? (
            <span className="px-4 py-3 font-matter text-[12px] font-bold text-[#22C55E] shrink-0">✓ Verified</span>
          ) : (
            <button type="button" onClick={handleSendEmailVerify}
              className={`px-5 py-3 font-matter text-[12px] font-bold uppercase tracking-[0.05em] shrink-0 transition-all ${emailValid ? 'text-[#0F172A] cursor-pointer hover:text-[#475569]' : 'text-[#D4D4D4] cursor-not-allowed'}`}
              disabled={!emailValid}>
              Verify
            </button>
          )}
        </div>
        {emailSent && <p className="font-matter text-[11px] text-[#22C55E] mt-2 ml-1">Verification link sent — check your inbox</p>}
        {!emailSent && email && !emailValid && <p className="font-matter text-[11px] text-[#DC2626] mt-1.5 ml-1">Enter a valid email address</p>}
      </div>

      {/* ── STEP 2: Phone ── */}
      <div className={`mt-6 transition-all ${phoneUnlocked ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        {sectionTitle(<Phone size={13} />, 'Phone', otpOk, phoneUnlocked && !otpOk, 'Step 2')}
        <div className="flex gap-2">
          <div className="relative">
            <button type="button" onClick={() => setCodeOpen(o => !o)}
              className="h-[44px] px-3.5 rounded-[12px] border border-[#E2E8F0] bg-white flex items-center gap-1.5 font-matter text-[13px] font-medium text-[#0F172A] cursor-pointer hover:border-[#CBD5E1] transition-all">
              {countryCode}
              <CaretDown size={10} weight="bold" className="text-[#94A3B8]" />
            </button>
            {codeOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-[260px] bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#E2E8F0] z-50 overflow-hidden">
                <div className="px-3 py-2.5 border-b border-[#F0F0F0]">
                  <input type="text" value={codeSearch} onChange={e => setCodeSearch(e.target.value)}
                    placeholder="Search country or code"
                    className="w-full font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none" autoFocus />
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {filteredCodes.map(c => (
                    <button key={c.code} type="button" onMouseDown={() => { setCountryCode(c.code); setCodeOpen(false); setCodeSearch(''); }}
                      className={`w-full px-3.5 py-2.5 text-left font-matter text-[13px] cursor-pointer transition-colors hover:bg-[#F8FAFC] ${countryCode === c.code ? 'text-[#F97316] font-semibold bg-[#FFF7ED]' : 'text-[#475569]'}`}>
                      {c.country} &nbsp;{c.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={`flex-1 flex items-center rounded-[12px] border overflow-hidden transition-all ${otpOk ? 'border-[#BBF7D0] bg-[#FAFFFE]' : 'border-[#E2E8F0] bg-white focus-within:border-[#0a0a0a] focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]'}`}>
            <input type="tel" value={phone} onChange={e => { setPhone(e.target.value); setOtpSent(false); setOtpOk(false); setOtp(''); }}
              placeholder="98765 43210" disabled={otpOk} autoComplete="off"
              className="flex-1 px-4 py-3 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent disabled:text-[#64748B]" />
            <div className="w-px h-7 bg-[#E2E8F0]" />
            {otpOk ? (
              <span className="px-4 py-3 font-matter text-[12px] font-bold text-[#22C55E] shrink-0">✓</span>
            ) : (
              <button type="button" onClick={handleSendOtp}
                className={`px-5 py-3 font-matter text-[12px] font-bold uppercase tracking-[0.05em] shrink-0 transition-all ${phoneValid ? 'text-[#0F172A] cursor-pointer hover:text-[#475569]' : 'text-[#D4D4D4] cursor-not-allowed'}`}
                disabled={!phoneValid}>
                {otpSent ? 'Resend' : 'OTP'}
              </button>
            )}
          </div>
        </div>

        {otpSent && !otpOk && (
          <div className="flex items-center rounded-[12px] border border-[#E2E8F0] bg-white overflow-hidden mt-3 focus-within:border-[#0a0a0a] focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.04)] transition-all">
            <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter OTP from WhatsApp" maxLength={6} autoComplete="off" autoFocus
              className="flex-1 px-4 py-3 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent" />
            <div className="w-px h-7 bg-[#E2E8F0]" />
            <button type="button" onClick={handleVerifyOtp}
              className={`px-5 py-3 font-matter text-[12px] font-bold uppercase tracking-[0.05em] shrink-0 transition-all ${otp.replace(/\D/g, '').length >= 4 ? 'text-[#0F172A] cursor-pointer hover:text-[#475569]' : 'text-[#D4D4D4] cursor-not-allowed'}`}
              disabled={otp.replace(/\D/g, '').length < 4}>
              Verify
            </button>
          </div>
        )}
        {otpOk && <p className="font-matter text-[11px] font-semibold text-[#22C55E] mt-2 ml-1">Phone verified ✓</p>}
      </div>

      {/* ── STEP 3: Password ── */}
      <div className={`mt-6 transition-all ${passUnlocked ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        {sectionTitle(<Lock size={13} />, 'Password', passValid && passUnlocked, passUnlocked && !passValid, 'Step 3')}
        <div className={`relative flex items-center rounded-[12px] border overflow-hidden transition-all ${passValid ? 'border-[#BBF7D0] bg-[#FAFFFE]' : 'border-[#E2E8F0] bg-white focus-within:border-[#0a0a0a] focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]'}`}>
          <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Min 6 characters" autoComplete="new-password"
            className="flex-1 px-4 py-3 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent pr-12" />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] cursor-pointer hover:text-[#64748B] transition-colors">
            {showPw ? <EyeSlash size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {passUnlocked && password && !passValid && <p className="font-matter text-[11px] text-[#94A3B8] mt-1.5 ml-1">{password.length}/6 characters</p>}
        {passValid && <p className="font-matter text-[11px] text-[#22C55E] mt-1.5 ml-1">✓ Password set</p>}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between mt-12">
        <p className="font-matter text-[11px] text-[#CBD5E1] leading-[1.6] max-w-[200px]">
          By signing up you agree to our <a href="/terms-of-use" className="underline hover:text-[#94A3B8]">Terms</a> & <a href="/privacy-policy" className="underline hover:text-[#94A3B8]">Privacy</a>
        </p>
        <button type="button" onClick={handleContinue}
          className={`px-8 py-3 rounded-full font-matter text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${canProceed ? 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]' : 'bg-[#ddd] text-[#aaa] cursor-not-allowed'}`}>
          Continue <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}
