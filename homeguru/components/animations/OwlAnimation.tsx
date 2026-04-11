'use client';
import React, { useRef, useEffect } from 'react';

const WALK_SEQUENCE = [0, 1, 0, 1];
const FRAME_W = 238;
const CANVAS_SIZE = 72;
const FRAME_DELAY = 400;
const STEP = 20;

export default function OwlAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const sprite = new Image();
    sprite.src = '/images/owl-walk.png';

    let frameIndex = 0;
    let offsetX = 0;
    let lastTime = 0;
    let animId: number;

    const draw = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;

      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.save();
      ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);

      const isFlipped = frameIndex >= 2;
      ctx.scale(isFlipped ? -1 : 1, 1);

      const currentFrame = WALK_SEQUENCE[frameIndex];
      ctx.drawImage(
        sprite,
        currentFrame * FRAME_W, 0, FRAME_W, FRAME_W,
        -CANVAS_SIZE / 2, -CANVAS_SIZE / 2, CANVAS_SIZE, CANVAS_SIZE
      );
      ctx.restore();

      if (timestamp - lastTime >= FRAME_DELAY) {
        frameIndex = (frameIndex + 1) % WALK_SEQUENCE.length;
        offsetX += isFlipped ? -STEP : STEP;
        lastTime = timestamp;
      }

      animId = requestAnimationFrame(draw);
    };

    sprite.onload = () => {
      animId = requestAnimationFrame(draw);
    };

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-[72px] h-[72px] flex items-center justify-center mb-2">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ imageRendering: 'pixelated', background: 'transparent' }}
      />
    </div>
  );
}
