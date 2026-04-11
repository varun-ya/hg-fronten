"use client";

import { useState } from "react";
import { MapPin, GraduationCap, CalendarBlank, Globe, BookOpen, Flame, Trophy, Lightning, Target } from "@phosphor-icons/react";
import type { StudentProfile } from "./studentProfileData";

function Section({ label }: { label: string }) {
  return <h3 className="text-[15px] font-bold text-[#111] mb-3">{label}</h3>;
}

function extractYtId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match?.[1] ?? "G64LLtnjYlA";
}

export default function StudentAboutTab({ profile }: { profile: StudentProfile }) {
  const [expanded, setExpanded] = useState(false);
  const aboutText = profile.about;
  const truncated = aboutText.length > 180 ? aboutText.slice(0, 180) + "..." : aboutText;

  return (
    <div className="flex flex-col gap-6">

      {/* Learning Progress */}
      <section>
        <Section label="Learning Progress" />
        <div className="bg-white rounded-[16px] px-5 py-5 space-y-5 border border-[#F0F0F0]">
          <ProgressRow subject="Mathematics" chapter="Ch. 5: Quadratics" progress={0.65} color="#111" />
          <ProgressRow subject="Physics" chapter="Newton's Laws" progress={0.40} color="#111" />
          <ProgressRow subject="English" chapter="Essay Writing" progress={0.80} color="#111" />
        </div>
      </section>

      {/* Subjects */}
      <section>
        <Section label="Subjects" />
        <div className="flex flex-wrap gap-2.5">
          {['Mathematics', 'Physics', 'English', 'JEE Prep', 'Chemistry'].map((s) => (
            <span key={s} className="bg-[#F7F7F8] text-[#333] text-[13px] font-medium px-4 py-2 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Details */}
      <section>
        <Section label="Details" />
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-3 text-[14px] text-[#444]">
            <GraduationCap size={20} className="text-[#999] shrink-0" />
            {profile.grade} · {profile.school}
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#444]">
            <Target size={20} className="text-[#999] shrink-0" weight="fill" />
            JEE 2026 aspirant
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#444]">
            <CalendarBlank size={20} className="text-[#999] shrink-0" />
            Joined Jun 2025
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#444]">
            <Globe size={20} className="text-[#999] shrink-0" />
            Learns online
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <Section label="Achievements" />
        <div className="space-y-2">
          <AchievementTile 
            icon={<Flame size={16} weight="fill" />}
            title="7-day streak"
            subtitle="Learning every day for a week"
            color="#F97316"
          />
          <AchievementTile 
            icon={<Trophy size={16} weight="fill" />}
            title="Top 15%"
            subtitle="Weekly leaderboard rank"
            color="#F59E0B"
          />
          <AchievementTile 
            icon={<Lightning size={16} weight="fill" />}
            title="1,240 XP"
            subtitle="Total experience points"
            color="#8B5CF6"
          />
        </div>
      </section>

    </div>
  );
}

function ProgressRow({ subject, chapter, progress, color }: { subject: string; chapter: string; progress: number; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#F5F5F5]">
        <BookOpen size={16} weight="fill" className="text-[#666]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[14px] font-semibold text-[#111]">{subject}</span>
          <span className="text-[13px] font-bold text-[#111]">{Math.round(progress * 100)}%</span>
        </div>
        <p className="text-[13px] text-[#666] mb-2">{chapter}</p>
        <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all bg-[#111]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

function AchievementTile({ icon, title, subtitle, color }: { icon: React.ReactNode; title: string; subtitle: string; color: string }) {
  return (
    <div className="rounded-[16px] px-4 py-4 flex items-center gap-3.5 bg-white border border-[#F0F0F0]">
      <div className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 bg-[#F5F5F5]" style={{ color }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold text-[#111]">{title}</div>
        <div className="text-[13px] text-[#666] mt-1">{subtitle}</div>
      </div>
    </div>
  );
}
