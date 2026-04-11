'use client';
import React from 'react';

interface Props { onGranted: () => void; granted: boolean; }

export default function Step4CameraMic({ onGranted, granted }: Props) {
  const handleAllow = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(t => t.stop());
      onGranted();
    } catch { onGranted(); }
  };

  return (
    <div className="flex gap-8">
      {/* Left */}
      <div className="flex-1">
        <h1 className="text-[32px] font-semibold text-[#111827] leading-[1.2]" style={{ fontFamily: 'Georgia, serif' }}>
          Allow Permissions (2/2): Camera and Microphone
        </h1>

        <h3 className="text-[16px] font-bold text-[#111827] mt-8">ALLOW access to Camera and Microphone:</h3>
        <ol className="mt-4 space-y-2 pl-6">
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Click the &quot;Allow camera and microphone&quot; button (bottom-right).</li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Select &quot;Allow&quot; or equivalent option for granting Camera and Microphone permissions.</li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">If you have manually disabled browser permissions, you will have to update them and refresh the browser.</li>
        </ol>

        <h3 className="text-[16px] font-bold text-[#111827] mt-8">If you face issues:</h3>
        <ol className="mt-4 space-y-2 pl-6">
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Try refreshing the browser if you face issues.</li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Verify browser settings allow access.</li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">
            Verify system settings allow access to browser:
            <ul className="mt-2 space-y-1 pl-6">
              <li className="list-[circle]">Go to System Settings.</li>
              <li className="list-[circle]">Privacy & Security → &quot;Camera&quot; / &quot;Microphone&quot;.</li>
              <li className="list-[circle]">Ensure this web browser is checked for both.</li>
            </ul>
          </li>
          <li className="text-[15px] text-[#374151] leading-[1.7] list-decimal">Refer to our <span className="text-[#2563EB] underline cursor-pointer">troubleshooting guide</span> if issues persist.</li>
        </ol>
      </div>

      {/* Right */}
      <div className="w-[320px] shrink-0">
        <div className="rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] h-[360px] flex items-center justify-center">
          {granted ? (
            <div className="text-center px-6 py-8 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] mx-6">
              <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p className="text-[14px] font-semibold text-[#059669]">Permissions granted!</p>
              <p className="text-[12px] text-[#059669] mt-1">You have enabled camera and microphone sharing.</p>
            </div>
          ) : (
            <div className="text-center px-6">
              <div className="w-12 h-12 rounded-full bg-[#E5E7EB] flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
              </div>
              <p className="text-[13px] text-[#6B7280]">Click the button below to grant access</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
