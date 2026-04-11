'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import StepLayout from './StepLayout';
import Step1Welcome from './Step1Welcome';
import Step2Guidelines from './Step2Guidelines';
import Step3Screen from './Step3Screen';
import Step4CameraMic from './Step4CameraMic';
import Step6Ready from './Step6Ready';
import Step7IDE from './Step7IDE';
import Step8Submission from './Step8Submission';

interface Props { onComplete: () => void; }

export default function CodingChallenge({ onComplete }: Props) {
  const [step, setStep] = useState(() => {
    if (typeof window !== 'undefined') return parseInt(localStorage.getItem('challenge_step') || '1');
    return 1;
  });
  const [guidelinesAcked, setGuidelinesAcked] = useState(false);
  const [screenGranted, setScreenGranted] = useState(false);
  const [camGranted, setCamGranted] = useState(false);
  const [envProgress, setEnvProgress] = useState(0);
  const [envReady, setEnvReady] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(() => {
    if (typeof window !== 'undefined') return parseInt(localStorage.getItem('challenge_timer') || String(45 * 60));
    return 45 * 60;
  });
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const envIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Persist step
  useEffect(() => { localStorage.setItem('challenge_step', String(step)); }, [step]);

  // Timer
  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(s => {
          const next = s - 1;
          localStorage.setItem('challenge_timer', String(next));
          if (next <= 0) { clearInterval(intervalRef.current!); setStep(8); return 0; }
          return next;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerRunning]);

  // Env setup simulation (runs on step 5/6)
  useEffect(() => {
    if (step === 5 && !envReady) {
      envIntervalRef.current = setInterval(() => {
        setEnvProgress(p => {
          if (p >= 100) { clearInterval(envIntervalRef.current!); setEnvReady(true); return 100; }
          return p + 2;
        });
      }, 80);
    }
    return () => { if (envIntervalRef.current) clearInterval(envIntervalRef.current); };
  }, [step, envReady]);

  // Prevent refresh during test
  useEffect(() => {
    if (step === 7) {
      const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [step]);

  const formatTimer = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
      localStorage.removeItem('challenge_step');
      localStorage.removeItem('challenge_timer');
      localStorage.removeItem('challenge_code');
      onComplete();
    }
  };

  const handleNext = () => {
    if (step === 5 && envReady) { setStep(6); return; }
    if (step === 5 && !envReady) return;
    setStep(s => Math.min(s + 1, 8));
  };

  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleStartChallenge = () => {
    setTimerRunning(true);
    setStep(7);
  };

  // Step 7: Full-screen IDE
  if (step === 7) {
    return <Step7IDE timer={formatTimer(timerSeconds)} timerSeconds={timerSeconds} onSubmit={() => { setTimerRunning(false); setStep(8); }} />;
  }

  // Step 8: Submission
  if (step === 8) {
    return (
      <StepLayout step={8} totalSteps={8} hideBack hideNext onExit={handleExit}>
        <Step8Submission onFinish={() => { localStorage.removeItem('challenge_step'); localStorage.removeItem('challenge_timer'); localStorage.removeItem('challenge_code'); onComplete(); }} />
      </StepLayout>
    );
  }

  // Next button disabled logic
  const nextDisabled = () => {
    if (step === 2) return !guidelinesAcked;
    if (step === 3) return !screenGranted;
    if (step === 4) return !camGranted;
    if (step === 5) return !envReady;
    return false;
  };

  // Steps 5 and 6 are combined: step 5 = env loading + ready screen
  // We show env progress in the card, and "Start Challenge" as the next button
  const isReadyStep = step === 5 || step === 6;
  const showEnvProgress = step >= 5;

  const getNextLabel = () => {
    if (step === 3 && !screenGranted) return 'Allow screen recording';
    if (step === 4 && !camGranted) return 'Allow camera and microphone';
    if (step === 5 && !envReady) return 'Loading...';
    if (step === 5 && envReady) return 'Next';
    if (step === 6) return '▶ Start Challenge';
    return 'Next';
  };

  const getNextAction = () => {
    if (step === 3 && !screenGranted) {
      return async () => {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          stream.getTracks().forEach(t => t.stop());
          setScreenGranted(true);
        } catch { setScreenGranted(true); }
      };
    }
    if (step === 4 && !camGranted) {
      return async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          stream.getTracks().forEach(t => t.stop());
          setCamGranted(true);
        } catch { setCamGranted(true); }
      };
    }
    if (step === 6) return handleStartChallenge;
    return handleNext;
  };

  // For steps 3/4: if permission granted, show "Next" instead of "Allow..."
  const actualNextLabel = () => {
    if (step === 3 && screenGranted) return 'Next';
    if (step === 4 && camGranted) return 'Next';
    return getNextLabel();
  };

  const actualNextAction = () => {
    if (step === 3 && screenGranted) return handleNext;
    if (step === 4 && camGranted) return handleNext;
    return getNextAction();
  };

  const actualNextDisabled = () => {
    if (step === 5 && !envReady) return true;
    return false;
  };

  // Permission granted badge for bottom bar
  const showGrantedBadge = (step === 3 && screenGranted) || (step === 4 && camGranted);

  return (
    <StepLayout
      step={step <= 6 ? step : step}
      totalSteps={8}
      onNext={actualNextAction()}
      onBack={step > 1 ? handleBack : undefined}
      onExit={handleExit}
      nextDisabled={actualNextDisabled()}
      nextLabel={actualNextLabel()}
      hideBack={step === 1}
      envProgress={showEnvProgress ? envProgress : undefined}
    >
      {step === 1 && <Step1Welcome />}
      {step === 2 && <Step2Guidelines onAllChecked={setGuidelinesAcked} />}
      {step === 3 && <Step3Screen granted={screenGranted} onGranted={() => setScreenGranted(true)} />}
      {step === 4 && <Step4CameraMic granted={camGranted} onGranted={() => setCamGranted(true)} />}
      {step === 5 && <Step6Ready />}
      {step === 6 && <Step6Ready />}
    </StepLayout>
  );
}
