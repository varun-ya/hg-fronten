'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Plus, X, MagnifyingGlass } from '@phosphor-icons/react';

const POPULAR_SUBJECTS = ['Maths', 'Science', 'English', 'Social Studies', 'Computer Science', 'Hindi'];
const POPULAR_SKILLS = ['Music', 'Dance', 'Art & Design', 'Coding', 'Languages', 'Public Speaking'];

const ALL_SUBJECTS = [
  'Maths', 'Science', 'English', 'Social Studies', 'Computer Science', 'Hindi',
  'Physics', 'Chemistry', 'Biology', 'Economics', 'Accountancy', 'Business Studies',
  'History', 'Geography', 'Political Science', 'Psychology', 'Sociology',
  'Sanskrit', 'French', 'German', 'Spanish', 'Japanese', 'Mandarin',
  'Environmental Science', 'Statistics', 'Reasoning', 'General Knowledge',
  'IELTS Preparation', 'TOEFL Preparation', 'SAT Preparation', 'GRE Preparation',
  'JEE Preparation', 'NEET Preparation', 'UPSC Preparation', 'CAT Preparation',
  'Vedic Maths', 'Mental Maths', 'Handwriting', 'Spoken English',
];

const ALL_SKILLS = [
  'Music', 'Dance', 'Art & Design', 'Coding', 'Languages', 'Public Speaking',
  'Guitar', 'Piano', 'Violin', 'Drums', 'Singing', 'Tabla', 'Flute',
  'Classical Dance', 'Hip Hop', 'Contemporary Dance', 'Yoga',
  'Painting', 'Sketching', 'Digital Art', 'Photography', 'Video Editing',
  'Web Development', 'App Development', 'Python', 'JavaScript', 'Data Science', 'AI/ML',
  'Chess', 'Debate', 'Creative Writing', 'Content Writing', 'Calligraphy',
  'Cooking', 'Fitness Training', 'Meditation', 'Financial Literacy',
];

interface Props { onNext: (subjects: string[]) => void; onBack: () => void; }

