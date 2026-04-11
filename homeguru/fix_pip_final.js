const fs = require('fs');
const f = 'c:\\Users\\varun\\OneDrive\\Documents\\hgstudent\\homeguru\\components\\tutor-onboarding\\AdminStep4QualificationTest.tsx';
let c = fs.readFileSync(f, 'utf8');

// ── Step 1: Remove the entire pip block from the bottom (lines 196-275) ──
const pipBlockStart = c.indexOf('  // ── Camera PiP ──');
const componentEnd  = c.lastIndexOf('\n}');
// Remove pip block + final return, keep closing brace
c = c.substring(0, pipBlockStart) + c.substring(componentEnd);

// ── Step 2: Insert pip hooks right after the first useEffect (setMounted) ──
const insertAfter = '  useEffect(() => { setMounted(true); }, []);';
const pipHooks = `  useEffect(() => { setMounted(true); }, []);

  // ── Camera PiP hooks (must be before any early returns) ──
  const pipVideoRef = useRef<HTMLVideoElement>(null);
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

  const PipCamera = () => !mounted ? null : createPortal(
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
  );`;

c = c.replace(insertAfter, pipHooks);

// ── Step 3: Add <PipCamera /> inside MCQ portal just before closing </div> ──
// MCQ portal ends with: </div>\n      </div>,\n      document.body\n    );\n  }\n\n\n  if (sub === 0)
c = c.replace(
  `        </div>\n      </div>,\n      document.body\n    );\n  }\n\n\n  if (sub === 0)`,
  `        </div>\n        <PipCamera />\n      </div>,\n      document.body\n    );\n  }\n\n\n  if (sub === 0)`
);

// ── Step 4: Add <PipCamera /> inside Written portal just before closing </div> ──
// Written portal ends with: </div>\n      </div>,\n      document.body\n    );\n  }\n\n}
c = c.replace(
  `        </div>\n      </div>,\n\n      document.body\n\n    );\n\n  }\n\n}`,
  `        </div>\n        <PipCamera />\n      </div>,\n      document.body\n    );\n  }\n\n}`
);

fs.writeFileSync(f, c, 'utf8');
console.log('Done');
