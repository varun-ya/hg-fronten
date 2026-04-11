'use client';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface Props { onSubmit: () => void; timer: string; timerSeconds: number; }

const DEFAULT_CODE = `from typing import List

def solution(n: int) -> int:
    # write your solution here
    return -1

# R E A D M E
# DO NOT CHANGE the code below, we use it to grade your submission.
# If changed your submission will be failed automatically.
if __name__ == '__main__':
    n = int(input())
    print(solution(n))`;

export default function Step7IDE({ onSubmit, timer, timerSeconds }: Props) {
  const [code, setCode] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('challenge_code') || DEFAULT_CODE;
    return DEFAULT_CODE;
  });
  const [showResults, setShowResults] = useState(false);
  const [showWarning, setShowWarning] = useState('');
  const [leftWidth, setLeftWidth] = useState(38);
  const dragging = useRef(false);

  // Webcam PiP
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipRef = useRef<HTMLDivElement>(null);
  const pipDrag = useRef(false);
  const pipOffset = useRef({ x: 0, y: 0 });
  const [pipPos, setPipPos] = useState({ x: -1, y: -1 });
  const [camError, setCamError] = useState(false);
  const [pipMinimized, setPipMinimized] = useState(false);

  useEffect(() => {
    if (pipPos.x === -1 && typeof window !== 'undefined') {
      setPipPos({ x: window.innerWidth - 180, y: window.innerHeight - 140 });
    }
  }, [pipPos.x]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 160, height: 120, facingMode: 'user' }, audio: false });
        if (videoRef.current) { videoRef.current.srcObject = stream; }
      } catch { setCamError(true); }
    })();
    return () => { stream?.getTracks().forEach(t => t.stop()); };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!pipDrag.current) return;
      setPipPos({ x: e.clientX - pipOffset.current.x, y: e.clientY - pipOffset.current.y });
    };
    const up = () => { pipDrag.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  const onPipMouseDown = (e: React.MouseEvent) => {
    pipDrag.current = true;
    const rect = pipRef.current?.getBoundingClientRect();
    pipOffset.current = { x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) };
  };

  useEffect(() => { localStorage.setItem('challenge_code', code); }, [code]);

  // Tab switch detection
  useEffect(() => {
    let count = 0;
    const handler = () => {
      if (document.hidden) {
        count++;
        setShowWarning(count >= 3 ? 'FINAL WARNING: Test will be terminated on next switch.' : `Tab switch detected! Warning ${count}/3`);
        setTimeout(() => setShowWarning(''), 4000);
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  // Disable right-click + paste
  useEffect(() => {
    const ctx = (e: MouseEvent) => e.preventDefault();
    const paste = (e: ClipboardEvent) => { setShowWarning('Pasting from external sources is restricted.'); setTimeout(() => setShowWarning(''), 3000); e.preventDefault(); };
    document.addEventListener('contextmenu', ctx);
    document.addEventListener('paste', paste);
    return () => { document.removeEventListener('contextmenu', ctx); document.removeEventListener('paste', paste); };
  }, []);

  // Resizable
  const handleMouseDown = () => { dragging.current = true; };
  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging.current) setLeftWidth(Math.min(55, Math.max(25, (e.clientX / window.innerWidth) * 100))); };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  const isLow = timerSeconds < 300;

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA] select-none font-matter">
      {/* Warning toast */}
      {showWarning && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-full bg-[#DC2626] text-white text-[12px] font-semibold shadow-[0_4px_20px_rgba(220,38,38,0.3)]" style={{ animation: 'toastIn 0.3s ease' }}>
          {showWarning}
        </div>
      )}
      <style>{`@keyframes toastIn { from { opacity:0; transform:translate(-50%,-12px); } to { opacity:1; transform:translate(-50%,0); } }`}</style>

      {/* Webcam PiP */}
      {!camError && pipPos.x !== -1 && (
        <div ref={pipRef}
          onMouseDown={onPipMouseDown}
          className="fixed z-[90] group"
          style={{ left: pipPos.x, top: pipPos.y, cursor: pipDrag.current ? 'grabbing' : 'grab' }}>
          {pipMinimized ? (
            <button type="button" onClick={() => setPipMinimized(false)}
              className="w-9 h-9 rounded-full bg-[#0a0a0a] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.25)] cursor-pointer hover:scale-105 transition-transform">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            </button>
          ) : (
            <div className="relative rounded-[12px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-2 border-white/20">
              <video ref={videoRef} autoPlay muted playsInline
                className="w-[160px] h-[120px] object-cover bg-black" />
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute top-1.5 left-2 flex items-center gap-1">
                <span className="w-[6px] h-[6px] rounded-full bg-[#EF4444] animate-pulse" />
                <span className="text-[9px] font-semibold text-white/80 font-matter">LIVE</span>
              </div>
              <button type="button" onClick={(e) => { e.stopPropagation(); setPipMinimized(true); }}
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 cursor-pointer transition-all opacity-0 group-hover:opacity-100">
                <svg width="8" height="8" viewBox="0 0 10 2" fill="currentColor"><rect width="10" height="2" rx="1"/></svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-[#EBEBEB] shrink-0">
        <div className="flex items-center gap-3">
          <img src="/images/homeguru.png" alt="HomeGuru" className="h-[28px] w-auto object-contain" />
          <div className="w-px h-5 bg-[#E5E7EB]" />
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] bg-[#F5F5F5] cursor-pointer">
            <span className="text-[12px] font-medium text-[#555]">Problem 1</span>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="#999"><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] bg-[#F5F5F5] cursor-pointer">
            <span className="text-[12px] font-medium text-[#555]">Python 3</span>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="#999"><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[24px] font-bold tabular-nums tracking-wide font-matter ${isLow ? 'text-[#DC2626] animate-pulse' : 'text-[#0a0a0a]'}`}>{timer}</span>
        </div>
      </nav>

      {/* Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Problem */}
        <div className="overflow-y-auto bg-white" style={{ width: `${leftWidth}%` }}>
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#F0F0F0]">
            <span className="text-[13px] font-semibold text-[#0a0a0a]">Problem Details</span>
            <button className="w-6 h-6 rounded-[6px] bg-[#F5F5F5] flex items-center justify-center text-[#999] hover:bg-[#EBEBEB] cursor-pointer text-[10px]">◀</button>
          </div>
          <div className="px-5 py-5">
            <p className="text-[13px] text-[#555] leading-[1.85]">
              In a peaceful kingdom, there are houses numbered from <strong className="text-[#0a0a0a]">1</strong> to <strong className="text-[#0a0a0a]">n</strong>.
              The king announces a prize of 100 gold coins to some special group of houses. You have been given the task to determine
              how many sets of three houses can form a special group, where the sum of the squares of two smaller house numbers is equal to
              the square of the largest house number.
            </p>

            <div className="mt-6 p-4 rounded-[12px] bg-[#FAFAFA] border border-[#F0F0F0]">
              <p className="text-[12px] font-semibold text-[#0a0a0a]">Example 1:</p>
              <div className="flex gap-6 mt-2">
                <div>
                  <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wide">Input</span>
                  <p className="text-[12px] text-[#F97316] font-mono mt-0.5">n = 10</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wide">Output</span>
                  <p className="text-[12px] text-[#F97316] font-mono mt-0.5">4</p>
                </div>
              </div>
              <p className="text-[11px] text-[#888] leading-[1.6] mt-2">
                Groups: (3,4,5), (4,3,5), (6,8,10), (8,6,10) — sum of squares of two smaller equals square of largest.
              </p>
            </div>

            <div className="mt-3 p-4 rounded-[12px] bg-[#FAFAFA] border border-[#F0F0F0]">
              <p className="text-[12px] font-semibold text-[#0a0a0a]">Example 2:</p>
              <div className="flex gap-6 mt-2">
                <div>
                  <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wide">Input</span>
                  <p className="text-[12px] text-[#F97316] font-mono mt-0.5">n = 5</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wide">Output</span>
                  <p className="text-[12px] text-[#F97316] font-mono mt-0.5">2</p>
                </div>
              </div>
              <p className="text-[11px] text-[#888] mt-2">Triplets: (3,4,5) and (4,3,5).</p>
            </div>
          </div>

          <div className="px-5 py-3 border-t border-[#F0F0F0]">
            <p className="text-[11px] text-[#bbb]">Something wrong with the question?</p>
            <div className="flex gap-2 mt-1.5">
              <button className="px-2.5 py-1 rounded-[6px] bg-[#F5F5F5] text-[10px] font-medium text-[#888] hover:bg-[#EBEBEB] cursor-pointer transition-colors">Reload</button>
              <button className="px-2.5 py-1 rounded-[6px] bg-[#F5F5F5] text-[10px] font-medium text-[#888] hover:bg-[#EBEBEB] cursor-pointer transition-colors">Report</button>
            </div>
          </div>
        </div>

        {/* Resizer */}
        <div className="w-[3px] bg-[#EBEBEB] hover:bg-[#F97316] cursor-col-resize shrink-0 transition-colors" onMouseDown={handleMouseDown} />

        {/* Right: Editor */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F0F0F0]">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-[#0a0a0a]">Code Editor</span>
            </div>
            <button type="button" onClick={() => { if (confirm('Submit your solution? This cannot be undone.')) onSubmit(); }}
              className="px-4 py-1.5 rounded-full bg-[#F97316] text-white text-[11px] font-semibold hover:bg-[#EA6C0A] active:scale-[0.97] transition-all cursor-pointer shadow-[0_2px_8px_rgba(249,115,22,0.25)]">
              Submit
            </button>
          </div>

          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language="python"
              theme="vs"
              value={code}
              onChange={(v) => setCode(v || '')}
              options={{
                fontSize: 13,
                lineHeight: 21,
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 12, bottom: 12 },
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                folding: true,
                automaticLayout: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                smoothScrolling: true,
                bracketPairColorization: { enabled: true },
              }}
            />
          </div>

          {/* Test Results */}
          <div className="border-t border-[#F0F0F0]">
            <button type="button" onClick={() => setShowResults(!showResults)}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#FAFAFA] cursor-pointer transition-colors">
              <span className="text-[11px] text-[#999]">{showResults ? '▼' : '▶'}</span>
              <span className="text-[12px] font-semibold text-[#0a0a0a]">Test Results</span>
            </button>
            {showResults && (
              <div className="px-4 py-3 border-t border-[#F5F5F5] bg-[#FAFAFA]">
                <p className="text-[11px] text-[#999]">Run your code to see test results here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
