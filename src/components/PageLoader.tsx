import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "@fontsource/poppins/800.css";

export default function PageLoader({
  duration = 4200, // ⏳ slower fill duration
}: {
  duration?: number;
}) {
  const [progress, setProgress] = useState(0);
  const anim = useAnimation();
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const total = duration;
    const ease = (t: number) => 1 - Math.pow(1 - t, 2.4); // smoother ease-out
    startRef.current = null;

    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / total);
      const val = Math.round(ease(t) * 100);
      setProgress(val);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        anim.start({
          opacity: 0,
          transition: { duration: 0.8, ease: "easeInOut" },
        });
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [duration, anim]);

  const svgH = 200;
  // base Y with unevenness based on sine curve → slow fluid rise
  const baseFillY = Math.round(svgH - (progress / 100) * svgH);
  const dynamicFillY =
    baseFillY +
    Math.sin(progress * 0.12) * 6 + // gentle bobbing
    Math.cos(progress * 0.08) * 4; // subtle uneven offset

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={anim}
      aria-hidden
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 50% 60%, #0a0a0a 0%, #000 100%)",
        color: "#fff",
        pointerEvents: progress >= 100 ? "none" : "auto",
      }}
    >
      <div style={{ width: "90vw", maxWidth: 1200 }} className="relative">
        <svg
          viewBox="0 0 1400 200"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="clip-text">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="160"
                fontWeight="800"
                fontFamily="Poppins, sans-serif"
                letterSpacing="-6"
              >
                Vyshnav M S
              </text>
            </clipPath>

            {/* RedBull glossy gradient */}
            <linearGradient id="redGlass" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff4040" />
              <stop offset="45%" stopColor="#e10600" />
              <stop offset="100%" stopColor="#5a0000" />
            </linearGradient>

            {/* Light reflection gradient */}
            <linearGradient id="reflection" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <filter id="softGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* White outlined border text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="160"
            fontWeight="800"
            fontFamily="Poppins, sans-serif"
            stroke="#fff"
            strokeWidth="3"
            fill="transparent"
            letterSpacing="-6"
            opacity={0.95}
          >
            Vyshnav M S
          </text>

          {/* Glossy red fill inside text */}
          <g clipPath="url(#clip-text)">
            {/* Rising red glass fill */}
            <rect
              x="0"
              y={dynamicFillY}
              width="1400"
              height={200 - dynamicFillY}
              fill="url(#redGlass)"
              filter="url(#softGlow)"
            />

            {/* Main wave */}
            <path d={makeWavePath(dynamicFillY, 0)} fill="#e10600" opacity="0.95">
              <animate
                attributeName="d"
                dur="3.8s"
                repeatCount="indefinite"
                values={`${makeWavePath(dynamicFillY, 0)};
                         ${makeWavePath(dynamicFillY - 8, 80)};
                         ${makeWavePath(dynamicFillY + 6, 160)};
                         ${makeWavePath(dynamicFillY, 0)}`}
              />
            </path>

            {/* Secondary offset wave for depth */}
            <path
              d={makeWavePath(dynamicFillY + 8, 100, 0.7)}
              fill="#ff1b1b88"
              opacity="0.8"
            >
              <animate
                attributeName="d"
                dur="5.5s"
                repeatCount="indefinite"
                values={`${makeWavePath(dynamicFillY + 8, 100, 0.7)};
                         ${makeWavePath(dynamicFillY + 3, 180, 0.7)};
                         ${makeWavePath(dynamicFillY + 10, 260, 0.7)};
                         ${makeWavePath(dynamicFillY + 8, 100, 0.7)}`}
              />
            </path>

            {/* Top reflection line for realism */}
            <rect
              x="0"
              y={dynamicFillY - 5}
              width="1400"
              height="10"
              fill="url(#reflection)"
              opacity="0.8"
            />
          </g>
        </svg>

        {/* Red glowing progress counter */}
        <div
          style={{
            position: "absolute",
            right: 12,
            bottom: -28,
            fontSize: 14,
            fontWeight: 500,
            color: "#ff1b1b",
            textShadow:
              "0 0 6px #ff1b1b, 0 0 12px #ff1b1b, 0 0 24px #ff4444",
          }}
        >
          loading... {progress} %
        </div>
      </div>
    </motion.div>
  );
}

/* Make the wave look natural and asymmetrical */
function makeWavePath(y: number, phase = 0, norm = 1) {
  const w = 1400;
  const segments = 10;
  const amp = 14 * norm;
  const baseY = Math.max(0, Math.min(200, y));
  let d = `M0 200 L0 ${baseY} `;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = Math.round(t * w);
    const theta = (t * Math.PI * 2) + (phase * Math.PI / 180);
    const wobble = Math.sin(theta * 1.1) * amp + Math.cos(t * Math.PI) * (amp / 2);
    const py = Math.round(baseY + wobble);
    if (i === 0) d += `L ${x} ${py} `;
    else {
      const cx = x - w / (segments * 2);
      const cy = py - wobble * 0.3;
      d += `Q ${cx} ${cy} ${x} ${py} `;
    }
  }

  d += `L ${w} 200 Z`;
  return d;
}
