'use client';
import React from 'react';

interface Props { onGranted: () => void; granted: boolean; }

export default function Step3Screen({ onGranted, granted }: Props) {
  const handleAllow = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      stream.getTracks().forEach(t => t.stop());
      onGranted();
    } catch { onGranted(); }
  };

  return (
    <div className="flex gap-8">
      {/* Left: Instructions */}
      <div className="flex-1">
        <h1 className="text-[32px] font-semibold text-[#111827] leading-[1.2]" style={{ fontFamily: 'Georgia, serif' }}>
          Allow Permissions (1/2): Screen
        </h1>

        <h3 className="text-[16px] font-bold text-[#111827] mt-8">ALLOW Entire Screen recording:</h3>
        <ol className="mt-4 space-y-2 pl-6">
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Click the &quot;Allow screen recording&quot; button (bottom-right).</li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Select &quot;Entire Screen&quot; (not a tab or window), or equivalent option.</li>
        </ol>

        <h3 className="text-[16px] font-bold text-[#111827] mt-8">For MacOS: Verify your system settings allow this browser to share screen:</h3>
        <ul className="mt-4 space-y-2 pl-8">
          <li className="text-[15px] text-[#374151] leading-[1.7] list-[circle]">Go to System Settings</li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-[circle]">Privacy & Security → Screen Recording</li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-[circle]">Ensure this web browser is checked. If not, check it, and restart your browser.</li>
        </ul>

        <h3 className="text-[16px] font-bold text-[#111827] mt-8">If you face issues:</h3>
        <ol className="mt-4 space-y-2 pl-6">
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Try refreshing the browser if you face issues.</li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Refer to our <span className="text-[#2563EB] underline cursor-pointer">troubleshooting guide</span> if issues persist.</li>
        </ol>
      </div>

      {/* Right: Mock permission popup */}
      <div className="w-[320px] shrink-0">
        <div className="rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] h-[360px] flex items-center justify-center">
          {granted ? (
            <div className="text-center px-6">
              <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p className="text-[14px] font-semibold text-[#059669]">Screen recording granted!</p>
              <p className="text-[12px] text-[#6B7280] mt-1">You have enabled screen sharing.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg border border-[#E5E7EB] p-5 w-[260px]">
              <p className="text-[13px] font-medium text-[#111827]">Allow homeguru.com to see your screen?</p>
              <div className="mt-3 border border-[#E5E7EB] rounded px-3 py-2 flex items-center justify-between">
                <span className="text-[12px] text-[#6B7280]">Select window or screen</span>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="#9CA3AF"><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <input type="checkbox" className="w-3.5 h-3.5" readOnly />
                <span className="text-[11px] text-[#6B7280]">Mute website notifications while sharing</span>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <span className="px-3 py-1.5 rounded text-[12px] font-medium text-[#374151] border border-[#D1D5DB] cursor-pointer">Block</span>
                <span className="px-3 py-1.5 rounded text-[12px] font-medium text-[#6B7280] cursor-pointer" onClick={() => onGranted()}>Allow</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
