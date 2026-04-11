'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, CheckCircle, Confetti } from '@phosphor-icons/react';

interface Props { onBack: () => void; }

export default function AdminStep6GoLive({ onBack }: Props) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  const handleGoLive = () => {
    console.log('=== ONBOARDING COMPLETE ===');
    localStorage.setItem('admin_onboarding_complete', 'true'); 
    localStorage.setItem('profile_incomplete', 'true');
    localStorage.removeItem('tutor_onboarding_step');
    console.log('Set flags:', {
      admin_onboarding_complete: localStorage.getItem('admin_onboarding_complete'),
      profile_incomplete: localStorage.getItem('profile_incomplete')
    });
    console.log('Redirecting to: http://localhost:3001/profile');
    
    // Show alert before redirect
    alert('Please complete your profile (upload introduction video and other details) before accessing the dashboard.');
    
    // Force redirect to profile page on port 3001
    window.location.replace('http://localhost:3001/profile'); 
  };

  return (
    <div className={`max-w-[520px] mx-auto px-8 py-16 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center gap-3 mb-6">
        <Confetti size={28} weight="fill" className="text-[#F97316]" />
      </div>

      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">
        You&apos;re ready to <span className="text-[#F97316]">go live!</span>
      </h1>
      <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">
        Your profile is all set. Students can now discover you and book sessions. Welcome to HomeGuru!
      </p>

      <div className="flex flex-col gap-3 mt-8">
        {['Subjects & skills added', 'Qualification challenge passed', 'Listing fee paid', 'ID verified'].map(label => (
          <div key={label} className="flex items-center gap-3 px-5 py-3.5 rounded-[14px] border border-[#F0F0F0]">
            <CheckCircle size={18} weight="fill" className="text-[#22C55E] shrink-0" />
            <span className="font-matter text-[14px] text-[#1E293B]">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-12">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" onClick={handleGoLive}
          className="px-8 py-3 rounded-full font-matter text-[14px] font-semibold flex items-center gap-2 text-white bg-[#0a0a0a] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97] transition-all cursor-pointer">
          Go to Dashboard <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}




