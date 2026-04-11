"use client";

import { useState } from "react";
import { Translate, MapPin, GraduationCap, Briefcase, CurrencyInr, Globe, CalendarBlank } from "@phosphor-icons/react";
import type { TutorProfile } from "./profileData";
import { parseSpeaks } from "./profileData";

function Section({ label }: { label: string }) {
  return <h3 className="text-[14px] font-bold text-[#111] mb-2.5">{label}</h3>;
}

function extractYtId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match?.[1] ?? "G64LLtnjYlA";
}

export default function AboutTab({ profile }: { profile: TutorProfile }) {
  const [expanded, setExpanded] = useState(false);
  const aboutText = profile.about;
  const truncated = aboutText.length > 180 ? aboutText.slice(0, 180) + "..." : aboutText;
  const speaks = parseSpeaks(profile.languages);

  return (
    <div className="flex flex-col gap-6">

      {/* Intro Video */}
      <section>
        <div className="rounded-[14px] overflow-hidden border border-[#F0F0F0]">
          <div className="relative" style={{ paddingBottom: "56%", height: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${extractYtId(profile.ytLink)}`}
              title="Intro video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-none"
            />
          </div>
          <div className="px-3.5 py-3 bg-white border-t border-[#F0F0F0]">
            <div className="text-[13px] font-semibold text-[#111]">Meet {profile.name}</div>
            <div className="text-[11px] text-[#AAA] mt-0.5">{profile.subjects?.[0] ?? "Tutor"} · Intro video</div>
          </div>
        </div>
      </section>

      {/* About me */}
      <section className="max-w-[620px]">
        <Section label="About me" />
        <p className="text-[14px] text-[#555] leading-[1.65] whitespace-pre-line">
          {expanded ? aboutText : truncated}
        </p>
        {aboutText.length > 180 && (
          <button onClick={() => setExpanded(!expanded)}
            className="text-[14px] font-medium text-[#F97316] mt-2 cursor-pointer bg-transparent border-none p-0">
            {expanded ? "Show less" : "Read more →"}
          </button>
        )}
      </section>

      {/* Experience */}
      <section>
        <Section label="Experience" />
        <div className="bg-[#F7F7F8] rounded-[16px] px-4 py-2">
          {profile.experience.map((e, i) => (
            <div key={i}>
              <div className="py-3">
                <div className="text-[14px] font-semibold text-[#111]">{e.title}</div>
                <div className="text-[12px] text-[#888] mt-0.5">{e.org} · {e.period}</div>
              </div>
              {i < profile.experience.length - 1 && <div className="h-px bg-[#EBEBEB]" />}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <Section label="Education" />
        <div className="bg-[#F7F7F8] rounded-[16px] px-4 py-2">
          {profile.education.map((e, i) => (
            <div key={i}>
              <div className="py-3">
                <div className="text-[14px] font-semibold text-[#111]">{e.title}</div>
                <div className="text-[12px] text-[#888] mt-0.5">{e.org} · {e.period}</div>
              </div>
              {i < profile.education.length - 1 && <div className="h-px bg-[#EBEBEB]" />}
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section>
        <Section label="Subjects" />
        <div className="flex flex-wrap gap-2">
          {profile.subjects.map((s) => (
            <span key={s} className="bg-[#F7F7F8] text-[#111] text-[12px] font-medium px-3.5 py-1.5 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Session Pricing */}
      <section>
        <Section label="Session Pricing" />
        <div className="bg-[#F7F7F8] rounded-[16px] px-4 py-2">
          {Object.entries(profile.pricing).map(([subject, price], i, arr) => (
            <div key={subject}>
              <div className="flex items-center justify-between py-3">
                <span className="text-[13px] text-[#888]">{subject}</span>
                <span className="text-[14px] font-bold text-[#111]">₹{price}/hr</span>
              </div>
              {i < arr.length - 1 && <div className="h-px bg-[#EBEBEB]" />}
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section>
        <Section label="Languages" />
        <div className="flex flex-wrap gap-2">
          {speaks.map((s) => (
            <span key={s.lang} className="bg-[#F7F7F8] text-[#111] text-[12px] font-medium px-3.5 py-1.5 rounded-full">
              {s.lang}{s.level ? ` · ${s.level}` : ""}
            </span>
          ))}
        </div>
      </section>

      {/* Details row */}
      <section className="border-t border-[#EBEBEB] pt-4 flex flex-col gap-3.5">
        <div className="flex items-center gap-3 text-[13px] text-[#555]">
          <MapPin size={18} className="text-[#999] shrink-0" />{profile.location}
        </div>
        <div className="flex items-center gap-3 text-[13px] text-[#555]">
          <GraduationCap size={18} className="text-[#999] shrink-0" />{profile.sessions}+ sessions · {profile.students} active students
        </div>
        <div className="flex items-center gap-3 text-[13px] text-[#555]">
          <CalendarBlank size={18} className="text-[#999] shrink-0" />Joined June 2025
        </div>
        <div className="flex items-center gap-3 text-[13px] text-[#555]">
          <Globe size={18} className="text-[#999] shrink-0" />Teaches online
        </div>
      </section>

    </div>
  );
}
