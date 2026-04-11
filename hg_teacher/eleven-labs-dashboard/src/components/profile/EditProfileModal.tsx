"use client";

import { useState } from "react";
import { X, Plus } from "@phosphor-icons/react";
import type { TutorProfile } from "./profileData";

interface Props {
  profile: TutorProfile;
  onSave: (updated: TutorProfile) => void;
  onClose: () => void;
}

const PROFICIENCY_LEVELS = ["Native", "Professional", "Good", "Intermediate", "Beginner"];
const PROFICIENCY_COLORS: Record<string, string> = {
  Native: "#22C55E", Professional: "#3B82F6", Good: "#8B5CF6",
  Intermediate: "#F59E0B", Beginner: "#EF4444",
};

export default function EditProfileModal({ profile, onSave, onClose }: Props) {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [about, setAbout] = useState(profile.about);
  const [ytLink, setYtLink] = useState(profile.ytLink);
  const [location, setLocation] = useState(profile.location);
  const [price, setPrice] = useState(String(profile.price));
  const [languages, setLanguages] = useState([...profile.languages]);
  const [pricing, setPricing] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(profile.pricing).map(([k, v]) => [k, String(v)]))
  );
  const [experience, setExperience] = useState(profile.experience.map((e) => ({ ...e })));
  const [education, setEducation] = useState(profile.education.map((e) => ({ ...e })));

  // Dialog states
  const [langDialog, setLangDialog] = useState(false);
  const [profDialog, setProfDialog] = useState<string | null>(null); // lang being assigned proficiency
  const [pendingLang, setPendingLang] = useState("");
  const [addExpOpen, setAddExpOpen] = useState(false);
  const [addEduOpen, setAddEduOpen] = useState(false);

  function handleSave() {
    onSave({
      ...profile,
      name: name.trim(),
      bio: bio.trim(),
      about: about.trim(),
      ytLink: ytLink.trim(),
      location: location.trim(),
      price: parseInt(price) || 500,
      languages,
      pricing: Object.fromEntries(Object.entries(pricing).map(([k, v]) => [k, parseInt(v) || 500])),
      experience,
      education,
    });
    onClose();
  }

  function startAddLanguage(lang: string) {
    setPendingLang(lang);
    setLangDialog(false);
    setProfDialog(lang);
  }

  function confirmProficiency(level: string) {
    const entry = `${pendingLang} · ${level}`;
    if (!languages.includes(entry)) setLanguages((ls) => [...ls, entry]);
    setProfDialog(null);
    setPendingLang("");
  }

  const inp = "w-full px-4 py-3 rounded-[12px] text-[14px] text-[#0F172A] placeholder-[#CBD5E1] outline-none border border-[#E2E8F0] bg-white focus:border-[#0F172A] transition-all";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative w-full max-w-[520px] bg-white h-full flex flex-col animate-[slideInRight_0.25s_ease-out]">
        {/* Top bar */}
        <div className="px-5 py-3 flex items-center shrink-0 border-b border-[#F0F0F0]">
          <button onClick={onClose} className="text-[13px] text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer">Cancel</button>
          <span className="flex-1 text-center text-[14px] font-semibold text-[#0F172A]">Edit Profile</span>
          <button onClick={handleSave} className="h-8 px-5 rounded-full bg-[#0F172A] text-[13px] font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer">
            Save
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">

          <Field label="Name" value={name} onChange={setName} inp={inp} />

          <div>
            <FieldLabel>Username</FieldLabel>
            <div className="px-4 py-3 bg-[#F8FAFC] rounded-[12px] text-[14px] text-[#94A3B8] border border-[#F0F0F0]">@{profile.handle}</div>
          </div>

          <Field label="Bio" value={bio} onChange={setBio} inp={inp} multiline rows={2} placeholder="Short tagline" />
          <Field label="About Me" value={about} onChange={setAbout} inp={inp} multiline rows={5} placeholder="Tell students about yourself..." />
          <Field label="Intro Video (YouTube)" value={ytLink} onChange={setYtLink} inp={inp} placeholder="https://youtu.be/..." />
          <Field label="Location" value={location} onChange={setLocation} inp={inp} />

          <div>
            <FieldLabel>Teaching Mode</FieldLabel>
            <div className="px-4 py-3 bg-[#F8FAFC] rounded-[12px] text-[14px] text-[#94A3B8] border border-[#F0F0F0]">Online only</div>
          </div>

          {/* Default hourly rate */}
          <div>
            <FieldLabel>Default Rate (₹/hr)</FieldLabel>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inp}
              placeholder="500"
            />
          </div>

          {/* Subjects — read-only from onboarding */}
          <div>
            <FieldLabel>Subjects (from onboarding)</FieldLabel>
            <div className="flex flex-wrap gap-1.5">
              {profile.subjects.map((s) => (
                <span key={s} className="px-3 py-[6px] bg-[#F8FAFC] rounded-[8px] text-[13px] text-[#94A3B8] border border-[#F0F0F0]">{s}</span>
              ))}
            </div>
          </div>

          {/* Pricing per subject */}
          <div>
            <FieldLabel>Session Pricing (₹/hr)</FieldLabel>
            {Object.entries(pricing).map(([subject, val]) => (
              <div key={subject} className="flex items-center gap-3 mb-2">
                <span className="text-[13px] text-[#64748B] flex-1">{subject}</span>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => setPricing((p) => ({ ...p, [subject]: e.target.value }))}
                  className="w-20 px-3 py-2 rounded-[10px] text-[13px] font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-all"
                />
              </div>
            ))}
          </div>

          {/* Languages */}
          <div>
            <SectionHeader title="Languages" onAdd={() => setLangDialog(true)} />
            <div className="flex flex-wrap gap-1.5">
              {languages.map((l, i) => (
                <EditChip key={i} label={l} onRemove={() => setLanguages((ls) => ls.filter((_, j) => j !== i))} />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <SectionHeader title="Experience" onAdd={() => setAddExpOpen(true)} />
            {experience.map((e, i) => (
              <EntryTile key={i} entry={e} onRemove={() => setExperience((es) => es.filter((_, j) => j !== i))} />
            ))}
          </div>

          {/* Education */}
          <div>
            <SectionHeader title="Education" onAdd={() => setAddEduOpen(true)} />
            {education.map((e, i) => (
              <EntryTile key={i} entry={e} onRemove={() => setEducation((es) => es.filter((_, j) => j !== i))} />
            ))}
          </div>

        </div>
      </div>

      {/* Language search dialog */}
      {langDialog && (
        <LanguageDialog
          existing={languages}
          onClose={() => setLangDialog(false)}
          onSelect={startAddLanguage}
        />
      )}

      {/* Proficiency picker */}
      {profDialog && (
        <ProficiencyDialog
          lang={profDialog}
          onClose={() => setProfDialog(null)}
          onSelect={confirmProficiency}
        />
      )}

      {addExpOpen && (
        <AddEntryDialog
          title="Add Experience"
          onClose={() => setAddExpOpen(false)}
          onAdd={(entry) => { setExperience((es) => [...es, entry]); setAddExpOpen(false); }}
        />
      )}
      {addEduOpen && (
        <AddEntryDialog
          title="Add Education"
          onClose={() => setAddEduOpen(false)}
          onAdd={(entry) => { setEducation((es) => [...es, entry]); setAddEduOpen(false); }}
        />
      )}
    </div>
  );
}

/* ── Language search dialog (matches mobile _LanguageSearchModal) ── */

const ALL_LANGUAGES = [
  "Assamese","Bengali","Bodo","Dogri","English","French","German",
  "Gujarati","Hindi","Japanese","Kannada","Kashmiri","Konkani",
  "Korean","Maithili","Malayalam","Mandarin","Manipuri","Marathi",
  "Nepali","Odia","Portuguese","Punjabi","Russian","Sanskrit",
  "Santali","Sindhi","Spanish","Tamil","Telugu","Urdu",
];

function LanguageDialog({ existing, onClose, onSelect }: { existing: string[]; onClose: () => void; onSelect: (lang: string) => void }) {
  const [q, setQ] = useState("");
  const existingLangs = existing.map((l) => l.split(" · ")[0]);
  const filtered = q.trim() === ""
    ? ALL_LANGUAGES.filter((l) => !existingLangs.includes(l))
    : ALL_LANGUAGES.filter((l) => !existingLangs.includes(l) && l.toLowerCase().includes(q.toLowerCase()));
  const canAddCustom = q.trim() !== "" && !ALL_LANGUAGES.some((l) => l.toLowerCase() === q.toLowerCase().trim()) && !existingLangs.includes(q.trim());

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-[24px] w-[360px] max-h-[70vh] flex flex-col shadow-[0_16px_48px_rgba(0,0,0,0.14)]">
        <div className="p-4 pb-2">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search language"
            className="w-full px-4 py-2.5 rounded-[14px] text-[14px] text-[#111] bg-[#F3F4F6] outline-none border-none"
          />
        </div>
        <div className="overflow-y-auto pb-3">
          {canAddCustom && (
            <button onClick={() => onSelect(q.trim())} className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-[#FFF7F0] transition-colors cursor-pointer">
              <Plus size={13} weight="bold" className="text-[#F97316]" />
              <span className="text-[14px] font-semibold text-[#F97316]">Add "{q.trim()}"</span>
            </button>
          )}
          {filtered.length === 0 && !canAddCustom && (
            <p className="text-center text-[14px] text-[#999] py-6">No results</p>
          )}
          {filtered.map((lang) => (
            <button key={lang} onClick={() => onSelect(lang)} className="w-full px-4 py-3 text-left text-[14px] text-[#111] hover:bg-[#F9FAFB] transition-colors cursor-pointer">
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Proficiency picker (matches mobile _pickProficiency) ── */

function ProficiencyDialog({ lang, onClose, onSelect }: { lang: string; onClose: () => void; onSelect: (level: string) => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-t-[20px] w-full max-w-[520px] pb-8 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]">
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-[#DDD]" />
        </div>
        <p className="text-center text-[16px] font-bold text-[#111] mb-4">How well do you speak {lang}?</p>
        <div className="px-5 flex flex-col gap-2">
          {PROFICIENCY_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className="w-full px-4 py-3.5 rounded-[12px] border border-[#EBEBEB] bg-white flex items-center gap-3 cursor-pointer hover:bg-[#F9FAFB] transition-colors text-left"
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: PROFICIENCY_COLORS[level] }} />
              <span className="text-[14px] text-[#111]">{level}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function FieldLabel({ children }: { children: string }) {
  return <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.1em] mb-1.5">{children}</p>;
}

function Field({ label, value, onChange, inp, multiline = false, rows = 1, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  inp: string; multiline?: boolean; rows?: number; placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={`${inp} resize-none`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inp} />
      )}
    </div>
  );
}

function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center gap-2.5 mb-2">
      <span className="text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em]">{title}</span>
      <span className="flex-1 h-px bg-[#F0F0F0]" />
      <button onClick={onAdd} className="flex items-center gap-1 text-[12px] font-semibold text-[#F97316] hover:text-[#EA580C] cursor-pointer transition-colors">
        <Plus size={12} weight="bold" /> Add
      </button>
    </div>
  );
}

function EditChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 pl-3 pr-1.5 py-[6px] rounded-[8px] text-[13px] text-[#0F172A] bg-white border border-[#E2E8F0]">
      {label}
      <button onClick={onRemove} className="p-0.5 hover:bg-[#F1F5F9] rounded transition-colors cursor-pointer">
        <X size={13} className="text-[#94A3B8]" />
      </button>
    </span>
  );
}

function EntryTile({ entry, onRemove }: { entry: { title: string; org: string; period: string }; onRemove: () => void }) {
  return (
    <div className="flex items-start gap-2 mb-2 px-4 py-3 rounded-[12px] bg-white border border-[#E2E8F0]">
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-[#0F172A]">{entry.title}</p>
        <p className="text-[12px] text-[#94A3B8]">{entry.org} · {entry.period}</p>
      </div>
      <button onClick={onRemove} className="p-1 hover:bg-[#F1F5F9] rounded transition-colors cursor-pointer mt-0.5">
        <X size={14} className="text-[#CBD5E1]" />
      </button>
    </div>
  );
}

function AddEntryDialog({ title, onClose, onAdd }: { title: string; onClose: () => void; onAdd: (entry: { title: string; org: string; period: string }) => void }) {
  const [t, setT] = useState("");
  const [o, setO] = useState("");
  const [p, setP] = useState("");
  const inp = "w-full px-4 py-3 rounded-[12px] text-[14px] text-[#0F172A] placeholder-[#CBD5E1] outline-none border border-[#E2E8F0] bg-white focus:border-[#0F172A] transition-all";
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] p-5 w-[360px] shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
        <p className="text-[16px] font-semibold text-[#0F172A] text-center mb-4">{title}</p>
        <input value={t} onChange={(e) => setT(e.target.value)} placeholder="Title" autoFocus className={`${inp} mb-2`} />
        <input value={o} onChange={(e) => setO(e.target.value)} placeholder="Organization" className={`${inp} mb-2`} />
        <input value={p} onChange={(e) => setP(e.target.value)} placeholder="Period (e.g. 2020 – 2023)" className={`${inp} mb-4`} />
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 text-center text-[14px] text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer">Cancel</button>
          <button onClick={() => { if (t.trim()) onAdd({ title: t.trim(), org: o.trim(), period: p.trim() }); }} className="flex-1 py-2.5 bg-[#0F172A] rounded-full text-[14px] font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer">Add</button>
        </div>
      </div>
    </div>
  );
}
