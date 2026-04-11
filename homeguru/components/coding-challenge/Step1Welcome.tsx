'use client';
import React from 'react';

export default function Step1Welcome() {
  return (
    <div>
      <h1 className="text-[32px] font-semibold text-[#111827] leading-[1.2]" style={{ fontFamily: 'Georgia, serif' }}>
        Welcome to the Coding Challenge!
      </h1>

      <p className="text-[16px] font-bold text-[#111827] mt-6 uppercase">
        NOTE: THE INSTRUCTIONS SECTION IS NOT TIMED
      </p>

      <h2 className="text-[20px] font-bold text-[#111827] mt-8">Instructions Overview</h2>
      <p className="text-[15px] text-[#374151] mt-3 leading-[1.7]">
        Proper setup and preparation make sure you make the most of your attempt.
      </p>
      <ul className="mt-4 space-y-2.5 pl-6">
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Carefully review instructions on the following slides (5-7 min).</li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">You are allowed 1 attempt every 45 days. Ensure you have a stable internet connection.</li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Time only starts after instructions when you begin coding.</li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">Please make sure you are not interrupted during the test, as the timer cannot be paused once started.</li>
      </ul>

      <h2 className="text-[20px] font-bold text-[#111827] mt-8">Guidelines and Setup</h2>
      <ul className="mt-4 space-y-2.5 pl-6">
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc"><strong>Workspace Prep:</strong> Arrange a well-lit space, minimize background noise, and maintain a neat appearance.</li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc"><strong>Browser:</strong> Use <strong>Google Chrome</strong> (not incognito) for optimal experience. <span className="text-[#DC2626]">If you experience issues using other browsers, <strong>please switch to Chrome</strong>.</span></li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc"><strong>Close</strong> all non-challenge browser tabs before starting.</li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc"><strong>Equipment:</strong> Have a working camera and microphone setup. This is a proctored test.</li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc"><strong>No Additional Monitor:</strong> Disconnect any additional screens before proceeding.</li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc"><strong>Coding Environment:</strong> Only use the browser-based challenge IDE and environment. Copying and pasting is restricted in the environment.</li>
      </ul>

      <h2 className="text-[20px] font-bold text-[#111827] mt-8">Navigation</h2>
      <ul className="mt-4 space-y-2.5 pl-6">
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">&quot;Exit and go back to Challenges page&quot; button in top-right to exit.</li>
        <li className="text-[15px] text-[#374151] leading-[1.7] list-disc">&quot;Next&quot; button in bottom-right to go to next instruction.</li>
      </ul>
    </div>
  );
}
