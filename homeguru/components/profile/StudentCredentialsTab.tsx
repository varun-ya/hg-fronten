"use client";

import {
  SealCheck, Plus, IdentificationCard, CreditCard, Bank,
  Envelope, Phone, BellRinging, LockKey, Gear, Question,
  SignOut, CaretRight, ShieldCheck,
} from "@phosphor-icons/react";
import {
  verifications, settingsItems,
  type Verification, type SettingsItem,
} from "./studentProfileData";
import type { StudentProfile } from "./studentProfileData";

const verifyIcons: Record<string, React.ElementType> = { id: IdentificationCard, card: CreditCard, bank: Bank, email: Envelope, phone: Phone };
const settingIcons: Record<string, React.ElementType> = { bell: BellRinging, lock: LockKey, gear: Gear, help: Question, logout: SignOut };

const DOC_CARDS = [
  { title: "School ID", org: "DPS Mumbai", fg: "#1E3162", image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=300&h=200&fit=crop" },
  { title: "Math Olympiad", org: "Certificate", fg: "#F59E0B", image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=300&h=200&fit=crop" },
  { title: "Top Performer", org: "School Award", fg: "#22C55E", image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=300&h=200&fit=crop" },
  { title: "7-Day Streak", org: "HomeGuru", fg: "#E08A3C", image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=300&h=200&fit=crop" },
];

const CRED_TIMELINE = [
  { title: "7-Day Learning Streak",    org: "HomeGuru",              date: "Jan 2025",   year: "2025", desc: "Maintained consistent learning for 7 consecutive days.",        type: "award" },
  { title: "1000+ XP Earned",          org: "HomeGuru",              date: "Dec 2024",   year: "2024", desc: "Achieved milestone of 1000 experience points.",                type: "award" },
  { title: "Top Performer",            org: "School Mathematics",    date: "2024",       year: "2024", desc: "Ranked in top 5% of class in Mathematics.",                   type: "award" },
  { title: "Math Olympiad Certificate", org: "Regional Competition", date: "2023",       year: "2023", desc: "Participated and secured position in regional olympiad.",      type: "cert"  },
];

const TYPE_STYLE: Record<string, { dot: string; badge: string; label: string }> = {
  award: { dot: "#F97316", badge: "bg-[#FFF4ED] text-[#F97316]",  label: "Award"       },
  cert:  { dot: "#6366F1", badge: "bg-[#EEF2FF] text-[#6366F1]",  label: "Certificate" },
  edu:   { dot: "#0EA5E9", badge: "bg-[#E0F2FE] text-[#0369A1]",  label: "Education"   },
  exam:  { dot: "#16A34A", badge: "bg-[#F0FDF4] text-[#16A34A]",  label: "Exam"        },
};

export default function StudentCredentialsTab({ profile, visitorMode }: { profile: StudentProfile; visitorMode: boolean }) {
  return (
    <div className="flex flex-col gap-6">

      {/* Documents */}
      <section>
        <h3 className="text-[14px] font-bold text-[#111] mb-3">Documents</h3>
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {DOC_CARDS.map((doc, i) => (
            <div key={i} className="shrink-0 w-[155px] rounded-[16px] border border-[#E5E5E5] bg-white overflow-hidden">
              {/* Image top */}
              <div className="relative h-[110px]">
                <img src={doc.image} alt={doc.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.12))" }} />
                {/* PDF badge */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-[5px] text-[9px] font-bold"
                  style={{ background: "rgba(255,255,255,0.9)", color: doc.fg }}>PDF</div>
              </div>
              {/* Info bottom */}
              <div className="px-3 py-2.5">
                <div className="text-[13px] font-bold text-[#111] leading-[1.3] truncate">{doc.title}</div>
                <div className="text-[11px] text-[#888] mt-0.5 truncate">{doc.org}</div>
                <div className="flex items-center gap-1 mt-2">
                  <ShieldCheck size={12} weight="fill" className="text-[#16A34A]" />
                  <span className="text-[10px] font-semibold text-[#16A34A]">Verified</span>
                </div>
              </div>
            </div>
          ))}
          {!visitorMode && (
            <button className="shrink-0 w-[110px] h-[180px] rounded-[16px] border border-dashed border-[#DDD] bg-[#FAFAFA] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#F5F5F5] transition-colors">
              <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center">
                <Plus size={18} weight="bold" className="text-[#111]" />
              </div>
              <span className="text-[12px] font-semibold text-[#111]">Upload</span>
            </button>
          )}
        </div>
      </section>

      {/* Awards & Certifications timeline */}
      <section>
        <h3 className="text-[14px] font-bold text-[#111] mb-4">Awards & Achievements</h3>
        <div className="relative pl-5">
          {/* vertical line through dot centers */}
          <div className="absolute left-[4px] top-0 bottom-0 w-px bg-[#EBEBEB]" />

          {CRED_TIMELINE.map((item, i) => {
            const s = TYPE_STYLE[item.type];
            return (
              <div key={i} className="relative mb-5 last:mb-0">
                {/* Dot */}
                <div className="absolute -left-5 top-[4px] w-[10px] h-[10px] rounded-full z-10 border-2 border-white"
                  style={{ background: "#111", boxShadow: "0 0 0 1.5px #111" }} />

                {/* Card */}
                <div className="bg-white border border-[#F0F0F0] rounded-[12px] px-4 py-3 hover:border-[#E0E0E0] transition-colors" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[14px] font-semibold text-[#111] leading-[1.3]">{item.title}</span>
                    <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
                  </div>
                  <div className="text-[12px] text-[#888]">{item.org}</div>
                  <div className="text-[11px] text-[#BBB] mt-0.5">{item.date}</div>
                  <p className="text-[12px] text-[#666] mt-2 leading-[1.5]">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {!visitorMode && (
          <button className="mt-4 w-full py-2.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-[#FAFAFA] border border-dashed border-[#E0E0E0]">
            <Plus size={13} weight="bold" className="text-[#AAA]" />
            <span className="text-[12px] font-semibold text-[#AAA]">Add Achievement</span>
          </button>
        )}
      </section>

      {/* Verification — owner only */}
      {!visitorMode && (
        <section>
          <h3 className="text-[14px] font-bold text-[#111] mb-3">Verification</h3>
          <div className="bg-[#F7F7F8] rounded-[16px] overflow-hidden">
            {verifications.map((v, i) => (
              <div key={v.label}>
                <VerificationRow item={v} />
                {i < verifications.length - 1 && <div className="h-px bg-[#EBEBEB] ml-14" />}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Settings — owner only */}
      {!visitorMode && (
        <section>
          <h3 className="text-[14px] font-bold text-[#111] mb-3">Settings</h3>
          <div className="bg-[#F7F7F8] rounded-[16px] overflow-hidden">
            {settingsItems.map((item, i) => (
              <div key={item.label}>
                <SettingsRow item={item} />
                {i < settingsItems.length - 1 && <div className="h-px bg-[#EBEBEB] ml-14" />}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function VerificationRow({ item }: { item: Verification }) {
  const Icon = verifyIcons[item.iconType] ?? IdentificationCard;
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Icon size={20} weight="fill" className="text-[#111] shrink-0" />
      <span className="text-[14px] text-[#111] flex-1">{item.label}</span>
      {item.verified && <SealCheck size={14} weight="fill" className="text-[#16A34A] shrink-0" />}
      <span className={`text-[12px] ${item.verified ? "text-[#16A34A] font-semibold" : "text-[#888]"}`}>{item.status}</span>
    </div>
  );
}

function SettingsRow({ item }: { item: SettingsItem }) {
  const Icon = settingIcons[item.iconType] ?? Gear;
  const color = item.destructive ? "#EF4444" : "#111";
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-white transition-colors">
      <Icon size={20} style={{ color }} className="shrink-0" />
      <span className="text-[14px] flex-1" style={{ color }}>{item.label}</span>
      {!item.destructive && <CaretRight size={16} className="text-[#CCC] shrink-0" />}
    </div>
  );
}
