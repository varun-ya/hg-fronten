                    'use client';
import React, { useState } from 'react';

interface Props { onAllChecked: (done: boolean) => void; }

export default function Step2Guidelines({ onAllChecked }: Props) {
  const [agreed, setAgreed] = useState(false);

  const toggle = () => {
    setAgreed(!agreed);
    onAllChecked(!agreed);
  };

  return (
    <div>
      <h1 className="text-[32px] font-semibold text-[#111827] leading-[1.2]" style={{ fontFamily: 'Georgia, serif' }}>
        Important Reminders
      </h1>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-[16px] font-bold text-[#111827]">During the Challenge</h3>
          <ul className="mt-3 space-y-2 pl-6">
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Stay in fullscreen mode throughout the test.</li>
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Do not switch tabs or open other applications. Tab switches are monitored.</li>
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Keep your face visible in the camera at all times.</li>
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Do not use any external resources, notes, or assistance.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[16px] font-bold text-[#111827]">Code Submission</h3>
          <ul className="mt-3 space-y-2 pl-6">
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Your code is auto-saved as you type.</li>
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Click &quot;Submit&quot; when you are done or the timer will auto-submit.</li>
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">You can run test cases before submitting.</li>
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Do not modify the boilerplate code marked with &quot;DO NOT CHANGE&quot;.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[16px] font-bold text-[#111827]">Scoring</h3>
          <ul className="mt-3 space-y-2 pl-6">
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">You will be evaluated on correctness, efficiency, and code quality.</li>
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Partial solutions are accepted — write as much as you can.</li>
            <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Results will be shared within 24–48 hours.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
        <label className="flex items-start gap-3 cursor-pointer" onClick={toggle}>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${agreed ? 'bg-[#111827] border-[#111827]' : 'border-[#D1D5DB] bg-white'}`}>
            {agreed && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
          </div>
          <span className="text-[14px] text-[#374151] leading-[1.6]">
            I have read and understood all the instructions and guidelines. I agree to follow the rules during the challenge.
          </span>
        </label>
      </div>
    </div>
  );
}
