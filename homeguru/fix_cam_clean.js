const fs = require('fs');
const f = 'c:\\Users\\varun\\OneDrive\\Documents\\hgstudent\\homeguru\\components\\tutor-onboarding\\AdminStep4QualificationTest.tsx';
let c = fs.readFileSync(f, 'utf8');

// ── 1. Remove camStreamRef2 and both camera useEffects ──
c = c.replace(
`  const camStreamRef2 = useRef<MediaStream | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    (async () => {

      try {

        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });

        camStreamRef2.current = stream;
        if (pipVideoRef.current) pipVideoRef.current.srcObject = stream;
      } catch { /* camera unavailable */ }

    })();

    return () => { stream?.getTracks().forEach(t => t.stop()); };

  }, []);

  // Re-attach stream whenever sub changes (video element may remount inside portal)

  useEffect(() => {

    if ((sub === 10 || sub === 11) && pipVideoRef.current && camStreamRef2.current) {

      pipVideoRef.current.srcObject = camStreamRef2.current;

    }

  }, [sub]);`,
  ``
);

// ── 2. Remove all pip drag refs/effects/handler and pipPortal + final return ──
const pipStart = c.indexOf('  // Camera PiP');
const fileEnd = c.lastIndexOf('\n}');
c = c.substring(0, pipStart) + c.substring(fileEnd);

// ── 3. Add clean pip implementation before closing brace ──
c = c.replace('\n}', `
  // ── Camera PiP ──
  // Simple: open stream when test starts, render stable video element in a portal
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const pipDivRef = useRef<HTMLDivElement>(null);
  const pipDragging = useRef(false);
  const pipDragOffset = useRef({ x: 0, y: 0 });
  const pipStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (sub !== 10 && sub !== 11) {
      // stop stream when not testing
      if (pipStream.current) { pipStream.current.getTracks().forEach(t => t.stop()); pipStream.current = null; }
      return;
    }
    // start stream
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        pipStream.current = s;
        if (pipVideoRef.current) pipVideoRef.current.srcObject = s;
      } catch {}
    })();
    return () => {
      if (pipStream.current) { pipStream.current.getTracks().forEach(t => t.stop()); pipStream.current = null; }
    };
  }, [sub]);

  // attach stream to video whenever video element mounts (portal may remount)
  const attachPipVideo = (el: HTMLVideoElement | null) => {
    (pipVideoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    if (el && pipStream.current) el.srcObject = pipStream.current;
  };

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

  const showPip = mounted && (sub === 10 || sub === 11);

  return (
    <>
      {showPip && createPortal(
        <div ref={pipDivRef} onMouseDown={onPipDown}
          className="fixed z-[99999]"
          style={{ right: 24, bottom: 80, cursor: 'grab', width: 160, height: 120 }}>
          <div className="relative w-full h-full rounded-[14px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-2 border-white/20">
            <video ref={attachPipVideo} autoPlay muted playsInline
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
      )}
    </>
  );
}`);

fs.writeFileSync(f, c, 'utf8');
console.log('Done');
