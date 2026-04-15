"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedHootProps {
  size?: number;
  className?: string;
}

export default function AnimatedHoot({ size = 80, className = "" }: AnimatedHootProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const directionRef = useRef(1); // 1 for forward, -1 for backward
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const img = new Image();
    img.src = "/student/hoot.png";
    imgRef.current = img;

    // Sprite sheet dimensions (from mobile app analysis)
    const spriteWidth = 680;
    const spriteHeight = 238;
    const frameWidth = spriteWidth / 3; // 3 frames
    const frameHeight = spriteHeight;

    let animationId: number;
    let lastTime = 0;
    const frameDelay = 350; // milliseconds per frame (smoother)

    const animate = (currentTime: number) => {
      if (!ctx || !canvas || !imageLoaded || !imgRef.current) return;

      // Only update frame after delay
      if (currentTime - lastTime >= frameDelay) {
        // Clear canvas with transparency
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate current frame (0, 1, 2)
        const currentFrame = Math.floor(frameRef.current);

        // Draw the current frame
        ctx.drawImage(
          imgRef.current,
          currentFrame * frameWidth, // source x
          0, // source y
          frameWidth, // source width
          frameHeight, // source height
          0, // destination x
          0, // destination y
          canvas.width, // destination width
          canvas.height // destination height
        );

        // Update frame with ping-pong animation
        frameRef.current += directionRef.current;

        // Reverse direction at boundaries
        if (frameRef.current >= 2) {
          frameRef.current = 2;
          directionRef.current = -1;
        } else if (frameRef.current <= 0) {
          frameRef.current = 0;
          directionRef.current = 1;
        }

        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    img.onload = () => {
      setImageLoaded(true);
      animationId = requestAnimationFrame(animate);
    };

    img.onerror = () => {
      console.error("Failed to load Hoot sprite");
    };

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [imageLoaded]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size * (238 / 226)} // Maintain aspect ratio
      className={className}
      style={{ imageRendering: "auto" }}
    />
  );
}
