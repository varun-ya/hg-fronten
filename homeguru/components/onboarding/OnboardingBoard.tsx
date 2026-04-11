'use client';
import React, { useState } from 'react';
import { BOARDS, classesForBoard } from './stepData';

interface Props { onSubmit: () => void; onBack: () => void; }

export default function OnboardingBoard({ onSubmit, onBack }: Props) {
  const [board, setBoard] = useState<number | null>(null);
  const [cls, setCls] = useState<number | null>(null);
  const [school, setSchool] = useState('');
  const classes = board !== null ? classesForBoard(board) : [];
  const ok = board !== null && cls !== null;

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="pt-7 px-7 text-center">
        <h1 className="font-season text-[22px] text-[#1A1A1A] font-bold">Your school details</h1>
        <p className="font-matter text-[13px] text-[#6B7280] mt-1.5">So we can match the right syllabus.</p>
      </div>

      <div className="flex-1 overflow-y-auto w-full mt-6">
        {/* Board */}
        <div className="px-6 mb-2.5">
          <span className="font-matter text-[11px] font-bold text-[#9CA3AF] tracking-[1px]">BOARD</span>
        </div>
        <div className="flex gap-2 px-6 overflow-x-auto pb-2 scrollbar-hide">
          {BOARDS.map((b, i) => {
            const on = board === i;
            return (
              <button key={b} type="button" onClick={() => { setBoard(i); setCls(null); }}
                className={`relative overflow-hidden px-5 py-2.5 rounded-[12px] font-matter text-[14px] whitespace-nowrap cursor-pointer transition-all duration-200 active:scale-[0.97] shrink-0 ${on ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] font-semibold text-[#0a0a0a]' : 'bg-white text-[#1A1A1A]'}`}
                style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid #E5E7EB' }}>
                {on && (
                  <>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                  </>
                )}
                <span className="relative z-10">{b}</span>
              </button>
            );
          })}
        </div>

        {/* Class */}
        {board !== null ? (
          <>
            <div className="px-6 mt-5 mb-2.5">
              <span className="font-matter text-[11px] font-bold text-[#9CA3AF] tracking-[1px]">CLASS</span>
            </div>
            <div className="grid grid-cols-4 gap-2 px-6">
              {classes.map((c, i) => {
                const on = cls === i;
                return (
                  <button key={c} type="button" onClick={() => setCls(i)}
                    className={`relative overflow-hidden py-3 rounded-[12px] font-matter text-[14px] text-center cursor-pointer transition-all duration-200 active:scale-[0.97] ${on ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] font-bold text-[#0a0a0a]' : 'bg-white text-[#1A1A1A]'}`}
                    style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid #E5E7EB' }}>
                    {on && (
                      <>
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                      </>
                    )}
                    <span className="relative z-10">{c}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center py-16">
            <span className="font-matter text-[14px] text-[#9CA3AF]">Pick a board first</span>
          </div>
        )}

        {/* School name */}
        <div className="px-6 mt-4">
          <input type="text" value={school} onChange={e => setSchool(e.target.value)} placeholder="School name (optional)"
            className="w-full px-[18px] py-[14px] rounded-[14px] border border-[#E5E7EB] bg-white font-matter text-[14px] text-[#1A1A1A] placeholder-[#9CA3AF] outline-none" />
        </div>
      </div>

      {/* Submit */}
      <div className="w-full px-6 pb-5 pt-2 space-y-2">
        <button type="button" onClick={ok ? onSubmit : undefined}
          className="w-full py-4 rounded-full font-matter text-[16px] font-bold text-white transition-all active:scale-[0.97] cursor-pointer"
          style={{ background: '#0a0a0a', opacity: ok ? 1 : 0.35, boxShadow: '0 4px 0 rgba(0,0,0,0.15)' }}>
          Let&apos;s Go!
        </button>
        <button type="button" onClick={onBack} className="w-full font-matter text-[11px] text-[#999] hover:text-[#555] cursor-pointer text-center">Back</button>
      </div>
    </div>
  );
}
