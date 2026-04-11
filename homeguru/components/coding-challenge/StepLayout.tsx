'use client';
import React from 'react';

interface Props {
  step: number;
  totalSteps: number;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  onExit?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideBack?: boolean;
  hideNext?: boolean;
  envProgress?: number;
}

export default function StepLayout({ step, totalSteps, children, onNext, onBack, onExit, nextLabel = 'Next', nextDisabled = false, hideBack = false, hideNext = false, envProgress }: Props) {
  return (
    <div className="h-screen flex flex-col bg-[#F9FAFB]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#E5E7EB] shrink-0">
        <span className="text-[20px] font-bold text-[#111827] tracking-[0.15em] uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>
          HOME<span className="text-[#F97316]">GURU</span>
        </span>
        <button type="button" onClick={onExit} className="text-[14px] text-[#111827] underline underline-offset-2 hover:text-[#F97316] transition-colors cursor-pointer">
          Exit and go back to Challenges page
        </button>
      </nav>

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center px-6 py-6 overflow-y-auto">
        <div className="w-full max-w-[960px] bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
          {/* Env progress bar inside card top */}
          {envProgress !== undefined && (
            <div className="flex items-center justify-end gap-3 px-8 pt-6">
              <span className="text-[14px] text-[#111827]">
                Environment setup: <strong>{envProgress >= 100 ? 'Ready to start!' : 'Loading...'}</strong>
              </span>
              <div className="w-[250px] h-[8px] rounded-full bg-[#E5E7EB] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${envProgress}%`, background: envProgress >= 100 ? '#111827' : '#111827' }} />
              </div>
            </div>
          )}
          <div className="px-8 py-10">
            {children}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-8 py-4 bg-white border-t border-[#E5E7EB] shrink-0">
        <div className="w-[120px]">
          {!hideBack && onBack && (
            <button type="button" onClick={onBack}
              className="px-5 py-2.5 rounded-lg border border-[#D1D5DB] text-[14px] font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors cursor-pointer">
              Back
            </button>
          )}
        </div>
        <span className="text-[14px] text-[#6B7280]">{step} / {totalSteps}</span>
        <div className="w-[200px] flex justify-end">
          {!hideNext && onNext && (
            <button type="button" onClick={onNext} disabled={nextDisabled}
              className={`px-6 py-2.5 rounded-lg text-[14px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                nextDisabled
                  ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-[#111827] text-white hover:bg-[#1F2937]'
              }`}>
              {nextLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
