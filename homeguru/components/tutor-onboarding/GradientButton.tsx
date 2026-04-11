'use client';
import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export default function GradientButton({ children, onClick, disabled = false, className = '', fullWidth = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded-full font-matter text-[14px] font-semibold cursor-pointer transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 py-3.5 ${
        fullWidth ? 'w-full' : 'px-8'
      } ${
        disabled
          ? 'bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed'
          : 'bg-white text-[#0a0a0a] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)]'
      } ${className}`}
      style={disabled ? {} : { border: '1.5px solid rgba(0,0,0,0.08)' }}
    >
      {!disabled && (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, rgba(249,115,22,0.08) 30%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 85% 100%, rgba(59,130,246,0.12) 0%, transparent 55%)' }} />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
