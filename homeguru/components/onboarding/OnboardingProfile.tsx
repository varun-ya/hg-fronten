'use client';
import React, { useState, useEffect } from 'react';
import { Cake, CaretDown, MagnifyingGlass, CheckCircle, X } from '@phosphor-icons/react';
import { LEARNER_CATEGORIES } from './stepData';

interface Props { onNext: (category: number) => void; onBack: () => void; }

const LOCATION_API = 'https://countriesnow.space/api/v0.1';
const FALLBACK_COUNTRIES = ['India', 'United States', 'United Kingdom', 'UAE', 'Australia', 'Canada', 'Singapore', 'Germany'];

function age(d: Date): number {
  const n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  if (n.getMonth() < d.getMonth() || (n.getMonth() === d.getMonth() && n.getDate() < d.getDate())) a--;
  return a;
}

// Category indices: 0=Student, 1=Aspirant, 2=College Student, 3=Working Professional, 4=Homemaker, 5=Sr. Citizen
function guessCategory(a: number): number {
  if (a <= 22) return 0;  // Student
  if (a <= 60) return 3;  // Working Professional
  return 5;               // Sr. Citizen
}

export default function OnboardingProfile({ onNext, onBack }: Props) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [dobStr, setDobStr] = useState('');
  const [gender, setGender] = useState<number | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [tried, setTried] = useState(false);

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [noStates, setNoStates] = useState(false);

  const [searchModal, setSearchModal] = useState<{ title: string; items: string[]; onSelect: (v: string) => void } | null>(null);
  const [searchQ, setSearchQ] = useState('');
  const [prefLangs, setPrefLangs] = useState<string[]>([]);
  const [langInput, setLangInput] = useState('');
  const [langDropOpen, setLangDropOpen] = useState(false);

  const LANG_CHIPS = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'];
  const ALL_LANGS = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi', 'Urdu', 'Odia', 'Assamese', 'Konkani', 'Maithili', 'Nepali', 'Sanskrit', 'Sindhi', 'Bodo', 'Dogri', 'Kashmiri', 'Manipuri', 'Santali', 'Arabic', 'French', 'German', 'Spanish', 'Japanese', 'Korean', 'Mandarin', 'Portuguese', 'Russian'];
  const filteredDropLangs = ALL_LANGS.filter(l => !prefLangs.includes(l) && l.toLowerCase().includes(langInput.toLowerCase()));

  const toggleLang = (lang: string) => setPrefLangs(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  const addCustomLang = () => {
    const v = langInput.trim();
    if (!v || prefLangs.some(l => l.toLowerCase() === v.toLowerCase())) return;
    setPrefLangs(prev => [...prev, v]);
    setLangInput(''); setLangDropOpen(false);
  };

  useEffect(() => {
    fetch(`${LOCATION_API}/countries/positions`).then(r => r.json())
      .then(d => { if (!d.error) setCountries((d.data as { name: string }[]).map(e => e.name).sort()); })
      .catch(() => setCountries(FALLBACK_COUNTRIES));
  }, []);

  const fetchStates = async (c: string) => {
    setLoadingStates(true);
    setNoStates(false);
    try {
      const r = await fetch(`${LOCATION_API}/countries/states/q?country=${encodeURIComponent(c)}`);
      const d = await r.json();
      if (!d.error) {
        const list = (d.data.states as { name: string }[]).map(e => e.name).sort();
        setStates(list);
        if (list.length === 0) setNoStates(true);
      } else { setStates([]); setNoStates(true); }
    } catch { setStates([]); setNoStates(true); }
    setLoadingStates(false);
  };

  const fetchCities = async (c: string, s: string) => {
    setLoadingCities(true);
    try {
      const r = await fetch(`${LOCATION_API}/countries/state/cities/q?country=${encodeURIComponent(c)}&state=${encodeURIComponent(s)}`);
      const d = await r.json();
      if (!d.error) setCities((d.data as string[]).sort());
      else setCities([]);
    } catch { setCities([]); }
    setLoadingCities(false);
  };

  const nameErr = (v: string) => v.trim().length < 2 ? (v.trim() ? 'Too short' : 'Required') : null;
  // Country is required. State/city only required if the country has states.
  const canProceed = !nameErr(first) && !nameErr(last) && dob && gender !== null && category !== null && country && prefLangs.length > 0;

  const handleDobChange = (val: string) => {
    setDobStr(val);
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      setDob(d);
      const a = age(d);
      const cat = guessCategory(a);
      setCategory(cat);
    }
  };

  const handleGender = (g: number) => {
    setGender(g);
  };

  const handleContinue = () => { setTried(true); if (canProceed && category !== null) onNext(category); };

  const openCountryPicker = () => {
    setSearchModal({
      title: 'Select country',
      items: countries,
      onSelect: (v) => { setCountry(v); setState(null); setCity(null); setStates([]); setCities([]); setNoStates(false); fetchStates(v); setSearchModal(null); },
    });
  };

  const openStatePicker = () => {
    if (!country || noStates || loadingStates) return;
    setSearchModal({
      title: 'Select state',
      items: states,
      onSelect: (v) => { setState(v); setCity(null); setCities([]); fetchCities(country!, v); setSearchModal(null); },
    });
  };

  const openCityPicker = () => {
    if (!state || loadingCities) return;
    setSearchModal({
      title: 'Select city',
      items: cities,
      onSelect: (v) => { setCity(v); setSearchModal(null); },
    });
  };

  const inputCls = (hasErr: boolean) =>
    `w-full px-4 py-[13px] rounded-[12px] border font-matter text-[14px] text-[#0F172A] placeholder-[#CBD5E1] outline-none transition-all focus:border-[#0F172A] focus:shadow-[0_0_0_3px_rgba(15,23,42,0.06)] ${hasErr ? 'border-[#EF4444]' : 'border-[#E2E8F0]'} bg-white`;

  const genderChip = (label: string, idx: number) => {
    const on = gender === idx;
    return (
      <button key={idx} type="button" onClick={() => handleGender(idx)}
        className={`relative overflow-hidden flex-1 py-[14px] rounded-[14px] font-matter text-[14px] text-center cursor-pointer transition-all duration-200 active:scale-[0.97] ${on ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] font-semibold text-[#0a0a0a]' : 'bg-white text-[#1A1A1A]'}`}
        style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid #E5E7EB' }}>
        {on && (
          <>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
          </>
        )}
        <span className="relative z-10">{label}</span>
      </button>
    );
  };

  const pickerBtn = (value: string | null, hint: string, onClick: () => void, enabled = true) => (
    <button type="button" onClick={enabled ? onClick : undefined}
      className={`relative overflow-hidden w-full flex items-center justify-between px-[18px] py-[14px] rounded-[14px] border font-matter text-[14px] transition-all duration-200 ${enabled ? 'cursor-pointer' : 'cursor-not-allowed'} ${value ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : ''}`}
      style={{
        background: enabled ? (value ? 'white' : 'white') : '#F3F4F6',
        border: value ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid #E5E7EB',
        color: value ? '#0a0a0a' : '#9CA3AF',
        fontWeight: value ? 600 : 400,
      }}>
      {value && (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
        </>
      )}
      <span className="relative z-10">{value || hint}</span>
      <CaretDown size={16} className="relative z-10 text-[#9CA3AF]" />
    </button>
  );

  const filteredSearch = searchQ
    ? (searchModal?.items ?? []).filter(i => i.toLowerCase().includes(searchQ.toLowerCase()))
    : (searchModal?.items ?? []);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="pt-7 px-7">
        <h1 className="font-season text-[26px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">About you</h1>
        <p className="font-matter text-[13px] text-[#94A3B8] mt-1.5">This helps us personalise everything.</p>
      </div>

      <div className="flex-1 overflow-y-auto w-full px-6 mt-5 space-y-2.5 pb-2">
        {/* Name */}
        <div>
        <label className="font-matter text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] mb-1.5 block pl-1">Full Name</label>
        <div className="flex gap-2">
          <input type="text" value={first} onChange={e => setFirst(e.target.value)} placeholder="First name"
            className={inputCls(tried && !!nameErr(first))} />
          <input type="text" value={last} onChange={e => setLast(e.target.value)} placeholder="Last name"
            className={inputCls(tried && !!nameErr(last))} />
        </div></div>

        {/* DOB */}
        <div><label className="font-matter text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] mb-1.5 block pl-1">Date of Birth</label>
        <div className={`relative overflow-hidden flex items-center gap-2.5 px-[18px] py-[14px] rounded-[14px] border transition-all duration-200 ${dob ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : tried && !dob ? 'border-[#EF4444] border-[1.5px]' : 'border-[#E5E7EB]'} bg-white`}
          style={{ border: dob ? '1.5px solid rgba(0,0,0,0.08)' : undefined }}>
          {dob && (
            <>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
            </>
          )}
          <Cake size={18} className={`relative z-10 ${dob ? 'text-[#F97316]' : 'text-[#9CA3AF]'}`} />
          <input type="text" value={dobStr} onChange={e => {
            let val = e.target.value.replace(/[^0-9]/g, '');
            if (val.length >= 2) val = val.slice(0, 2) + '-' + val.slice(2);
            if (val.length >= 5) val = val.slice(0, 5) + '-' + val.slice(5, 9);
            setDobStr(val);
            if (val.length === 10) {
              const [d, m, y] = val.split('-').map(Number);
              const date = new Date(y, m - 1, d);
              if (!isNaN(date.getTime()) && date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d) {
                setDob(date);
                const a = age(date);
                setCategory(guessCategory(a));
              } else {
                setDob(null);
              }
            } else {
              setDob(null);
            }
          }}
            placeholder="DD-MM-YYYY"
            maxLength={10}
            className={`relative z-10 flex-1 font-matter text-[14px] outline-none bg-transparent ${dob ? 'text-[#0a0a0a] font-semibold' : 'text-[#9CA3AF]'}`} />
          {dob && (
            <>
              <span className="relative z-10 font-matter text-[13px] text-[#F97316] font-medium">{age(dob)} yrs</span>
              <CheckCircle size={18} weight="fill" className="relative z-10 text-[#F97316]" />
            </>
          )}
        </div></div>

        {/* Gender */}
        <div><label className="font-matter text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] mb-1.5 block pl-1">Gender</label>
        <div className="flex gap-2">
          {genderChip('Male', 0)}
          {genderChip('Female', 1)}
          {genderChip('Other', 2)}
        </div></div>

        {/* Category */}
        <div><label className="font-matter text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] mb-1.5 block pl-1">I am a...</label>
        <div className={`relative overflow-hidden flex items-center px-[18px] rounded-[14px] border transition-all duration-200 bg-white ${category !== null ? 'shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : tried && category === null ? 'border-[#EF4444] border-[1.5px]' : 'border-[#E5E7EB]'}`}
          style={{ border: category !== null ? '1.5px solid rgba(0,0,0,0.08)' : undefined }}>
          {category !== null && (
            <>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
            </>
          )}
          <select value={category ?? ''} onChange={e => setCategory(e.target.value ? Number(e.target.value) : null)}
            className={`relative z-10 w-full py-[14px] font-matter text-[14px] outline-none bg-transparent appearance-none cursor-pointer ${category !== null ? 'text-[#0a0a0a] font-semibold' : 'text-[#9CA3AF]'}`}>
            <option value="" disabled>I am a...</option>
            {LEARNER_CATEGORIES.map((c, i) => <option key={c} value={i}>{c}</option>)}
          </select>
          <CaretDown size={16} className="relative z-10 text-[#9CA3AF] shrink-0" />
        </div></div>

        {/* Location */}
        <div><label className="font-matter text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] mb-1.5 block pl-1">Location</label>
        {pickerBtn(country, 'Country', openCountryPicker)}
        {!noStates && (
          <div className="flex gap-2">
            {pickerBtn(
              loadingStates ? 'Loading...' : state,
              'State',
              openStatePicker,
              !!country && !loadingStates && !noStates && states.length > 0
            )}
            {pickerBtn(
              loadingCities ? 'Loading...' : city,
              'City',
              openCityPicker,
              !!state && !loadingCities
            )}
          </div>
        )}
        {noStates && country && (
          <p className="font-matter text-[11px] text-[#9CA3AF] pl-1">No states/provinces for {country}</p>
        )}</div>

        {/* Preferred Language — hybrid: chips + dropdown */}
        <div className="pt-1">
          <label className="font-matter text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[0.08em] mb-2 block pl-1">Preferred Language</label>

          {/* Quick-pick chips */}
          <div className="flex flex-wrap gap-2">
            {LANG_CHIPS.map(lang => {
              const on = prefLangs.includes(lang);
              return (
                <button key={lang} type="button" onClick={() => toggleLang(lang)}
                  className={`relative overflow-hidden px-4 py-[10px] rounded-full font-matter text-[13px] cursor-pointer transition-all duration-200 active:scale-[0.95] ${
                    on ? 'font-semibold text-[#0a0a0a] shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'text-[#6B7280]'
                  }`}
                  style={{ border: on ? '1.5px solid rgba(0,0,0,0.08)' : '1px solid #E5E7EB' }}>
                  {on && (
                    <>
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, transparent 65%)' }} />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                    </>
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {lang}
                    {on && <X size={10} weight="bold" className="text-[#9CA3AF]" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Searchable dropdown for more languages */}
          <div className="relative mt-2.5">
            <div className={`flex items-center gap-2 px-[18px] py-[12px] rounded-[14px] border bg-white transition-colors ${langDropOpen ? 'border-[#D1D5DB] shadow-[0_0_0_3px_rgba(0,0,0,0.03)]' : 'border-[#E5E7EB]'}`}>
              <MagnifyingGlass size={15} className="text-[#9CA3AF] shrink-0" />
              <input type="text" value={langInput}
                onChange={e => { setLangInput(e.target.value); setLangDropOpen(true); }}
                onFocus={() => setLangDropOpen(true)}
                onBlur={() => setTimeout(() => setLangDropOpen(false), 150)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomLang(); } }}
                placeholder="Search or type a language..."
                className="flex-1 font-matter text-[13px] text-[#1A1A1A] placeholder-[#9CA3AF] outline-none bg-transparent" />
              <CaretDown size={14} className="text-[#9CA3AF] shrink-0" style={{ transform: langDropOpen ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }} />
            </div>
            {langDropOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-[#E5E7EB] overflow-hidden z-50 max-h-[160px] overflow-y-auto">
                {filteredDropLangs.length > 0 ? filteredDropLangs.map(l => (
                  <button key={l} type="button" onMouseDown={() => { toggleLang(l); setLangInput(''); setLangDropOpen(false); }}
                    className="w-full px-4 py-2.5 text-left font-matter text-[13px] text-[#374151] cursor-pointer transition-colors hover:bg-[#F9FAFB] flex items-center justify-between">
                    {l}
                    {prefLangs.includes(l) && <CheckCircle size={14} weight="fill" className="text-[#F97316]" />}
                  </button>
                )) : langInput.trim() ? (
                  <button type="button" onMouseDown={addCustomLang}
                    className="w-full px-4 py-3 text-left font-matter text-[13px] text-[#F97316] font-semibold cursor-pointer hover:bg-[#FFF7ED]">
                    + Add &ldquo;{langInput.trim()}&rdquo;
                  </button>
                ) : (
                  <p className="px-4 py-3 font-matter text-[13px] text-[#9CA3AF] text-center">Type to search</p>
                )}
              </div>
            )}
          </div>

          {/* Selected tags (for non-chip languages) */}
          {prefLangs.filter(l => !LANG_CHIPS.includes(l)).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {prefLangs.filter(l => !LANG_CHIPS.includes(l)).map(l => (
                <span key={l} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] font-matter text-[12px] font-medium text-[#0a0a0a]">
                  {l}
                  <button type="button" onClick={() => toggleLang(l)} className="text-[#9CA3AF] hover:text-[#EF4444] cursor-pointer transition-colors"><X size={10} weight="bold" /></button>
                </span>
              ))}
            </div>
          )}

          {tried && prefLangs.length === 0 && <p className="font-matter text-[11px] text-[#EF4444] pl-1 mt-1.5">Select at least one language</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full px-6 pb-5 pt-2 space-y-2">
        <button type="button" onClick={handleContinue}
          className="w-full py-4 rounded-full font-matter text-[16px] font-bold text-white transition-all active:scale-[0.97] cursor-pointer"
          style={{ background: '#0a0a0a', opacity: canProceed ? 1 : 0.25 }}>
          Continue
        </button>
        <button type="button" onClick={onBack} className="w-full font-matter text-[11px] text-[#999] hover:text-[#555] cursor-pointer text-center">Back</button>
      </div>

      {/* Search Modal */}
      {searchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5" onClick={() => { setSearchModal(null); setSearchQ(''); }}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white w-full max-w-[400px] rounded-[24px] max-h-[70vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-5 pt-5 pb-2">
              <div className="flex items-center gap-2 px-3.5 py-3 rounded-[14px] bg-[#F3F4F6]">
                <MagnifyingGlass size={16} className="text-[#9CA3AF] shrink-0" />
                <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} autoFocus
                  placeholder={`Search ${searchModal.title.toLowerCase().replace('select ', '')}`}
                  className="flex-1 font-matter text-[14px] text-[#1A1A1A] placeholder-[#9CA3AF] outline-none bg-transparent" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-3">
              {filteredSearch.length === 0 ? (
                <p className="px-6 py-6 font-matter text-[14px] text-[#9CA3AF] text-center">No results</p>
              ) : filteredSearch.map(item => (
                <button key={item} type="button" onClick={() => { searchModal.onSelect(item); setSearchQ(''); }}
                  className="w-full px-5 py-2.5 text-left font-matter text-[14px] text-[#1A1A1A] hover:bg-[#F9FAFB] cursor-pointer">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
