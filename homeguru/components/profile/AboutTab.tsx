'use client';

import { useState } from 'react';
import { BookOpen, Translate, CheckCircle } from '@phosphor-icons/react';
import type { TutorProfile } from './profileData';

export default function AboutTab({ profile }: { profile: TutorProfile }) {
  const [expanded, setExpanded] = useState(false);
  const aboutText = profile.about;
  const truncated = aboutText.length > 180 ? aboutText.slice(0, 180) + '...' : aboutText;

  return (
    <div className="flex flex-col gap-6">
      {/* About me */}
      <section>
        <h3 className="font-season text-[17px] font-medium text-[#111] mb-2.5">About me</h3>
        <p className="text-[14px] text-[#444] leading-[1.65] whitespace-pre-line">
          {expanded ? aboutText : truncated}
        </p>
        {aboutText.length > 180 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[13px] font-semibold text-[#F97316] mt-1.5 cursor-pointer bg-transparent border-none p-0"
          >
            {expanded ? 'Show less' : 'Read more →'}
          </button>
        )}
      </section>

      {/* Specialties */}
      <section>
        <h3 className="font-season flex items-center gap-2 text-[17px] font-medium text-[#111] mb-2.5">
          <BookOpen size={16} className="text-[#F97316]" />
          Specialties
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.subjects.map((s) => (
            <span key={s} className="bg-[#FFF7F0] text-[#F97316] text-[13px] font-medium px-3.5 py-1.5 rounded-full border border-[#F97316]">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* I speak */}
      <section>
        <h3 className="font-season flex items-center gap-2 text-[17px] font-medium text-[#111] mb-2.5">
          <Translate size={16} className="text-[#F97316]" />
          I speak
        </h3>
        <div className="flex flex-col gap-2">
          {profile.speaks.map((s) => (
            <div key={s.lang} className="flex items-center gap-2.5">
              <span className="text-[14px] font-medium text-[#111] min-w-[80px]">{s.lang}</span>
              <span className="text-[12px] text-[#888]">{s.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick highlights */}
      <section>
        <h3 className="font-season text-[17px] font-medium text-[#111] mb-2.5">Quick highlights</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {profile.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2 bg-[#F9FAFB] p-3 rounded-[12px] border border-[#EBEBEB]">
              <CheckCircle size={15} weight="fill" className="text-[#10B981] shrink-0 mt-0.5" />
              <span className="text-[13px] font-medium text-[#444] leading-[1.4]">{h}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
