'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ArrowLeft, Code, Clock, CheckCircle, ShieldCheck, Camera, Microphone, GearSix, RocketLaunch, Envelope, ListChecks, Warning, Monitor, CalendarBlank } from '@phosphor-icons/react';
import Step7IDE from '@/components/coding-challenge/Step7IDE';

const CODING_SUBJECTS = ['Computer Science', 'Coding', 'Web Development', 'App Development', 'Python', 'JavaScript', 'Data Science', 'AI/ML'];

interface Props { subjects?: string[]; onNext: () => void; onBack: () => void; }

export default function AdminStep4QualificationTest({ subjects = [], onNext, onBack }: Props): React.ReactNode {
  const isCoding = subjects.some(s => CODING_SUBJECTS.includes(s));
  const [sub, setSub] = useState(0); // 0=intro, 1=instructions, 2=permissions, 3=ready+env, 7=ide, 8=submitted, 10=mcq, 11=written, 21=schedulePicker, 22=linkSent, 23=completed
  const [screenGranted, setScreenGranted] = useState(false);
  const [camGranted, setCamGranted] = useState(false);
  const [envProgress, setEnvProgress] = useState(0);
  const [envReady, setEnvReady] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(isCoding ? 45 * 60 : 15 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recChunks = useRef<Blob[]>([]);
  const camStreamRef = useRef<MediaStream | null>(null);
  const [mcqCurrent, setMcqCurrent] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [writtenCurrent, setWrittenCurrent] = useState(0);
  const [writtenAnswers, setWrittenAnswers] = useState<Record<number, string>>({});
  const [schedDate, setSchedDate] = useState('');
  const [schedTime, setSchedTime] = useState('');
  const [countdown, setCountdown] = useState(30);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // ── Camera PiP hooks (must be before any early returns) ──
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const secureCanvasRef = useRef<HTMLCanvasElement>(null);
  const secureVideoRef = useRef<HTMLVideoElement>(null);
  const pipDivRef   = useRef<HTMLDivElement>(null);
  const pipDragging = useRef(false);
  const pipDragOffset = useRef({ x: 0, y: 0 });
  const pipStream   = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (sub !== 10 && sub !== 11) {
      if (pipStream.current) { pipStream.current.getTracks().forEach(t => t.stop()); pipStream.current = null; }
      return;
    }
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        pipStream.current = s;
        if (pipVideoRef.current) pipVideoRef.current.srcObject = s;
      } catch {}
    })();
    return () => { if (pipStream.current) { pipStream.current.getTracks().forEach(t => t.stop()); pipStream.current = null; } };
  }, [sub]);



  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!pipDragging.current || !pipDivRef.current) return;
      pipDivRef.current.style.left = (e.clientX - pipDragOffset.current.x) + 'px';
      pipDivRef.current.style.top  = (e.clientY - pipDragOffset.current.y) + 'px';
    };
    const up = () => { pipDragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  const onPipDown = (e: React.MouseEvent) => {
    pipDragging.current = true;
    const r = pipDivRef.current?.getBoundingClientRect();
    pipDragOffset.current = { x: e.clientX - (r?.left ?? 0), y: e.clientY - (r?.top ?? 0) };
    e.preventDefault();
  };

  const [tabWarnings, setTabWarnings] = useState(0);
  const [ssWarnings, setSsWarnings] = useState(0);
  const [showCheatWarning, setShowCheatWarning] = useState('');
  const [windowFocused, setWindowFocused] = useState(true);

  useEffect(() => {
    if (sub !== 10 && sub !== 11) return;

    // 1. Tab switch detection
    const onVisibility = () => {
      if (document.hidden) {
        setTabWarnings(w => {
          const next = w + 1;
          if (next >= 3) {
            setShowCheatWarning('Test terminated due to repeated tab switching.');
            setTimeout(() => { setTimerRunning(false); stopAllStreams(); setSub(8); }, 2000);
          } else {
            setShowCheatWarning(`Tab switch detected! Warning ${next}/3 — test will be terminated on the 3rd switch.`);
            setTimeout(() => setShowCheatWarning(''), 4000);
          }
          return next;
        });
      }
    };

    // 2. Block right-click
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    // 3. Block copy / cut
    const onCopy = (e: ClipboardEvent) => { e.preventDefault(); };
    const onCut  = (e: ClipboardEvent) => { e.preventDefault(); };

    // 4. Block screenshot shortcuts (PrintScreen, Ctrl+P, Ctrl+Shift+S, Win+Shift+S)
    const onKeyDown = (e: KeyboardEvent) => {
      const ssKeys =
        e.key === 'PrintScreen' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 's' || e.key === 'S' || e.key === '4' || e.key === '3'));
      if (ssKeys) {
        e.preventDefault();
        setWindowFocused(false);
        setSsWarnings(prev => {
          const next = prev + 1;
          if (next >= 2) {
            setShowCheatWarning('Test terminated: screenshot detected.');
            setTimeout(() => { setTimerRunning(false); stopAllStreams(); setSub(8); }, 2000);
          } else {
            setShowCheatWarning('⚠️ Screenshot detected! Next screenshot will terminate your test.');
            setTimeout(() => { setWindowFocused(true); setShowCheatWarning(''); }, 3000);
          }
          return next;
        });
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') { e.preventDefault(); }
    };

    let blurTime = 0;
    const onBlur = () => {
      blurTime = Date.now();
      setWindowFocused(false);
    };
    const onFocus = () => {
      const elapsed = Date.now() - blurTime;
      setWindowFocused(true);
      // Very short blur (< 1200ms) = likely screenshot tool, not tab switch
      if (elapsed < 1200 && elapsed > 0) {
        setSsWarnings(prev => {
          const next = prev + 1;
          if (next >= 2) {
            setShowCheatWarning('Test terminated: screenshot detected.');
            setTimeout(() => { setTimerRunning(false); stopAllStreams(); setSub(8); }, 2000);
          } else {
            setShowCheatWarning('⚠️ Screenshot detected! Next screenshot will terminate your test.');
            setTimeout(() => setShowCheatWarning(''), 4000);
          }
          return next;
        });
      }
    };
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('copy', onCopy);
    document.addEventListener('cut', onCut);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('cut', onCut);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, [sub]);

  const PipCamera = () => !mounted ? null : createPortal(
    <div ref={pipDivRef} onMouseDown={onPipDown}
      className="fixed z-[99999]"
      style={{ right: 24, bottom: 80, cursor: 'grab', width: 160, height: 120 }}>
      <div className="relative w-full h-full rounded-[14px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-2 border-white/20">
        <video ref={pipVideoRef} autoPlay muted playsInline
          className="w-full h-full object-cover bg-[#0a0a0a]"
          style={{ transform: 'scaleX(-1)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
        <div className="absolute top-2 left-2.5 flex items-center gap-1.5">
          <span className="w-[6px] h-[6px] rounded-full bg-[#EF4444] animate-pulse" />
          <span className="text-[9px] font-bold text-white/90 tracking-wide">LIVE</span>
        </div>
        <div className="absolute bottom-2 left-2.5">
          <span className="text-[9px] text-white/50">Drag to move</span>
        </div>
      </div>
    </div>,
    document.body
  );

  useEffect(() => {
    if (timerRunning) startRecording();
    else stopRecording();
  }, [timerRunning]);

  useEffect(() => { if (timerRunning && timerSeconds > 0) { intervalRef.current = setInterval(() => { setTimerSeconds(s => { if (s <= 1) { clearInterval(intervalRef.current!); stopAllStreams(); setSub(8); return 0; } return s - 1; }); }, 1000); } return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, [timerRunning]);
  useEffect(() => { if (sub === 3 && !envReady) { const iv = setInterval(() => { setEnvProgress(p => { if (p >= 100) { clearInterval(iv); setEnvReady(true); return 100; } return p + 3; }); }, 60); return () => clearInterval(iv); } }, [sub, envReady]);

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const allowScreen = async () => { try { const s = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false }); screenStreamRef.current = s; setScreenGranted(true); } catch { setScreenGranted(true); } };
  const allowCam = async () => { try { const s = await navigator.mediaDevices.getUserMedia({ video: { width: 160, height: 120, facingMode: 'user' }, audio: true }); camStreamRef.current = s; if (pipVideoRef.current) { pipVideoRef.current.srcObject = s; } setCamGranted(true); } catch { setCamGranted(true); } };

  const startRecording = () => {
    if (recorderRef.current) return;
    recChunks.current = [];
    const tracks: MediaStreamTrack[] = [];
    if (screenStreamRef.current) screenStreamRef.current.getTracks().filter(t => t.readyState === 'live').forEach(t => tracks.push(t));
    if (pipStream.current) pipStream.current.getVideoTracks().filter(t => t.readyState === 'live').forEach(t => tracks.push(t));
    if (tracks.length === 0) { console.warn('[HomeGuru] No active tracks — recording skipped'); return; }
    const stream = new MediaStream(tracks);
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
    const rec = new MediaRecorder(stream, { mimeType: mime });
    rec.ondataavailable = e => { if (e.data.size > 0) recChunks.current.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(recChunks.current, { type: 'video/webm' });
      console.log('[HomeGuru] Recording ready —', (blob.size / 1024 / 1024).toFixed(2) + ' MB');
      // Auto-download — replace with API upload when backend ready
      // TODO: POST /api/recordings with FormData({ recording: blob })
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'homeguru-test-' + Date.now() + '.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    };
    rec.start(1000);
    recorderRef.current = rec;
    console.log('[HomeGuru] Screen recording started');
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
      recorderRef.current = null;
    }
  };

  const stopAllStreams = () => {
    // Stop screen share
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(t => t.stop());
      screenStreamRef.current = null;
    }
    // Stop camera/mic
    if (pipStream.current) {
      pipStream.current.getTracks().forEach(t => t.stop());
      pipStream.current = null;
    }
    stopRecording();
  };

  const Nav = ({ back, next, nextLabel = 'Next', disabled = false }: { back: () => void; next: () => void; nextLabel?: string; disabled?: boolean }) => (
    <div className="flex items-center justify-between mt-10">
      <button type="button" onClick={back} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors"><ArrowLeft size={14} /> Back</button>
      <button type="button" disabled={disabled} onClick={next}
        className={`px-8 py-3 rounded-full font-matter text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${disabled ? 'bg-[#ddd] text-[#aaa] cursor-not-allowed' : 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]'}`}>
        {nextLabel} <ArrowRight size={15} weight="bold" />
      </button>
    </div>
  );

  // MCQ Questions — JEE Advanced style: multi-layered situational, analytical, ethical, mixed types
  const mcqQuestions = [
    {
      type: 'Analytical Reasoning',
      scenario: 'Rohan is a Class 11 student preparing for JEE Advanced. He has been your student for 5 months. In the first 3 months, his Physics scores improved from 28% to 61% in mock tests. However, over the last 2 months, despite attending all sessions and completing every assignment, his scores have stagnated between 58–62%. You analyse his last 4 mock papers carefully. You notice: (1) He solves straightforward application problems correctly 85% of the time. (2) He consistently fails multi-concept problems that require combining two or more chapters — e.g., a problem linking Rotational Mechanics with Energy Conservation. (3) His time per question has increased by 40% compared to 3 months ago, suggesting he is second-guessing himself. (4) He scores full marks in chapter-end tests you conduct but drops sharply in full-length mocks. His JEE Advanced attempt is in 6 months.',
      q: 'Which of the following most accurately identifies the root cause of the plateau AND prescribes the most targeted intervention?',
      opts: [
        'He has hit a natural ceiling at his current effort level; the solution is to increase session frequency from 3 to 5 days per week and assign 30% more problems.',
        'The gap between chapter-level mastery and full-mock performance indicates he has learned concepts in isolation but lacks the ability to build cross-chapter mental models; the intervention is to introduce weekly “bridge problems” that explicitly require combining 2–3 chapters, and to train him to identify which concepts a problem is testing before attempting it.',
        'His increasing time-per-question is the primary issue; he should be drilled on speed through timed 10-question sprints until his pace returns to the earlier level.',
        'The stagnation is likely due to exam anxiety in full-length settings; he should be referred to a counsellor and given easier mocks to rebuild confidence before returning to JEE-level difficulty.'
      ]
    },
    {
      type: 'Ethical Dilemma',
      scenario: 'You are a tutor teaching Priya (Class 12, CBSE) in Mathematics. Three days before her board exam, her mother calls you in a panic and says: "Priya has been telling me she understands everything, but I just found out she has been copying your solutions without understanding them. She scored 34/100 in a surprise test her school conducted yesterday. She hasn\'t told you because she\'s scared you\'ll stop teaching her. Please just give her the most likely questions and make her memorise the solutions — she just needs to pass." You know Priya personally — she is genuinely anxious and has been under pressure from her family to score 90+. You also know that rote-memorising solutions 3 days before boards is a high-risk strategy that could backfire if questions are slightly twisted.',
      q: 'What is the most professionally and ethically sound course of action given the constraints?',
      opts: [
        'Comply with the mother\'s request — give Priya a list of high-probability questions with model answers to memorise, since the exam is too close for any other strategy to work.',
        'Refuse to help with memorisation, explain to the mother that this approach is harmful, and instead spend the 3 days doing rapid concept reinforcement on the highest-weightage topics — while being honest with Priya that you know about the gap, and reframing the goal from 90% to a confident, honest attempt.',
        'Inform the school about Priya\'s situation so they can provide additional support during the exam period.',
        'Continue sessions as normal without addressing the issue, since confronting Priya 3 days before the exam could increase her anxiety and make things worse.'
      ]
    },
    {
      type: 'Multi-Constraint Planning',
      scenario: 'You have just taken on a new student: Aditya, Class 10, preparing for CBSE boards in 4 months. His mother shares the following data: (a) Last year\'s report card — Maths: 51%, Science: 48%, English: 72%, Social Science: 65%, Hindi: 70%. (b) His school teacher says he “understands in class but can\'t reproduce it in exams.” (c) Aditya himself says he “studies for 3 hours every night but forgets everything by morning.” (d) You give him a 20-minute diagnostic: he solves procedural problems correctly but cannot explain why a method works; when you change the numbers in a problem he just solved, he treats it as a completely new problem. (e) You have 4 sessions per week, 90 minutes each. The family expects at least 75% in Maths and Science.',
      q: 'Based on this diagnostic profile, which session structure for the first 6 weeks would most effectively address the core learning deficit?',
      opts: [
        'Dedicate all 4 sessions to Maths and Science equally (2 each), covering the syllabus chapter by chapter from the beginning to ensure full coverage before boards.',
        'Identify that Aditya\'s core deficit is procedural learning without conceptual anchoring — causing rapid forgetting. Structure sessions so that every new procedure is immediately followed by a “why does this work?” discussion, a varied-number drill, and a next-session recall check. Prioritise the highest-weightage chapters in Maths and Science first, and assign spaced-repetition revision tasks between sessions.',
        'Focus the first 6 weeks entirely on exam technique — teach him how to attempt papers, manage time, and use elimination strategies, since his understanding is adequate but his exam performance is weak.',
        'Since English, Hindi, and Social Science are already above 65%, drop those subjects entirely and use all 4 sessions for Maths and Science to maximise improvement in the weakest areas.'
      ]
    },
    {
      type: 'Cause Identification',
      scenario: 'You are teaching a group of 6 Class 9 students in an online session on Algebra — specifically, solving linear equations with variables on both sides. You explain the concept clearly with two examples. You then give the group a practice problem: 3x + 7 = 5x − 9. After 4 minutes, you ask for answers. The results are: Student A: x = 8 (correct). Student B: x = −8. Student C: x = 1. Student D: x = 8 (correct). Student E: no answer, says “I don\'t know where to start.” Student F: x = 16. You have 25 minutes left in the session.',
      q: 'Which of the following correctly identifies the distinct error types present in this group AND the most efficient way to address all of them within the remaining time?',
      opts: [
        'All incorrect students made the same sign error; re-explain the rule for moving terms across the equals sign once for the whole group, then give another practice problem.',
        'The errors are heterogeneous: Student B likely made a sign error when transposing (−2x = −16 → x = −8), Student C likely stopped after one step or made an arithmetic error, Student F likely added instead of subtracting when collecting terms, and Student E has a foundational gap in understanding the process. The most efficient approach is to do a 3-minute whole-group walkthrough of the solution step-by-step while narrating the reasoning, then pair Student E with Student A for a guided re-attempt, and give Students B, C, F a targeted 2-problem drill on the specific operation where each went wrong.',
        'Since 2 out of 6 students got it right, the concept was explained adequately; move on and assign the remaining students extra homework problems to self-correct.',
        'Stop the group session and conduct individual 5-minute check-ins with each incorrect student to diagnose their specific error before proceeding.'
      ]
    },
    {
      type: 'Situational Judgement',
      scenario: 'You have been tutoring Ishaan (Class 12) in Chemistry for 7 months, with a focus on JEE preparation. He is exceptionally talented — he consistently scores 85–90% in your sessions and has a deep intuitive grasp of Organic Chemistry. Two months before JEE Mains, his father calls you and says: "I want you to shift all focus to Physical Chemistry and Inorganic Chemistry. Organic is his strength — he doesn\'t need more time there. He\'s weak in Electrochemistry and p-Block elements, and those are guaranteed questions." You know from your sessions that Ishaan\'s Organic Chemistry, while strong, has 2–3 specific gaps in Named Reactions and Stereochemistry that could cost him 8–12 marks in JEE Advanced. You also know that Electrochemistry and p-Block are genuinely weak and need work. The father is paying ₹3,500/hour and is very assertive.',
      q: 'How should you handle this conflict between the parent\'s instruction and your professional assessment?',
      opts: [
        'Follow the father\'s instruction completely — he is the client, he is paying, and it is not your place to override a parent\'s decision about their child\'s preparation strategy.',
        'Present the father with a data-backed case: show him Ishaan\'s specific Organic gaps with estimated mark impact, agree that Electrochemistry and p-Block need urgent attention, and propose a revised split (e.g., 60% Physical+Inorganic, 40% targeted Organic gap-filling) — framing it as maximising Ishaan\'s total score rather than contradicting the father.',
        'Discuss the situation privately with Ishaan and let him decide, since he is the one taking the exam and is old enough to make this call.',
        'Agree with the father in the meeting but continue your original balanced plan in sessions, since you are the subject expert and the father\'s strategy is suboptimal.'
      ]
    },
    {
      type: 'Pedagogical Design',
      scenario: 'You are designing a 12-session module to teach Coordinate Geometry to a Class 11 student, Nisha, who is preparing for both CBSE boards and JEE Mains. Her profile: (a) Strong in Algebra and Trigonometry. (b) Weak in visualising geometric relationships — she can apply distance and section formulas but cannot intuitively see why a locus forms a particular shape. (c) She tends to memorise standard results without deriving them. (d) In JEE Mains, Coordinate Geometry typically contributes 3–4 questions (12–16 marks). (e) She has 8 weeks, with sessions on Monday, Wednesday, and Friday. You must cover: Straight Lines, Circles, Parabola, Ellipse, and Hyperbola.',
      q: 'Which sequencing and pedagogical approach would most effectively build both board-level and JEE-level competency within the 12-session constraint?',
      opts: [
        'Follow the NCERT chapter order (Straight Lines → Circles → Conics) and spend equal time on each topic, ensuring full syllabus coverage before attempting JEE-level problems.',
        'Begin each new curve by having Nisha derive its equation from the geometric definition (e.g., “a parabola is the locus of points equidistant from a focus and directrix”) using her Algebra strength — this directly addresses her visualisation deficit. Sequence topics by conceptual dependency (Straight Lines → Circles → Parabola → Ellipse → Hyperbola), allocate more sessions to Circles and Parabola (highest JEE weightage), and in the final 2 sessions run mixed-topic problems that require connecting multiple curves.',
        'Since JEE Mains only has 3–4 questions from this chapter, spend 8 sessions on the highest-frequency JEE question types (tangents, normals, chord of contact) and only 4 sessions on CBSE-specific content.',
        'Identify the 10 most commonly repeated JEE Mains questions from Coordinate Geometry over the last 5 years and build the entire module around solving and memorising those question patterns.'
      ]
    },
    {
      type: 'Conflict Resolution',
      scenario: 'You are running a 4-student online group for Class 10 board preparation. The group has been together for 3 months. During a session on Chemical Reactions and Equations, Kabir (the strongest student) begins answering every question before others have a chance to think. When you ask the group a question and wait, Kabir answers within 5 seconds every time. You notice: Divya has stopped attempting answers altogether and just waits for Kabir. Sameer has started giving wrong answers quickly, seemingly just to participate before Kabir. Tara looks visibly frustrated and once muttered “what\'s the point.” Kabir is not being malicious — he is genuinely enthusiastic. His parents are paying for the group session specifically because they want him in a competitive peer environment.',
      q: 'What is the most effective intervention that preserves Kabir\'s engagement, restores participation from the other three, and maintains group cohesion?',
      opts: [
        'Privately message Kabir after the session and ask him to hold back his answers — this is the least disruptive approach and avoids embarrassing him in front of peers.',
        'Restructure question delivery: assign each question to a specific student by name before opening it to the group, introduce a “think time” rule (30 seconds of silence before anyone answers), and redirect Kabir\'s energy by giving him extension or harder follow-up questions after the group has answered — framing it as a challenge rather than a restriction.',
        'Remove Kabir from the group and suggest his parents move him to a more advanced batch, since his presence is objectively harming the other students\' learning.',
        'Let the dynamic continue — competitive environments are healthy, and the other students need to learn to compete; intervening would reduce the group\'s overall pace.'
      ]
    },
    {
      type: 'Diagnostic Reasoning',
      scenario: 'You are a Maths tutor. A new student, Farah (Class 9), is referred to you by a school counsellor with the note: “Struggling with Maths, possible dyscalculia.” In your first session, you observe the following: (1) She can read and write numbers correctly. (2) She can add and subtract single-digit numbers accurately but makes frequent errors with two-digit mental arithmetic. (3) She cannot recall multiplication tables beyond 5×5 reliably. (4) When you show her a number line and ask her to place 47, she places it correctly. (5) She solves a simple word problem (“If you have 3 bags with 6 apples each, how many apples total?”) correctly by drawing it out, but cannot write 3×6 = 18 from memory. (6) She becomes visibly anxious when you use the word “test.” Her school wants a progress report in 6 weeks.',
      q: 'Based solely on your observations, which conclusion and teaching approach is most justified?',
      opts: [
        'The evidence is consistent with dyscalculia; you should refer her to a specialist before beginning any teaching, as proceeding without a formal diagnosis could cause harm.',
        'Her profile suggests a working memory and retrieval deficit rather than a fundamental number-sense impairment — she can place numbers on a line and solve problems visually, indicating intact conceptual understanding. Begin with low-anxiety, visual and manipulative-based methods, build multiplication fluency through patterns and skip-counting rather than rote recall, and avoid timed drills. Reassess in 3 weeks before drawing conclusions about dyscalculia.',
        'Since she can solve word problems by drawing, her Maths ability is fundamentally intact; the issue is purely anxiety. Focus all sessions on confidence-building activities and avoid any formal Maths content for the first 3 weeks.',
        'Her inability to recall multiplication tables is the root cause of all her difficulties; dedicate the first 6 weeks entirely to drilling times tables until she can recall all facts up to 12×12 from memory.'
      ]
    },
    {
      type: 'Long-term Strategy',
      scenario: 'You are tutoring twins — Aryan and Aanya (both Class 11) — in the same Physics batch. Their mother enrolled them together to save cost. After 2 months, a clear divergence has emerged: Aryan grasps concepts quickly, asks probing questions, and is ready for JEE Advanced-level problems. Aanya understands concepts after 2–3 repetitions, needs more worked examples, and is currently at a solid CBSE board level. In joint sessions, you observe: when you pitch at Aryan\'s level, Aanya disengages and looks lost; when you pitch at Aanya\'s level, Aryan finishes tasks in 2 minutes and starts distracting Aryan. The mother has explicitly said she cannot afford separate sessions and wants both children taught together. You have 60-minute sessions, 3 times a week.',
      q: 'Which session design best serves both students within the single-batch constraint?',
      opts: [
        'Pitch all sessions at Aanya\'s level to ensure she is not left behind, and give Aryan additional self-study material to work on independently after sessions.',
        'Split each 60-minute session into two phases: a 35-minute shared conceptual segment (pitched at CBSE+ level, accessible to both) followed by a 25-minute parallel track where Aryan works on a JEE Advanced extension problem independently while you do a targeted reinforcement drill with Aanya — then reconvene for a 5-minute joint discussion where Aryan explains his approach to Aanya.',
        'Inform the mother that teaching twins of different levels in the same batch is pedagogically impossible and insist on separate sessions, even if it means losing the client.',
        'Alternate session focus week by week — one week pitched at Aryan\'s level, the next at Aanya\'s — so both students get equal attention over time.'
      ]
    },
    {
      type: 'Professional Judgement',
      scenario: 'You have been teaching Siddharth (Class 12) in Biology for 4 months, targeting NEET. He is hardworking, attends every session, and completes all assignments. His mock NEET scores have improved from 180/720 to 340/720. Three weeks before NEET, his father calls you and says: "I\'ve heard from another parent that a tutor in our city guarantees 600+ scores and has a 90% success rate. I\'m thinking of switching Siddharth to him for the final 3 weeks. What do you think?" You know that: (a) Switching tutors 3 weeks before NEET is a high-disruption decision. (b) Siddharth has built a specific revision rhythm and shorthand system with you. (c) The “guaranteed 600+” claim is almost certainly a marketing exaggeration. (d) Siddharth himself has not raised any dissatisfaction with you. (e) At 340/720, Siddharth is on a strong upward trajectory but 600+ in 3 weeks would require an unrealistic 260-point jump.',
      q: 'How should you respond to the father?',
      opts: [
        'Strongly discourage the switch and tell the father the other tutor\'s claim is fraudulent, to protect your client relationship.',
        'Acknowledge the father\'s desire for the best outcome for Siddharth, present the data on his trajectory honestly (180 → 340 in 4 months), explain the specific risks of disrupting a student\'s revision system 3 weeks before a high-stakes exam, flag that a 260-point jump in 3 weeks is statistically improbable regardless of tutor, and leave the final decision to the family — without disparaging the other tutor.',
        'Agree that the other tutor sounds impressive and offer to connect the father with him, demonstrating that you prioritise Siddharth\'s success over your own business.',
        'Tell the father you will match whatever the other tutor is offering in terms of guaranteed outcomes, to retain the student.'
      ]
    },
  ];

  const writtenQuestions = [
    {
      label: 'Diagnostic & Intervention',
      scenario: 'You have just started teaching Meera, a Class 10 student, in Mathematics. Her mother tells you she has been scoring between 38-45% in school exams for the past two years, despite attending tuition with two previous tutors. In your first session, you give her a 15-minute diagnostic. You observe: she can add and subtract fractions correctly, but when you ask her to solve a simple linear equation like 2x + 5 = 13, she subtracts 5 from the left side but adds 5 to the right side. She has a fundamental misconception about the balance property of equations. When you ask her to explain what she did, she says "I just do what the teacher showed." She has no conceptual model for why any step works. Her board exam is in 5 months. The syllabus includes Algebra, Geometry, Trigonometry, Statistics, and Coordinate Geometry.',
      q: '(a) What is the root cause of her persistent underperformance, and how does it differ from simply not studying enough? (b) How would you structure the first 4 weeks of sessions to fix the foundational gap without falling behind on the board syllabus? (c) After 6 weeks, her school test scores have not improved despite clear progress in your sessions. How do you handle this with the student and with the parent?',
    },
    {
      label: 'Parent Conflict & Professional Integrity',
      scenario: 'You are tutoring Arjun, a Class 12 student, in Physics for JEE Mains. He is 5 months into preparation with you. His mock test scores have improved from 22% to 51% over this period. Two weeks before JEE Mains, his father calls you and says: "I have been told by a neighbour that their child\'s tutor guarantees 90 percentile. My son is at 51% — clearly your teaching is not working. I want you to give Arjun the most likely questions and make him memorise solutions for the next two weeks. If he does not hit 80 percentile, I am holding you responsible." You know that Arjun\'s improvement from 22% to 51% in 5 months is objectively strong. Memorising solutions 2 weeks before JEE is a high-risk strategy that can backfire on twisted questions. The guaranteed 90 percentile claim is almost certainly a marketing exaggeration. Arjun himself has not expressed any dissatisfaction and trusts your approach.',
      q: '(a) How do you handle this conversation with the father — what do you say, how do you present data, and how do you manage the emotional pressure without being defensive? (b) What is your actual preparation strategy for the final 2 weeks, and why is it better than the father\'s suggestion? (c) Where do you draw the professional line between accommodating a parent\'s request and compromising your pedagogical integrity?',
    },
  ];

  // IDE portal
  if (sub === 7 && mounted) return createPortal(<div className="fixed inset-0 z-[9999]"><Step7IDE timer={fmt(timerSeconds)} timerSeconds={timerSeconds} onSubmit={() => { setTimerRunning(false); stopAllStreams(); setSub(8); }} /></div>, document.body);

  // MCQ full-screen portal
  if (sub === 10 && mounted) {
    const q = mcqQuestions[mcqCurrent];
    const isLow = timerSeconds < 120;
    const answered = Object.keys(mcqAnswers).length;
    return createPortal(
      <div className="test-shield fixed inset-0 z-[9999] bg-white font-matter flex flex-col overflow-hidden" style={{ userSelect: 'none' }}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fade-up{animation:fadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both}.no-scroll::-webkit-scrollbar{display:none}.no-scroll{-ms-overflow-style:none;scrollbar-width:none}@keyframes toastIn{from{opacity:0;transform:translate(-50%,-10px)}to{opacity:1;transform:translate(-50%,0)}}@media print{.test-shield{visibility:hidden!important}}.test-shield::after{content:"";position:fixed;inset:0;z-index:2147483647;background:#000;display:none;pointer-events:none}.test-shield:has(video::-webkit-media-controls){display:block}`}</style>
        {showCheatWarning && (
          <div className="fixed top-5 left-1/2 z-[99999] px-5 py-2.5 rounded-full bg-[#0a0a0a] text-white text-[12px] font-semibold font-matter shadow-[0_4px_20px_rgba(0,0,0,0.3)]" style={{ transform: 'translateX(-50%)', animation: 'toastIn 0.3s ease' }}>
            {showCheatWarning}
          </div>
        )}

        {/* Content hidden when window not focused — screenshot protection */}
        {!windowFocused && (
          <div className="fixed inset-0 bg-black z-[999999] flex items-center justify-center pointer-events-none">
            <p className="text-white/30 text-[13px] font-matter">Return to the test window</p>
          </div>
        )}
        {/* Watermark — visible in screenshots, traceable */}
        <div className="fixed inset-0 pointer-events-none z-[99996] overflow-hidden select-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute font-matter font-semibold whitespace-nowrap"
              style={{
                top: `${(i % 6) * 18}%`,
                left: `${Math.floor(i / 6) * 22 - 8}%`,
                transform: 'rotate(-25deg)',
                fontSize: '11px',
                letterSpacing: '0.06em',
                color: 'rgba(0,0,0,0.06)',
                userSelect: 'none',
              }}>
              {`HomeGuru · ${new Date().toLocaleDateString('en-IN')}`}
            </div>
          ))}
        </div>
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#F0F0F0] shrink-0">
          <div className="flex items-center gap-3">
            <img src="/images/homeguru.png" alt="HomeGuru" className="h-[26px] w-auto object-contain" />
            <div className="w-px h-4 bg-[#E5E7EB]" />
            <span className="text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.12em]">Teaching Assessment</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-[#94A3B8]">{answered}/{mcqQuestions.length} answered</span>
              <div className="w-[80px] h-[3px] rounded-full bg-[#F1F5F9] overflow-hidden">
                <div className="h-full rounded-full bg-[#22C55E] transition-all duration-500" style={{ width: `${(answered / mcqQuestions.length) * 100}%` }} />
              </div>
            </div>
            <div className="w-px h-4 bg-[#E5E7EB]" />
            <span className={`text-[22px] font-bold tabular-nums font-mono tracking-tight ${isLow ? 'text-[#DC2626] animate-pulse' : 'text-[#0a0a0a]'}`}>{fmt(timerSeconds)}</span>
          </div>
        </div>
        {/* Question strip */}
        <div className="flex items-center gap-1.5 px-8 py-3 border-b border-[#F8FAFC] bg-[#FAFAFA] shrink-0 overflow-x-auto">
          {mcqQuestions.map((_, i) => (
            <button key={i} type="button" onClick={() => { if (mcqAnswers[i] !== undefined || i <= mcqCurrent) setMcqCurrent(i); }}
              className={`w-8 h-8 rounded-[8px] text-[12px] font-bold transition-all shrink-0 ${i === mcqCurrent ? 'bg-[#0a0a0a] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]' : mcqAnswers[i] !== undefined ? 'bg-[#DCFCE7] text-[#16A34A] cursor-pointer' : 'bg-white text-[#94A3B8] border border-[#E2E8F0]'}`}>{i + 1}</button>
          ))}
        </div>
        {/* Split */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left — scenario */}
          <div className="w-[52%] overflow-y-auto no-scroll border-r border-[#F0F0F0] px-10 py-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#0F172A] text-[10px] font-bold uppercase tracking-[0.1em]">{q.type}</span>
              <span className="text-[11px] text-[#CBD5E1]">·</span>
              <span className="text-[11px] text-[#94A3B8]">Q{mcqCurrent + 1} of {mcqQuestions.length}</span>
            </div>
            <p className="text-[15px] text-[#1E293B] leading-[2.0] font-matter tracking-[-0.01em]">{q.scenario}</p>
            <div className="relative overflow-hidden mt-8 p-5 rounded-[16px] bg-white" style={{ border: '1.5px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(249,115,22,0.12) 0%, transparent 65%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 10% 110%, rgba(139,92,246,0.08) 0%, transparent 55%)' }} />
              <p className="relative z-10 text-[11px] font-bold text-[#F97316] uppercase tracking-[0.1em] mb-2">Question</p>
              <p className="relative z-10 text-[14px] font-medium text-[#374151] leading-[1.7]">{q.q}</p>
            </div>
          </div>
          {/* Right — options */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scroll px-8 py-8 scrollbar-hide">
              <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.1em] mb-5">Select the best answer</p>
              <div className="flex flex-col gap-3">
                {q.opts.map((opt, idx) => {
                  const sel = mcqAnswers[mcqCurrent] === idx;
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <button key={idx} type="button" onMouseDown={e => { e.preventDefault(); setMcqAnswers({ ...mcqAnswers, [mcqCurrent]: idx }); }}
                      className={`relative overflow-hidden text-left w-full px-5 py-4 rounded-[14px] transition-all duration-200 cursor-pointer active:scale-[0.99] fade-up ${sel ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'bg-[#F8FAFC] hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]'}`}
                      style={sel ? { border: '1.5px solid rgba(0,0,0,0.08)' } : { border: '1.5px solid transparent' }}>
                      {sel && (
                        <>
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.25) 0%, rgba(249,115,22,0.08) 30%, transparent 65%)' }} />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.15) 0%, transparent 55%)' }} />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 85% 100%, rgba(59,130,246,0.12) 0%, transparent 55%)' }} />
                        </>
                      )}
                      <span className="relative z-10 flex items-start gap-3.5">
                        <span className={`w-7 h-7 rounded-[8px] flex items-center justify-center text-[12px] font-bold shrink-0 transition-all ${sel ? 'bg-[#0a0a0a] text-white border-transparent' : 'bg-white text-[#94A3B8] border border-[#E2E8F0]'}`}>{letter}</span>
                        <span className={`text-[13.5px] leading-[1.65] pt-[3px] ${sel ? 'text-[#0F172A] font-medium' : 'text-[#475569]'}`}>{opt}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Bottom nav */}
            <div className="flex items-center justify-between px-8 py-4 border-t border-[#F0F0F0] bg-white shrink-0">
              <button type="button" onClick={() => mcqCurrent > 0 ? setMcqCurrent(mcqCurrent - 1) : setSub(3)}
                className="flex items-center gap-1.5 text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
                <ArrowLeft size={14} /> {mcqCurrent > 0 ? 'Previous' : 'Back'}
              </button>
              <button type="button" disabled={mcqAnswers[mcqCurrent] === undefined}
                onClick={() => mcqCurrent < mcqQuestions.length - 1 ? setMcqCurrent(mcqCurrent + 1) : setSub(11)}
                className={`px-7 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${mcqAnswers[mcqCurrent] === undefined ? 'bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed' : 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]'}`}>
                {mcqCurrent < mcqQuestions.length - 1 ? 'Next Question' : 'Written Section'} <ArrowRight size={14} weight="bold" />
              </button>
            </div>
          </div>
        </div>
        {/* Camera PiP */}
        <div ref={pipDivRef} onMouseDown={onPipDown} className="fixed z-[99999]" style={{ right: 24, bottom: 80, cursor: 'grab', width: 160, height: 120 }}>
          <div className="relative w-full h-full rounded-[14px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-2 border-white/20">
            <video ref={pipVideoRef} autoPlay muted playsInline className="w-full h-full object-cover bg-[#0a0a0a]" style={{ transform: 'scaleX(-1)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
            <div className="absolute top-2 left-2.5 flex items-center gap-1.5">
              <span className="w-[6px] h-[6px] rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-[9px] font-bold text-white/90 tracking-wide">LIVE</span>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // Written Questions portal
  if (sub === 11 && mounted) {
    const wq = writtenQuestions[writtenCurrent];
    const isLow = timerSeconds < 120;
    const allAnswered = writtenQuestions.every((_, i) => writtenAnswers[i]?.trim());
    const wordCount = (writtenAnswers[writtenCurrent] || '').trim().split(/\s+/).filter(Boolean).length;
    const parts = wq.q.split(/(?=\([a-c]\))/).filter(Boolean);
    return createPortal(
      <div className="test-shield fixed inset-0 z-[9999] bg-[#FAFAFA] font-matter flex flex-col overflow-hidden" style={{ userSelect: 'none' }}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.q-fade{animation:fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both}.no-scroll::-webkit-scrollbar{display:none}.no-scroll{-ms-overflow-style:none;scrollbar-width:none}@keyframes toastIn{from{opacity:0;transform:translate(-50%,-10px)}to{opacity:1;transform:translate(-50%,0)}}@media print{.test-shield{visibility:hidden!important}}`}</style>
        {!windowFocused && (
          <div className="fixed inset-0 bg-black z-[999999] flex items-center justify-center pointer-events-none">
            <p className="text-white/30 text-[13px] font-matter">Return to the test window</p>
          </div>
        )}
        {/* Watermark — visible in screenshots, traceable */}
        <div className="fixed inset-0 pointer-events-none z-[99996] overflow-hidden select-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute font-matter font-semibold whitespace-nowrap"
              style={{
                top: `${(i % 6) * 18}%`,
                left: `${Math.floor(i / 6) * 22 - 8}%`,
                transform: 'rotate(-25deg)',
                fontSize: '11px',
                letterSpacing: '0.06em',
                color: 'rgba(0,0,0,0.06)',
                userSelect: 'none',
              }}>
              {`HomeGuru · ${new Date().toLocaleDateString('en-IN')}`}
            </div>
          ))}
        </div>
        {showCheatWarning && (
          <div className="fixed top-5 left-1/2 z-[99999] px-5 py-2.5 rounded-full bg-[#0a0a0a] text-white text-[12px] font-semibold font-matter shadow-[0_4px_20px_rgba(0,0,0,0.3)]" style={{ transform: 'translateX(-50%)', animation: 'toastIn 0.3s ease' }}>
            {showCheatWarning}
          </div>
        )}
        {/* Navbar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#F0F0F0] shrink-0">
          <div className="flex items-center gap-3">
            <img src="/images/homeguru.png" alt="HomeGuru" className="h-[26px] w-auto object-contain" />
            <div className="w-px h-4 bg-[#E5E7EB]" />
            <span className="text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.12em]">Written Assessment</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              {writtenQuestions.map((_, i) => (
                <button key={i} type="button" onClick={() => setWrittenCurrent(i)}
                  className={`w-8 h-8 rounded-[8px] text-[12px] font-bold transition-all ${i === writtenCurrent ? 'bg-[#0a0a0a] text-white' : writtenAnswers[i]?.trim() ? 'bg-[#DCFCE7] text-[#16A34A] cursor-pointer' : 'bg-white text-[#94A3B8] border border-[#E2E8F0]'}`}>{i + 1}</button>
              ))}
            </div>
            <div className="w-px h-4 bg-[#E5E7EB]" />
            <span className={`text-[22px] font-bold tabular-nums font-mono tracking-tight ${isLow ? 'text-[#DC2626] animate-pulse' : 'text-[#0a0a0a]'}`}>{fmt(timerSeconds)}</span>
          </div>
        </div>
        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left — question */}
          <div className="w-[44%] overflow-y-auto no-scroll px-8 py-8 border-r border-[#F0F0F0] scrollbar-hide">
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full bg-[#F1F5F9] text-[#0F172A] text-[10px] font-bold uppercase tracking-[0.12em]">{wq.label}</span>
              <span className="text-[11px] text-[#94A3B8]">Question {writtenCurrent + 1} of {writtenQuestions.length}</span>
            </div>
            {/* Scenario card */}
            <div className="relative overflow-hidden rounded-[16px] px-6 py-6 bg-white q-fade mb-6" style={{ border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.15) 0%, transparent 65%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.08) 0%, transparent 55%)' }} />
              <p className="relative z-10 text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.1em] mb-3">Scenario</p>
              <p className="relative z-10 text-[14px] text-[#1E293B] leading-[1.95] font-matter">{wq.scenario}</p>
            </div>
            {/* Task parts */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.12em]">Answer all three parts</p>
              {parts.map((part, pi) => (
                <div key={pi} className="relative overflow-hidden rounded-[14px] px-4 py-4 bg-white q-fade" style={{ border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', animationDelay: `${60 + pi * 60}ms` }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.1) 0%, transparent 65%)' }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.07) 0%, transparent 55%)' }} />
                  <div className="relative z-10 flex items-start gap-3">
                    <span className="relative overflow-hidden w-6 h-6 rounded-[6px] bg-white text-[#0F172A] text-[10px] font-bold flex items-center justify-center shrink-0 mt-[1px]" style={{ border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                      <span className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }} />
                      <span className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.12) 0%, transparent 55%)' }} />
                      <span className="relative z-10">{String.fromCharCode(96 + pi + 1)}</span>
                    </span>
                    <p className="text-[13px] text-[#374151] leading-[1.75]">{part.replace(/^\([a-c]\)\s*/, '')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — answer */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="flex items-center justify-between px-8 py-4 border-b border-[#F0F0F0] shrink-0">
              <div>
                <p className="text-[13px] font-semibold text-[#0a0a0a]">Your Answer</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">Address (a), (b) and (c) clearly</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8FAFC]" style={{ border: '1px solid #E2E8F0' }}>
                  <div className={`w-1.5 h-1.5 rounded-full ${wordCount >= 150 ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`} />
                  <span className={`text-[11px] font-medium tabular-nums font-mono ${wordCount >= 150 ? 'text-[#16A34A]' : 'text-[#94A3B8]'}`}>{wordCount} words</span>
                </div>
                {writtenAnswers[writtenCurrent]?.trim() && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#22C55E]">
                    <CheckCircle size={12} weight="fill" /> Saved
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={writtenAnswers[writtenCurrent] || ''}
                onChange={e => setWrittenAnswers({ ...writtenAnswers, [writtenCurrent]: e.target.value })}
                placeholder={"(a) Begin your first point here...\n\n(b) Continue with your second point...\n\n(c) Address the final part here..."}
                className="absolute inset-0 w-full h-full px-8 py-6 font-matter text-[14.5px] text-[#0F172A] placeholder-[#D1D5DB] outline-none bg-white resize-none leading-[1.9]"
                style={{ border: 'none', userSelect: 'text', pointerEvents: 'auto' }}
              />
            </div>
            <div className="flex items-center justify-between px-8 py-4 border-t border-[#F0F0F0] bg-white shrink-0">
              <button type="button"
                onClick={() => writtenCurrent > 0 ? setWrittenCurrent(writtenCurrent - 1) : (setMcqCurrent(mcqQuestions.length - 1), setSub(10))}
                className="flex items-center gap-1.5 text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors">
                <ArrowLeft size={14} /> {writtenCurrent > 0 ? 'Previous' : 'Back to MCQ'}
              </button>
              {writtenCurrent < writtenQuestions.length - 1 ? (
                <button type="button" disabled={!writtenAnswers[writtenCurrent]?.trim()}
                  onClick={() => setWrittenCurrent(writtenCurrent + 1)}
                  className={`px-7 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${!writtenAnswers[writtenCurrent]?.trim() ? 'bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed' : 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]'}`}>
                  Next Question <ArrowRight size={14} weight="bold" />
                </button>
              ) : (
                <button type="button" disabled={!allAnswered}
                  onClick={() => { setTimerRunning(false); stopAllStreams(); setSub(8); }}
                  className={`px-7 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${!allAnswered ? 'bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed' : 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]'}`}>
                  Submit Test <ArrowRight size={14} weight="bold" />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Camera PiP */}
        <div ref={pipDivRef} onMouseDown={onPipDown} className="fixed z-[99999]" style={{ right: 24, bottom: 80, cursor: 'grab', width: 160, height: 120 }}>
          <div className="relative w-full h-full rounded-[14px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-2 border-white/20">
            <video ref={pipVideoRef} autoPlay muted playsInline className="w-full h-full object-cover bg-[#0a0a0a]" style={{ transform: 'scaleX(-1)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
            <div className="absolute top-2 left-2.5 flex items-center gap-1.5">
              <span className="w-[6px] h-[6px] rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-[9px] font-bold text-white/90 tracking-wide">LIVE</span>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // sub=0 intro
  if (sub === 0) return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      <p className="font-matter text-[12px] font-semibold text-[#F97316] uppercase tracking-[0.12em]">Qualification Test</p>
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-3">
        {isCoding ? 'Coding Challenge' : 'Teaching Assessment'}
      </h1>
      <p className="font-matter text-[15px] text-[#94A3B8] leading-[1.6] mt-3">
        {isCoding ? 'Solve a coding problem to demonstrate your technical skills.' : 'Answer questions to demonstrate your teaching knowledge and approach.'}
      </p>
      <div className="relative overflow-hidden rounded-[16px] px-6 py-5 mt-8 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]" style={{ border: '1.5px solid rgba(0,0,0,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.12) 0%, transparent 55%)' }} />
        <div className="relative z-10 flex items-center gap-6">
          <div>
            <span className="font-matter text-[36px] font-bold text-[#0F172A] leading-none">{isCoding ? '45' : '15'}</span>
            <span className="font-matter text-[13px] text-[#94A3B8] ml-1">min</span>
          </div>
          <div className="w-px h-10 bg-[#F0F0F0]" />
          <div className="flex flex-col gap-1">
            {isCoding ? (
              <><span className="font-matter text-[13px] text-[#475569]">1 coding problem · Python 3</span><span className="font-matter text-[12px] text-[#94A3B8]">Proctored with camera</span></>
            ) : (
              <><span className="font-matter text-[13px] text-[#475569]">10 MCQs + 2 written questions</span><span className="font-matter text-[12px] text-[#94A3B8]">Teaching aptitude &amp; subject knowledge</span></>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 px-4 py-3 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A]">
        <p className="font-matter text-[12px] text-[#92400E] leading-[1.6]"><strong>Note:</strong> 1 attempt every 45 days. Ensure stable internet and a quiet environment.</p>
      </div>

      <div className="flex items-center justify-between mt-10">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors"><ArrowLeft size={14} /> Back</button>
        <button type="button" onClick={() => setSub(1)}
          className="px-8 py-3 rounded-full font-matter text-[13px] font-semibold flex items-center gap-2 bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97] transition-all cursor-pointer">
          Start Now <ArrowRight size={15} weight="bold" />
        </button>
      </div>
      <button type="button" onClick={() => setSub(21)}
        className="relative overflow-hidden w-full mt-3 py-3 rounded-full font-matter text-[13px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.1)]"
          style={{ border: '1.5px solid rgba(0,0,0,0.08)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.1) 0%, transparent 55%)' }} />
          <CalendarBlank size={15} className="relative z-10" /> <span className="relative z-10">Schedule Later</span>
      </button>
    </div>
  );



  // sub=21 schedule picker
  if (sub === 21) {
    const hasDate = !!schedDate;
    const hasTime = !!schedTime;
    return (
      <div className="max-w-[520px] mx-auto px-8 py-14">
        <p className="font-matter text-[12px] font-semibold text-[#F97316] uppercase tracking-[0.12em]">Qualification Test</p>
        <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-3">Schedule Assessment</h1>
        <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">Pick a date and time that works for you.</p>

        <div className="flex flex-col gap-4 mt-10">
          <div className="relative">
            <label className="font-matter text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em] flex items-center gap-2 mb-2"><CalendarBlank size={13} className="text-[#94A3B8]" /> Date</label>
            <div className={`relative overflow-hidden flex items-center gap-3 px-4 py-3.5 rounded-[12px] bg-white transition-all cursor-pointer ${hasDate ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'border border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
              style={hasDate ? { border: '1.5px solid rgba(0,0,0,0.08)' } : {}}>
              {hasDate && (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.1) 0%, transparent 55%)' }} />
                </>
              )}
              <CalendarBlank size={18} weight={hasDate ? 'fill' : 'regular'} className={`relative z-10 shrink-0 ${hasDate ? 'text-[#F97316]' : 'text-[#94A3B8]'}`} />
              <input type="date" value={schedDate} onChange={e => setSchedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0]}
                className="relative z-10 flex-1 font-matter text-[13px] text-[#0F172A] outline-none bg-transparent cursor-pointer" />
              {hasDate && <CheckCircle size={16} weight="fill" className="relative z-10 text-[#22C55E] shrink-0" />}
            </div>
          </div>
          <div className="relative">
            <label className="font-matter text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em] flex items-center gap-2 mb-2"><Clock size={13} className="text-[#94A3B8]" /> Time</label>
            <div className={`relative overflow-hidden flex items-center gap-3 px-4 py-3.5 rounded-[12px] bg-white transition-all cursor-pointer ${hasTime ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'border border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
              style={hasTime ? { border: '1.5px solid rgba(0,0,0,0.08)' } : {}}>
              {hasTime && (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 15% 100%, rgba(139,92,246,0.1) 0%, transparent 55%)' }} />
                </>
              )}
              <Clock size={18} weight={hasTime ? 'fill' : 'regular'} className={`relative z-10 shrink-0 ${hasTime ? 'text-[#F97316]' : 'text-[#94A3B8]'}`} />
              <input type="time" value={schedTime} onChange={e => setSchedTime(e.target.value)}
                className="relative z-10 flex-1 font-matter text-[13px] text-[#0F172A] outline-none bg-transparent cursor-pointer" />
              {hasTime && <CheckCircle size={16} weight="fill" className="relative z-10 text-[#22C55E] shrink-0" />}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-12">
          <button type="button" onClick={() => setSub(0)} className="flex items-center gap-1.5 font-matter text-[13px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer transition-colors"><ArrowLeft size={14} /> Back</button>
          <button type="button" disabled={!hasDate || !hasTime} onClick={() => { setSub(22); setCountdown(30); countdownRef.current = setInterval(() => setCountdown(p => { if (p <= 1) { clearInterval(countdownRef.current!); setSub(23); return 0; } return p - 1; }), 1000); }}
            className={`px-8 py-3 rounded-full font-matter text-[13px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${hasDate && hasTime ? 'bg-[#0a0a0a] text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]' : 'bg-[#ddd] text-[#aaa] cursor-not-allowed'}`}>
            Confirm Schedule <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    );
  }

  // sub=22 schedule confirmed — test link sent
  if (sub === 22) {
    return (
      <div className="max-w-[520px] mx-auto px-8 py-14 flex flex-col items-center text-center min-h-[60vh] justify-center">
        <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center">
          <CheckCircle size={28} weight="fill" className="text-[#22C55E]" />
        </div>
        <h1 className="font-season text-[28px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-5">Test Link Sent!</h1>
        <p className="font-matter text-[13px] text-[#64748B] leading-[1.6] mt-3 max-w-[360px]">The assessment URL has been sent to your WhatsApp and email. Please complete the assessment to move forward.</p>
        <p className="font-matter text-[12px] text-[#94A3B8] mt-2">Scheduled for {schedDate} at {schedTime}</p>
        <div className="flex items-center gap-3 px-5 py-3 rounded-[12px] border border-[#F0F0F0] mt-8">
          <div className="w-5 h-5 rounded-full border-2 border-[#F97316] border-t-transparent animate-spin" />
          <span className="font-matter text-[13px] text-[#64748B]">Waiting for completion... {countdown}s</span>
        </div>
      </div>
    );
  }

  // sub=23 completed (after countdown)
  if (sub === 23) {
    return (
      <div className="max-w-[520px] mx-auto px-8 py-14 flex flex-col items-center text-center min-h-[60vh] justify-center">
        <div className="w-14 h-14 rounded-full bg-[#F1F5F9] flex items-center justify-center">
          <CheckCircle size={28} weight="fill" className="text-[#0F172A]" />
        </div>
        <h1 className="font-season text-[28px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-5">Assessment Complete</h1>
        <p className="font-matter text-[13px] text-[#64748B] leading-[1.6] mt-3 max-w-[360px]">Your results are ready. Tap continue to see them.</p>
        <button type="button" onClick={onNext}
          className="mt-10 px-8 py-3 rounded-full bg-[#0a0a0a] text-white font-matter text-[13px] font-semibold flex items-center gap-2 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97] transition-all cursor-pointer">
          Continue <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    );
  }

  // sub=1 instructions
  if (sub === 1) return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#FFFBEB] border border-[#FDE68A]">
        <Clock size={13} weight="bold" className="text-[#92400E]" />
        <span className="font-matter text-[11px] font-semibold text-[#92400E] uppercase tracking-wide">This section is not timed</span>
      </div>
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-5">Before you begin</h1>
      <div className="mt-8">
        <p className="font-matter text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em] flex items-center gap-3 mb-4">Instructions <span className="flex-1 h-px bg-[#F0F0F0]" /></p>
        <ul className="space-y-2.5 font-matter text-[14px] text-[#475569] leading-[1.7]">
          <li className="flex gap-3"><Warning size={16} className="text-[#F97316] shrink-0 mt-0.5" /> Timer starts when the test begins. You cannot pause.</li>
          <li className="flex gap-3"><Clock size={16} className="text-[#64748B] shrink-0 mt-0.5" /> You get 1 attempt every 45 days.</li>
          {isCoding && <li className="flex gap-3"><Code size={16} className="text-[#64748B] shrink-0 mt-0.5" /> Your code is auto-saved. Click Submit when done.</li>}
        </ul>
      </div>
      <div className="mt-8">
        <p className="font-matter text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.1em] flex items-center gap-3 mb-4">Setup <span className="flex-1 h-px bg-[#F0F0F0]" /></p>
        <ul className="space-y-2.5 font-matter text-[14px] text-[#475569] leading-[1.7]">
          <li>• Use <strong className="text-[#0F172A]">Google Chrome</strong> (not incognito).</li>
          <li>• Close all other browser tabs.</li>
          <li>• Working camera &amp; microphone required — this is proctored.</li>
          <li>• No additional monitors.</li>
        </ul>
      </div>
      <Nav back={() => setSub(0)} next={() => setSub(2)} />
    </div>
  );

  // sub=2 permissions
  if (sub === 2) return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">Grant Permissions</h1>
      <p className="font-matter text-[15px] text-[#94A3B8] leading-[1.6] mt-3">We need screen recording and camera access for proctoring.</p>
      <div className="flex flex-col gap-3 mt-8">
        <div className={`flex items-center gap-4 px-5 py-4 rounded-[14px] border transition-all ${screenGranted ? 'border-[#BBF7D0] bg-[#F0FDF4]' : 'border-[#E2E8F0]'}`}>
          {screenGranted ? <CheckCircle size={20} weight="fill" className="text-[#22C55E] shrink-0" /> : <Monitor size={20} className="text-[#94A3B8] shrink-0" />}
          <div className="flex-1">
            <p className="font-matter text-[14px] font-medium text-[#0F172A]">Screen Recording</p>
            <p className="font-matter text-[12px] text-[#94A3B8]">{screenGranted ? 'Permission granted' : 'Required for verification'}</p>
          </div>
          {!screenGranted && <button type="button" onClick={allowScreen} className="px-3 py-1.5 rounded-[8px] bg-[#0a0a0a] text-white font-matter text-[11px] font-semibold cursor-pointer hover:shadow-sm active:scale-[0.97] transition-all">Allow</button>}
        </div>
        <div className={`flex items-center gap-4 px-5 py-4 rounded-[14px] border transition-all ${camGranted ? 'border-[#BBF7D0] bg-[#F0FDF4]' : 'border-[#E2E8F0]'}`}>
          {camGranted ? <CheckCircle size={20} weight="fill" className="text-[#22C55E] shrink-0" /> : <Camera size={20} className="text-[#94A3B8] shrink-0" />}
          <div className="flex-1">
            <p className="font-matter text-[14px] font-medium text-[#0F172A]">Camera &amp; Microphone</p>
            <p className="font-matter text-[12px] text-[#94A3B8]">{camGranted ? 'Permission granted' : 'Required for identity verification'}</p>
          </div>
          {!camGranted && <button type="button" onClick={allowCam} className="px-3 py-1.5 rounded-[8px] bg-[#0a0a0a] text-white font-matter text-[11px] font-semibold cursor-pointer hover:shadow-sm active:scale-[0.97] transition-all">Allow</button>}
        </div>
      </div>
      <Nav back={() => setSub(1)} next={() => setSub(3)} disabled={!screenGranted || !camGranted} />
    </div>
  );

  // sub=3 env setup
  if (sub === 3) return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      {!envReady ? (
        <>
          <div className="flex items-center gap-3">
            <GearSix size={22} className="text-[#64748B] animate-spin" />
            <h1 className="font-season text-[28px] text-[#0F172A] leading-[1.15] tracking-[-0.02em]">Preparing environment...</h1>
          </div>
          <div className="mt-6 w-full max-w-[400px]">
            <div className="w-full h-[5px] rounded-full bg-[#F1F5F9] overflow-hidden">
              <div className="h-full rounded-full transition-all duration-150" style={{ width: `${envProgress}%`, background: '#0F172A' }} />
            </div>
            <span className="font-matter text-[12px] text-[#94A3B8] mt-2 block">{envProgress}%</span>
          </div>
        </>
      ) : (
        <>
          <RocketLaunch size={28} weight="fill" className="text-[#22C55E]" />
          <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-4">Ready to start!</h1>
          <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">The timer starts as soon as you click below. Good luck!</p>
          <div className="flex flex-col gap-2.5 mt-8">
            {['Screen recording enabled', 'Camera & mic connected', 'Environment ready'].map(c => (
              <div key={c} className="flex items-center gap-3 px-5 py-3 rounded-[12px] border border-[#F0F0F0]">
                <CheckCircle size={16} weight="fill" className="text-[#22C55E] shrink-0" />
                <span className="font-matter text-[14px] text-[#1E293B]">{c}</span>
              </div>
            ))}
          </div>
          <p className="font-matter text-[12px] text-[#94A3B8] mt-6 flex items-center gap-1.5"><Envelope size={12} /> Need help? support@homeguruworld.com</p>
        </>
      )}
      <Nav back={() => setSub(2)} next={() => { setTimerRunning(true); setSub(isCoding ? 7 : 10); }} nextLabel={isCoding ? 'Start Coding' : 'Start Test'} disabled={!envReady} />
    </div>
  );

  // sub=8 submitted
  if (sub === 8) return (
    <div className="max-w-[520px] mx-auto px-8 py-14">
      <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center">
        <CheckCircle size={28} weight="fill" className="text-[#22C55E]" />
      </div>
      <h1 className="font-season text-[32px] text-[#0F172A] leading-[1.15] tracking-[-0.02em] mt-5">Test Submitted!</h1>
      <p className="font-matter text-[15px] text-[#64748B] leading-[1.6] mt-3">We&apos;ll review your responses and share results within 24–48 hours.</p>
      <div className="flex flex-col gap-2.5 mt-8">
        {['Answers submitted', 'Screen recording saved', 'Session verified'].map(item => (
          <div key={item} className="flex items-center gap-3 px-5 py-3 rounded-[12px] border border-[#F0F0F0]">
            <CheckCircle size={16} weight="fill" className="text-[#22C55E] shrink-0" />
            <span className="font-matter text-[14px] text-[#1E293B]">{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <button type="button" onClick={onNext} className="px-8 py-3 rounded-full bg-[#0a0a0a] text-white font-matter text-[14px] font-semibold flex items-center gap-2 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.97] transition-all cursor-pointer">
          Continue <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </div>
  );

  return null;
}
