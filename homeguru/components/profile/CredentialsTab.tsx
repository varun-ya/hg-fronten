'use client';

import {
  GraduationCap,
  Exam,
  Certificate,
  Trophy,
  SealCheck,
  IdentificationCard,
  CreditCard,
  Bank,
  Envelope,
  Phone,
  BellRinging,
  LockKey,
  Gear,
  Question,
  SignOut,
  CaretRight,
  CheckCircle,
} from '@phosphor-icons/react';
import { documents, credentials, verifications, settingsItems } from './profileData';

const docIcons: Record<string, React.ElementType> = { graduation: GraduationCap, exam: Exam, certificate: Certificate, trophy: Trophy };
const verifyIcons: Record<string, React.ElementType> = { id: IdentificationCard, card: CreditCard, bank: Bank, email: Envelope, phone: Phone };
const settingIcons: Record<string, React.ElementType> = { bell: BellRinging, lock: LockKey, gear: Gear, help: Question, logout: SignOut };

export default function CredentialsTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Documents */}
      <section>
        <h3 className="font-season flex items-center gap-2 text-[17px] font-medium text-[#111] mb-2.5">
          <Certificate size={16} className="text-[#F97316]" /> Documents
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {documents.map((doc) => {
            const Icon = docIcons[doc.icon] ?? GraduationCap;
            return (
              <div key={doc.title} className="h-[140px] rounded-[14px] p-4 flex flex-col bg-white border border-[#EBEBEB] hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: doc.bg }}>
                  <Icon size={20} weight="fill" style={{ color: doc.fg }} />
                </div>
                <div className="flex-1" />
                <p className="text-[13px] font-semibold text-[#111]">{doc.title}</p>
                <p className="text-[11px] text-[#888] mt-0.5">{doc.org}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <SealCheck size={11} weight="fill" className="text-[#10B981]" />
                  <span className="text-[10px] font-semibold text-[#10B981]">Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Awards & Certifications Timeline */}
      <section>
        <h3 className="font-season flex items-center gap-2 text-[17px] font-medium text-[#111] mb-2.5">
          <Trophy size={16} className="text-[#F97316]" /> Awards & Certifications
        </h3>
        <div className="bg-[#F9FAFB] rounded-[14px] border border-[#EBEBEB] p-5">
          {credentials.map((cred, i) => {
            const isLast = i === credentials.length - 1;
            return (
              <div key={i} className="flex gap-3.5">
                <div className="flex flex-col items-center w-4 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] shrink-0 mt-1.5" />
                  {!isLast && <div className="w-px flex-1 bg-[#DDD]" />}
                </div>
                <div className={isLast ? '' : 'pb-5'}>
                  <p className="text-[14px] font-semibold text-[#111] leading-[1.2]">{cred.title}</p>
                  <p className="text-[13px] text-[#666] mt-0.5">{cred.org}</p>
                  <p className="text-[12px] text-[#BBB] mt-0.5">{cred.date}</p>
                  <p className="text-[13px] text-[#888] leading-[1.5] mt-1.5">{cred.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verification */}
      <section>
        <h3 className="font-season flex items-center gap-2 text-[17px] font-medium text-[#111] mb-2.5">
          <CheckCircle size={16} weight="fill" className="text-[#10B981]" /> Verification
        </h3>
        <div className="bg-[#F9FAFB] rounded-[14px] border border-[#EBEBEB] p-4">
          {verifications.map((v) => {
            const Icon = verifyIcons[v.icon] ?? IdentificationCard;
            return (
              <div key={v.label} className="flex items-center gap-3 py-2.5">
                <Icon size={18} weight="fill" className="text-[#444] shrink-0" />
                <span className="text-[13px] text-[#111] flex-1">{v.label}</span>
                {v.verified && <SealCheck size={13} weight="fill" className="text-[#10B981] shrink-0" />}
                <span className={`text-[12px] ${v.verified ? 'text-[#10B981] font-semibold' : 'text-[#888]'}`}>{v.status}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Settings */}
      <section>
        <h3 className="font-season flex items-center gap-2 text-[17px] font-medium text-[#111] mb-2.5">
          <Gear size={16} className="text-[#888]" /> Settings
        </h3>
        <div className="bg-[#F9FAFB] rounded-[14px] border border-[#EBEBEB] p-4">
          {settingsItems.map((item) => {
            const Icon = settingIcons[item.icon] ?? Gear;
            const color = item.destructive ? '#EF4444' : '#111';
            return (
              <div key={item.label} className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-white -mx-2 px-2 rounded-[8px] transition-colors">
                <Icon size={18} style={{ color }} className="shrink-0" />
                <span className="text-[13px] flex-1" style={{ color }}>{item.label}</span>
                {!item.destructive && <CaretRight size={14} className="text-[#CCC] shrink-0" />}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
