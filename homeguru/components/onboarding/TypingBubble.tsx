'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Props { text: string; }

export default function TypingBubble({ text }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const charIndex = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleNext = useCallback(() => {
    if (charIndex.current >= text.length) { setDone(true); return; }
    const char = text[charIndex.current];
    let ms = 40;
    if ('.!?'.includes(char)) ms = 280;
    else if (char === ',') ms = 160;
    else if (char === ' ') ms = 25;
    else if (char === '\n') ms = 200;

    timer.current = setTimeout(() => {
      charIndex.current++;
      setDisplayed(text.substring(0, charIndex.current));
      scheduleNext();
    }, ms);
  }, [text]);

  useEffect(() => {
    charIndex.current = 0;
    setDisplayed('');
    setDone(false);
    setVisible(false);
    const t = setTimeout(() => { setVisible(true); scheduleNext(); }, 400);
    return () => { clearTimeout(t); if (timer.current) clearTimeout(timer.current); };
  }, [text, scheduleNext]);

  const skipToEnd = () => {
    if (timer.current) clearTimeout(timer.current);
    setDisplayed(text);
    charIndex.current = text.length;
    setDone(true);
  };

  return (
    <div onClick={done ? undefined : skipToEnd}
      className="w-full flex gap-2.5 items-start cursor-pointer transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)' }}>
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-[#FFF7ED] to-[#FEF3C7]"
        style={{ border: '1.5px solid rgba(249,115,22,0.12)', boxShadow: '0 2px 8px rgba(249,115,22,0.1)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-2 13.5v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h-4zm5.5-5c0 .28-.22.5-.5.5h-1v1.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V12h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1V9.5c0-.28.22-.5.5-.5s.5.22.5.5V11h1c.28 0 .5.22.5.5zM9 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#F97316"/></svg>
      </div>
      {/* Bubble */}
      <div className="flex-1 px-4 py-3 bg-white rounded-tl-[4px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[18px]"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)' }}>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-matter text-[11px] font-bold text-[#F97316]">Hoot</span>
          {!done && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#22C55E]/8 font-matter text-[8px] font-semibold text-[#22C55E] tracking-wide uppercase">
              <span className="w-1 h-1 rounded-full bg-[#22C55E] animate-pulse" />
              typing
            </span>
          )}
        </div>
        <p className="font-matter text-[13px] text-[#333] leading-[1.5]">
          {displayed}
          {!done && <span className="inline-block w-[2px] h-[13px] bg-[#F97316] rounded-sm ml-0.5 align-middle animate-pulse" />}
        </p>
      </div>
    </div>
  );
}
