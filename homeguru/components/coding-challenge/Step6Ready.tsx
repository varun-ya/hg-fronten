'use client';
import React from 'react';

export default function Step6Ready() {
  return (
    <div className="py-12">
      <h1 className="text-[32px] font-semibold text-[#111827] leading-[1.2]" style={{ fontFamily: 'Georgia, serif' }}>
        You are ready to start the Challenge!
      </h1>

      <p className="text-[15px] text-[#374151] leading-[1.8] mt-6">
        Please wait as we prepare the environment. You can track progress on the progress bar in the top-right corner. Note that it can take up to 5 mins, depending on your network.
      </p>

      <p className="text-[15px] text-[#374151] leading-[1.8] mt-4">
        Once the environment is ready, the &quot;Start Challenge&quot; button will turn blue, you can proceed, and the challenge attempt will begin.
      </p>

      <p className="text-[15px] text-[#374151] leading-[1.8] mt-4">
        If you have any questions or require any support from HomeGuru before and after the challenge attempt, write an email to Dev Support at <span className="text-[#2563EB] underline cursor-pointer">support@homeguruworld.com</span>.
      </p>

      <p className="text-[15px] text-[#374151] leading-[1.8] mt-4 font-medium">
        Let&apos;s get ready to code!
      </p>
    </div>
  );
}