export default function AdminStep3Subjects({ onNext, onBack }: Props) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showSubjectSearch, setShowSubjectSearch] = useState(false);
  const [showSkillSearch, setShowSkillSearch] = useState(false);
  const [subjectQuery, setSubjectQuery] = useState('');
  const [skillQuery, setSkillQuery] = useState('');
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const skillInputRef = useRef<HTMLInputElement>(null);

  const total = selectedSubjects.length + selectedSkills.length;

  useEffect(() => { if (showSubjectSearch) subjectInputRef.current?.focus(); }, [showSubjectSearch]);
  useEffect(() => { if (showSkillSearch) skillInputRef.current?.focus(); }, [showSkillSearch]);

  const toggle = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const addCustom = (item: string, list: string[], setList: (v: string[]) => void) => {
    const trimmed = item.trim();
    if (trimmed && !list.includes(trimmed)) setList([...list, trimmed]);
  };

  const filteredSubjects = ALL_SUBJECTS.filter(s => !selectedSubjects.includes(s) && s.toLowerCase().includes(subjectQuery.toLowerCase()));
  const filteredSkills = ALL_SKILLS.filter(s => !selectedSkills.includes(s) && s.toLowerCase().includes(skillQuery.toLowerCase()));

  const Chip = ({ label, sel, onClick }: { label: string; sel: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick}
      className={`relative overflow-hidden px-4 py-2.5 rounded-[10px] font-matter text-[13px] font-medium cursor-pointer transition-all active:scale-[0.97] ${
        sel ? 'bg-white text-[#0a0a0a] shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#CBD5E1]'
      }`}
      style={sel ? { border: '1.5px solid rgba(0,0,0,0.08)' } : {}}>
      {sel && (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, rgba(249,115,22,0.08) 30%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 85% 100%, rgba(59,130,246,0.12) 0%, transparent 55%)' }} />
        </>
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );

  const Tag = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
    <span className="relative overflow-hidden inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full font-matter text-[12px] font-medium text-[#0a0a0a] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
      style={{ border: '1.5px solid rgba(0,0,0,0.06)' }}>
      <span className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.15) 0%, transparent 65%)' }} />
      <span className="relative z-10">{label}</span>
      <button type="button" onClick={onRemove} className="relative z-10 w-4 h-4 rounded-full bg-[#F1F5F9] flex items-center justify-center hover:bg-[#E2E8F0] cursor-pointer transition-colors">
        <X size={8} weight="bold" className="text-[#94A3B8]" />
      </button>
    </span>
  );



  // Extra subjects/skills that aren't in the popular list
  const extraSubjects = selectedSubjects.filter(s => !POPULAR_SUBJECTS.includes(s));
  const extraSkills = selectedSkills.filter(s => !POPULAR_SKILLS.includes(s));

  return (
    <div className="max-w-[520px] mx-auto px-8 py-16">
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">
        What can you teach?
      </h1>
      <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">
        Select from popular options or add your own. You can update these later.
      </p>

      {/* Subjects */}
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-matter text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em]">Subjects</span>
          <div className="flex-1 h-px bg-[#F0F0F0]" />
          {selectedSubjects.length > 0 && <span className="font-matter text-[11px] text-[#F97316] font-semibold">{selectedSubjects.length} selected</span>}
        </div>

        <div className="flex flex-wrap gap-2">
          {POPULAR_SUBJECTS.map(s => <Chip key={s} label={s} sel={selectedSubjects.includes(s)} onClick={() => toggle(s, selectedSubjects, setSelectedSubjects)} />)}
        </div>

        {/* Extra tags */}
        {extraSubjects.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {extraSubjects.map(s => <Tag key={s} label={s} onRemove={() => setSelectedSubjects(selectedSubjects.filter(x => x !== s))} />)}
          </div>
        )}

        {/* Add more */}
        {!showSubjectSearch ? (
          <button type="button" onClick={() => setShowSubjectSearch(true)}
            className="mt-3 flex items-center gap-1.5 font-matter text-[12px] font-medium text-[#F97316] hover:text-[#EA580C] cursor-pointer transition-colors">
            <Plus size={12} weight="bold" /> Add more subjects
          </button>
        ) : (
          <div className="mt-2 rounded-[12px] border border-[#E2E8F0] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#F0F0F0]">
              <MagnifyingGlass size={14} className="text-[#94A3B8] shrink-0" />
              <input ref={subjectInputRef} type="text" value={subjectQuery} onChange={e => setSubjectQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && subjectQuery.trim()) { addCustom(subjectQuery, selectedSubjects, setSelectedSubjects); setSubjectQuery(''); } if (e.key === 'Escape') { setShowSubjectSearch(false); setSubjectQuery(''); } }}
                placeholder="Search or type a custom subject..."
                className="flex-1 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent" />
              <button type="button" onMouseDown={e => { e.preventDefault(); setShowSubjectSearch(false); setSubjectQuery(''); }} className="text-[#94A3B8] hover:text-[#64748B] cursor-pointer"><X size={14} /></button>
            </div>
            <div className="max-h-[180px] overflow-y-auto">
              {filteredSubjects.length > 0 ? filteredSubjects.slice(0, 8).map(s => (
                <button key={s} type="button" onMouseDown={e => { e.preventDefault(); toggle(s, selectedSubjects, setSelectedSubjects); setSubjectQuery(''); }}
                  className="w-full px-4 py-2.5 text-left font-matter text-[13px] text-[#475569] hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                  {s}
                </button>
              )) : subjectQuery.trim() ? (
                <button type="button" onMouseDown={e => { e.preventDefault(); addCustom(subjectQuery, selectedSubjects, setSelectedSubjects); setSubjectQuery(''); }}
                  className="w-full px-4 py-2.5 text-left font-matter text-[13px] text-[#F97316] hover:bg-[#FFF7ED] cursor-pointer transition-colors flex items-center gap-2">
                  <Plus size={12} weight="bold" /> Add &quot;{subjectQuery.trim()}&quot;
                </button>
              ) : (
                <p className="px-4 py-3 font-matter text-[12px] text-[#CBD5E1]">Type to search or add a custom subject</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-matter text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em]">Skills</span>
          <div className="flex-1 h-px bg-[#F0F0F0]" />
          {selectedSkills.length > 0 && <span className="font-matter text-[11px] text-[#F97316] font-semibold">{selectedSkills.length} selected</span>}
        </div>

        <div className="flex flex-wrap gap-2">
          {POPULAR_SKILLS.map(s => <Chip key={s} label={s} sel={selectedSkills.includes(s)} onClick={() => toggle(s, selectedSkills, setSelectedSkills)} />)}
        </div>

        {extraSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {extraSkills.map(s => <Tag key={s} label={s} onRemove={() => setSelectedSkills(selectedSkills.filter(x => x !== s))} />)}
          </div>
        )}

        {!showSkillSearch ? (
          <button type="button" onClick={() => setShowSkillSearch(true)}
            className="mt-3 flex items-center gap-1.5 font-matter text-[12px] font-medium text-[#F97316] hover:text-[#EA580C] cursor-pointer transition-colors">
            <Plus size={12} weight="bold" /> Add more skills
          </button>
        ) : (
          <div className="mt-2 rounded-[12px] border border-[#E2E8F0] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#F0F0F0]">
              <MagnifyingGlass size={14} className="text-[#94A3B8] shrink-0" />
              <input ref={skillInputRef} type="text" value={skillQuery} onChange={e => setSkillQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && skillQuery.trim()) { addCustom(skillQuery, selectedSkills, setSelectedSkills); setSkillQuery(''); } if (e.key === 'Escape') { setShowSkillSearch(false); setSkillQuery(''); } }}
                placeholder="Search or type a custom skill..."
                className="flex-1 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent" />
              <button type="button" onMouseDown={e => { e.preventDefault(); setShowSkillSearch(false); setSkillQuery(''); }} className="text-[#94A3B8] hover:text-[#64748B] cursor-pointer"><X size={14} /></button>
            </div>
            <div className="max-h-[180px] overflow-y-auto">
              {filteredSkills.length > 0 ? filteredSkills.slice(0, 8).map(s => (
                <button key={s} type="button" onMouseDown={e => { e.preventDefault(); toggle(s, selectedSkills, setSelectedSkills); setSkillQuery(''); }}
                  className="w-full px-4 py-2.5 text-left font-matter text-[13px] text-[#475569] hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                  {s}
                </button>
              )) : skillQuery.trim() ? (
                <button type="button" onMouseDown={e => { e.preventDefault(); addCustom(skillQuery, selectedSkills, setSelectedSkills); setSkillQuery(''); }}
                  className="w-full px-4 py-2.5 text-left font-matter text-[13px] text-[#F97316] hover:bg-[#FFF7ED] cursor-pointer transition-colors flex items-center gap-2">
                  <Plus size={12} weight="bold" /> Add &quot;{skillQuery.trim()}&quot;
                </button>
              ) : (
                <p className="px-4 py-3 font-matter text-[12px] text-[#CBD5E1]">Type to search or add a custom skill</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between mt-12">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" disabled={total === 0} onClick={() => onNext([...selectedSubjects, ...selectedSkills])}
          className={`px-8 py-3 rounded-full font-matter text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            total > 0 ? 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]' : 'bg-[#ddd] text-[#aaa] cursor-not-allowed'
          }`}>
          Continue <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}
