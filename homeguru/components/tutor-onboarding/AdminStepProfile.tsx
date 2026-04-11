'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Plus, X, FilePdf, Image as ImageIcon, UploadSimple, CaretDown, PencilSimple, MagnifyingGlass, CheckCircle, User, MapPin, Translate, Article, Certificate } from '@phosphor-icons/react';

const PROFICIENCY_LEVELS = ['Native', 'Professional', 'Good', 'Intermediate', 'Beginner'];

const LANGUAGES_LIST = [
  'Assamese', 'Bengali', 'Bodo', 'Dogri', 'English', 'French', 'German',
  'Gujarati', 'Hindi', 'Japanese', 'Kannada', 'Kashmiri', 'Konkani',
  'Korean', 'Maithili', 'Malayalam', 'Mandarin', 'Manipuri', 'Marathi',
  'Nepali', 'Odia', 'Portuguese', 'Punjabi', 'Russian', 'Sanskrit',
  'Santali', 'Sindhi', 'Spanish', 'Tamil', 'Telugu', 'Urdu',
];

interface Props { onNext: () => void; onBack: () => void; }

export default function AdminStepProfile({ onNext, onBack }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [languages, setLanguages] = useState<{ lang: string; level: string }[]>([]);
  const [about, setAbout] = useState('');
  const [docs, setDocs] = useState<{ name: string; size: number; type: string }[]>([]);
  const [tried, setTried] = useState(false);

  const [showLangSearch, setShowLangSearch] = useState(false);
  const [langQuery, setLangQuery] = useState('');
  const [pickingLevelFor, setPickingLevelFor] = useState('');
  const langInputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  // API-driven location data (same API as mobile app)
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/positions')
      .then(r => r.json())
      .then(d => { if (!d.error) setCountries((d.data as { name: string }[]).map(c => c.name).sort()); })
      .catch(() => setCountries(['India', 'United States', 'United Kingdom', 'UAE', 'Australia', 'Canada', 'Singapore', 'Germany']));
  }, []);

  useEffect(() => {
    if (!country) { setStates([]); return; }
    setLoadingStates(true);
    fetch(`https://countriesnow.space/api/v0.1/countries/states/q?country=${country}`)
      .then(r => r.json())
      .then(d => { if (!d.error) setStates((d.data.states as { name: string }[]).map(s => s.name).sort()); })
      .catch(() => setStates([]))
      .finally(() => setLoadingStates(false));
  }, [country]);

  useEffect(() => {
    if (!country || !state) { setCities([]); return; }
    setLoadingCities(true);
    fetch(`https://countriesnow.space/api/v0.1/countries/state/cities/q?country=${country}&state=${state}`)
      .then(r => r.json())
      .then(d => { if (!d.error) setCities((d.data as string[]).sort()); })
      .catch(() => setCities([]))
      .finally(() => setLoadingCities(false));
  }, [country, state]);

  const filteredCountries = countrySearch ? countries.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())) : countries;
  const filteredStates = stateSearch ? states.filter(s => s.toLowerCase().includes(stateSearch.toLowerCase())) : states;
  const filteredCities = citySearch ? cities.filter(c => c.toLowerCase().includes(citySearch.toLowerCase())) : cities;

  const nameErr = (v: string) => v.trim().length < 2 ? 'Required' : null;
  const canProceed = nameErr(firstName) === null && nameErr(lastName) === null && gender !== '' && country !== '' && languages.length > 0 && about.trim().length >= 20;

  const filteredLangs = langQuery
    ? LANGUAGES_LIST.filter(l => l.toLowerCase().includes(langQuery.toLowerCase()) && !languages.some(x => x.lang === l))
    : LANGUAGES_LIST.filter(l => !languages.some(x => x.lang === l));
  const canAddCustomLang = langQuery.trim() && !LANGUAGES_LIST.some(l => l.toLowerCase() === langQuery.trim().toLowerCase()) && !languages.some(x => x.lang.toLowerCase() === langQuery.trim().toLowerCase());

  const selectLang = (lang: string) => { setShowLangSearch(false); setLangQuery(''); setPickingLevelFor(lang); };
  const removeLang = (lang: string) => setLanguages(languages.filter(l => l.lang !== lang));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newDocs = Array.from(files).filter(f => /\.(pdf|jpg|jpeg|png|webp)$/i.test(f.name)).filter(f => !docs.some(d => d.name === f.name)).map(f => ({ name: f.name, size: f.size, type: f.type }));
    setDocs(prev => [...prev, ...newDocs]);
    e.target.value = '';
  };

  const fmtSize = (bytes: number) => bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  const handleContinue = () => { setTried(true); if (canProceed) onNext(); };

  const inp = 'w-full px-4 py-3 rounded-[12px] font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none border border-[#E2E8F0] bg-white focus:border-[#0a0a0a] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)] transition-all';

  const sectionHead = (icon: React.ReactNode, text: string, done?: boolean) => (
    <div className="flex items-center gap-3 mb-3">
      <div className={`flex items-center gap-2 ${done ? 'text-[#22C55E]' : 'text-[#0F172A]'}`}>
        {done ? <CheckCircle size={14} weight="fill" className="text-[#22C55E]" /> : icon}
        <span className="font-matter text-[11px] font-semibold uppercase tracking-[0.1em]">{text}</span>
      </div>
      <span className="flex-1 h-px bg-[#F0F0F0]" />
    </div>
  );

  return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      <style>{`input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 40px #fff inset!important;-webkit-text-fill-color:#0F172A!important;font-family:inherit!important;}`}</style>

      <p className="font-matter text-[12px] font-semibold text-[#F97316] uppercase tracking-[0.12em]">Tutor Onboarding</p>
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-3">About you</h1>
      <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">This helps us set up your tutor profile.</p>

      {/* ── Name ── */}
      <div className="mt-10">
        {sectionHead(<User size={13} className="text-[#94A3B8]" />, 'Name', !!firstName.trim() && !!lastName.trim() && !nameErr(firstName) && !nameErr(lastName))}
        <div className="flex gap-3">
          <div className="flex-1">
            <input className={`${inp} ${tried && nameErr(firstName) ? 'border-[#DC2626]' : ''}`} value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" autoComplete="off" />
            {tried && nameErr(firstName) && <p className="font-matter text-[11px] text-[#DC2626] mt-1.5 ml-1">Required</p>}
          </div>
          <div className="flex-1">
            <input className={`${inp} ${tried && nameErr(lastName) ? 'border-[#DC2626]' : ''}`} value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" autoComplete="off" />
            {tried && nameErr(lastName) && <p className="font-matter text-[11px] text-[#DC2626] mt-1.5 ml-1">Required</p>}
          </div>
        </div>

        {/* Gender */}
        <div className="flex gap-2 mt-3">
          {['Male', 'Female', 'Other'].map(g => (
            <button key={g} type="button" onClick={() => setGender(g)}
              className={`relative overflow-hidden flex-1 py-2.5 rounded-[10px] font-matter text-[13px] font-medium cursor-pointer transition-all active:scale-[0.97] ${gender === g ? 'text-[#0a0a0a] shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
              style={gender === g ? { border: '1.5px solid rgba(0,0,0,0.08)' } : {}}>
              {gender === g && (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.1) 0%, transparent 55%)' }} />
                </>
              )}
              <span className="relative z-10">{g}</span>
            </button>
          ))}
        </div>
        {tried && !gender && <p className="font-matter text-[11px] text-[#DC2626] mt-1.5 ml-1">Required</p>}
      </div>

      {/* ── Location ── */}
      <div className="mt-6">
        {sectionHead(<MapPin size={13} className="text-[#94A3B8]" />, 'Location', !!country)}

        {/* Country */}
        <div className="relative">
          <button type="button" onClick={() => { setCountryOpen(o => !o); setCountrySearch(''); }}
            className={`${inp} flex items-center justify-between cursor-pointer text-left ${tried && !country ? 'border-[#DC2626]' : country ? 'border-[#BBF7D0] bg-[#FAFFFE]' : ''}`}>
            <span className={country ? 'text-[#0F172A] font-medium' : 'text-[#CBD5E1]'}>{country || 'Select country'}</span>
            {country ? <CheckCircle size={14} weight="fill" className="text-[#22C55E]" /> : <CaretDown size={12} weight="bold" className="text-[#94A3B8]" />}
          </button>
          {countryOpen && (
            <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50 border border-[#E2E8F0]">
              <div className="px-3 py-2.5 border-b border-[#F0F0F0]">
                <div className="flex items-center gap-2">
                  <MagnifyingGlass size={13} className="text-[#94A3B8] shrink-0" />
                  <input type="text" value={countrySearch} onChange={e => setCountrySearch(e.target.value)} placeholder="Search country" autoFocus
                    className="flex-1 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none" />
                </div>
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                {filteredCountries.length > 0 ? filteredCountries.map(c => (
                  <button key={c} type="button" onMouseDown={() => { setCountry(c); setCountryOpen(false); setState(''); setCity(''); setCountrySearch(''); }}
                    className={`w-full px-4 py-3 text-left font-matter text-[13px] cursor-pointer transition-colors hover:bg-[#F8FAFC] ${country === c ? 'text-[#F97316] font-semibold bg-[#FFF7ED]' : 'text-[#475569]'}`}>{c}</button>
                )) : <p className="px-4 py-3 font-matter text-[12px] text-[#CBD5E1]">No results</p>}
              </div>
            </div>
          )}
        </div>
        {tried && !country && <p className="font-matter text-[11px] text-[#DC2626] mt-1.5 ml-1">Required</p>}

        {/* State + City */}
        <div className="flex gap-3 mt-3">
          {/* State dropdown */}
          <div className={`flex-1 relative ${!country ? 'opacity-40 pointer-events-none' : ''}`}>
            <button type="button" onClick={() => { setStateOpen(o => !o); setStateSearch(''); }}
              className={`${inp} flex items-center justify-between cursor-pointer text-left ${state ? 'border-[#BBF7D0] bg-[#FAFFFE]' : ''}`}>
              <span className={state ? 'text-[#0F172A] font-medium' : 'text-[#CBD5E1]'}>{loadingStates ? 'Loading...' : state || 'State'}</span>
              <CaretDown size={12} weight="bold" className="text-[#94A3B8]" />
            </button>
            {stateOpen && states.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50 border border-[#E2E8F0]">
                <div className="px-3 py-2.5 border-b border-[#F0F0F0]">
                  <div className="flex items-center gap-2">
                    <MagnifyingGlass size={13} className="text-[#94A3B8] shrink-0" />
                    <input type="text" value={stateSearch} onChange={e => setStateSearch(e.target.value)} placeholder="Search state" autoFocus
                      className="flex-1 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none" />
                  </div>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {filteredStates.length > 0 ? filteredStates.map(s => (
                    <button key={s} type="button" onMouseDown={() => { setState(s); setStateOpen(false); setCity(''); setStateSearch(''); }}
                      className={`w-full px-4 py-3 text-left font-matter text-[13px] cursor-pointer transition-colors hover:bg-[#F8FAFC] ${state === s ? 'text-[#F97316] font-semibold bg-[#FFF7ED]' : 'text-[#475569]'}`}>{s}</button>
                  )) : <p className="px-4 py-3 font-matter text-[12px] text-[#CBD5E1]">No results</p>}
                </div>
              </div>
            )}
          </div>

          {/* City dropdown */}
          <div className={`flex-1 relative ${!state ? 'opacity-40 pointer-events-none' : ''}`}>
            <button type="button" onClick={() => { setCityOpen(o => !o); setCitySearch(''); }}
              className={`${inp} flex items-center justify-between cursor-pointer text-left ${city ? 'border-[#BBF7D0] bg-[#FAFFFE]' : ''}`}>
              <span className={city ? 'text-[#0F172A] font-medium' : 'text-[#CBD5E1]'}>{loadingCities ? 'Loading...' : city || 'City'}</span>
              <CaretDown size={12} weight="bold" className="text-[#94A3B8]" />
            </button>
            {cityOpen && cities.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50 border border-[#E2E8F0]">
                <div className="px-3 py-2.5 border-b border-[#F0F0F0]">
                  <div className="flex items-center gap-2">
                    <MagnifyingGlass size={13} className="text-[#94A3B8] shrink-0" />
                    <input type="text" value={citySearch} onChange={e => setCitySearch(e.target.value)} placeholder="Search city" autoFocus
                      className="flex-1 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none" />
                  </div>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {filteredCities.length > 0 ? filteredCities.map(c => (
                    <button key={c} type="button" onMouseDown={() => { setCity(c); setCityOpen(false); setCitySearch(''); }}
                      className={`w-full px-4 py-3 text-left font-matter text-[13px] cursor-pointer transition-colors hover:bg-[#F8FAFC] ${city === c ? 'text-[#F97316] font-semibold bg-[#FFF7ED]' : 'text-[#475569]'}`}>{c}</button>
                  )) : <p className="px-4 py-3 font-matter text-[12px] text-[#CBD5E1]">No results</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Languages ── */}
      <div className="mt-6">
        {sectionHead(<Translate size={13} className="text-[#94A3B8]" />, 'Languages', languages.length > 0)}

        {languages.map(l => (
          <div key={l.lang} className="relative overflow-hidden flex items-center gap-3 px-4 py-3 mb-2 rounded-[12px] bg-white transition-all"
            style={{ border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.08) 0%, transparent 65%)' }} />
            <span className="relative z-10 font-matter text-[13px] font-semibold text-[#0F172A]">{l.lang}</span>
            <span className="relative z-10 font-matter text-[11px] text-[#94A3B8]">·</span>
            <span className="relative z-10 font-matter text-[12px] text-[#64748B]">{l.level}</span>
            <span className="flex-1" />
            <button type="button" onClick={() => setPickingLevelFor(l.lang)} className="relative z-10 text-[#94A3B8] hover:text-[#64748B] cursor-pointer"><PencilSimple size={12} /></button>
            <button type="button" onClick={() => removeLang(l.lang)} className="relative z-10 text-[#94A3B8] hover:text-[#DC2626] cursor-pointer"><X size={12} weight="bold" /></button>
          </div>
        ))}

        {/* Proficiency picker */}
        {pickingLevelFor && (
          <div className="mb-3 rounded-[12px] border border-[#E2E8F0] bg-white overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <p className="px-4 py-3 font-matter text-[13px] font-semibold text-[#0F172A] border-b border-[#F0F0F0]">How well do you speak {pickingLevelFor}?</p>
            {PROFICIENCY_LEVELS.map(level => (
              <button key={level} type="button" onClick={() => {
                const existing = languages.find(l => l.lang === pickingLevelFor);
                if (existing) setLanguages(languages.map(l => l.lang === pickingLevelFor ? { ...l, level } : l));
                else setLanguages([...languages, { lang: pickingLevelFor, level }]);
                setPickingLevelFor('');
              }}
                className="w-full px-4 py-3 text-left font-matter text-[13px] text-[#475569] hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                {level}
              </button>
            ))}
          </div>
        )}

        {/* Language search */}
        {showLangSearch ? (
          <div className="rounded-[12px] border border-[#E2E8F0] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#F0F0F0]">
              <MagnifyingGlass size={14} className="text-[#94A3B8] shrink-0" />
              <input ref={langInputRef} type="text" value={langQuery} onChange={e => setLangQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Escape') { setShowLangSearch(false); setLangQuery(''); } }}
                placeholder="Search language"
                className="flex-1 font-matter text-[13px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent" autoFocus />
              <button type="button" onMouseDown={e => { e.preventDefault(); setShowLangSearch(false); setLangQuery(''); }} className="text-[#94A3B8] hover:text-[#64748B] cursor-pointer"><X size={14} /></button>
            </div>
            <div className="max-h-[180px] overflow-y-auto">
              {canAddCustomLang && (
                <button type="button" onMouseDown={e => { e.preventDefault(); selectLang(langQuery.trim()); }}
                  className="w-full px-4 py-2.5 text-left font-matter text-[13px] text-[#F97316] hover:bg-[#FFF7ED] cursor-pointer transition-colors flex items-center gap-2">
                  <Plus size={12} weight="bold" /> Add &quot;{langQuery.trim()}&quot;
                </button>
              )}
              {filteredLangs.slice(0, 8).map(l => (
                <button key={l} type="button" onMouseDown={e => { e.preventDefault(); selectLang(l); }}
                  className="w-full px-4 py-2.5 text-left font-matter text-[13px] text-[#475569] hover:bg-[#F8FAFC] cursor-pointer transition-colors">{l}</button>
              ))}
              {filteredLangs.length === 0 && !canAddCustomLang && <p className="px-4 py-3 font-matter text-[12px] text-[#CBD5E1]">No results</p>}
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setShowLangSearch(true)}
            className="relative overflow-hidden w-full py-2.5 rounded-[10px] font-matter text-[13px] font-semibold text-[#0a0a0a] cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.1)]"
            style={{ border: '1.5px solid rgba(0,0,0,0.08)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.1) 0%, transparent 55%)' }} />
            <Plus size={14} weight="bold" className="relative z-10" />
            <span className="relative z-10">Add language</span>
          </button>
        )}
        {tried && languages.length === 0 && <p className="font-matter text-[11px] text-[#DC2626] mt-1.5 ml-1">Add at least one language</p>}
      </div>

      {/* ── About ── */}
      <div className="mt-6">
        {sectionHead(<Article size={13} className="text-[#94A3B8]" />, 'About', about.trim().length >= 20)}
        <textarea value={about} onChange={e => setAbout(e.target.value)}
          placeholder="Write about yourself, your teaching experience, and what makes you a great tutor..."
          rows={4}
          className={`${inp} resize-none ${tried && about.trim().length < 20 ? 'border-[#DC2626]' : about.trim().length >= 20 ? 'border-[#BBF7D0] bg-[#FAFFFE]' : ''}`} />
        <p className={`font-matter text-[11px] mt-1.5 ml-1 ${about.trim().length >= 20 ? 'text-[#22C55E]' : 'text-[#94A3B8]'}`}>
          {about.trim().length >= 20 ? '✓ ' : ''}{about.trim().length}/20 min characters
        </p>
      </div>

      {/* ── Certificates ── */}
      <div className="mt-6">
        {sectionHead(<Certificate size={13} className="text-[#94A3B8]" />, 'Certificates & Qualifications')}
        <p className="font-matter text-[12px] text-[#94A3B8] mb-4">Degrees, certificates, awards — PDFs and images only. Optional — helps build trust with students.</p>

        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" multiple onChange={handleFiles} className="hidden" />

        <div className="flex flex-wrap gap-3">
          {docs.map((doc, i) => {
            const isPdf = doc.name.toLowerCase().endsWith('.pdf');
            return (
              <div key={i} className="relative overflow-hidden w-[110px] rounded-[14px] p-3 flex flex-col items-center gap-2 bg-white"
                style={{ border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(34,197,94,0.1) 0%, transparent 65%)' }} />
                <button type="button" onClick={() => setDocs(docs.filter((_, j) => j !== i))}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center cursor-pointer hover:bg-[#F1F5F9] transition-colors z-10">
                  <X size={8} weight="bold" className="text-[#94A3B8]" />
                </button>
                <div className="relative z-10 w-9 h-9 rounded-[10px] bg-[#F0FDF4] flex items-center justify-center">
                  {isPdf ? <FilePdf size={18} weight="fill" className="text-[#DC2626]" /> : <ImageIcon size={18} weight="fill" className="text-[#22C55E]" />}
                </div>
                <p className="relative z-10 font-matter text-[11px] font-medium text-[#0F172A] text-center leading-tight line-clamp-2">{doc.name}</p>
                <p className="relative z-10 font-matter text-[10px] text-[#94A3B8]">{fmtSize(doc.size)}</p>
              </div>
            );
          })}
          <button type="button" onClick={() => fileRef.current?.click()}
            className="relative overflow-hidden w-[110px] rounded-[14px] border border-[#E2E8F0] bg-white p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all"
            style={{ border: '1.5px solid rgba(0,0,0,0.06)' }}>
            <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.12) 0%, transparent 65%)' }} />
            <div className="relative z-10 w-9 h-9 rounded-[10px] bg-[#FFF7ED] flex items-center justify-center">
              <UploadSimple size={16} weight="bold" className="text-[#F97316]" />
            </div>
            <p className="relative z-10 font-matter text-[12px] font-semibold text-[#F97316]">Upload</p>
            <p className="relative z-10 font-matter text-[10px] text-[#94A3B8]">PDF / Image</p>
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between mt-12">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" onClick={handleContinue}
          className={`px-8 py-3 rounded-full font-matter text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${canProceed ? 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]' : 'bg-[#ddd] text-[#aaa] cursor-not-allowed'}`}>
          Continue <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}
