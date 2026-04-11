'use client';
import React from 'react';

interface Props { onFinish: () => void; }

export default function Step8Submission({ onFinish }: Props) {
  return (
    <div className="py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>

      <h1 className="text-[32px] font-semibold text-[#111827]" style={{ fontFamily: 'Georgia, serif' }}>
        Challenge Submitted!
      </h1>
      <p className="text-[15px] text-[#6B7280] leading-[1.7] mt-4 max-w-[480px] mx-auto">
        Your solution has been submitted successfully. We will review your code and share results within 24–48 hours.
      </p>

      <div className="flex flex-col gap-2 mt-8 max-w-[300px] mx-auto">
        {['Code submitted', 'Screen recording saved', 'Session verified'].map((item) => (
          <div key={item} className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            <span className="text-[13px] text-[#166534]">{item}</span>
          </div>
        ))}
      </div>

      <button type="button" onClick={onFinish}
        className="mt-8 px-8 py-3 rounded-lg bg-[#111827] text-white text-[14px] font-medium hover:bg-[#1F2937] transition-colors cursor-pointer">
        Continue
      </button>
    </div>
  );
}
