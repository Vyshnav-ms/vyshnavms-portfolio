import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "@fontsource/poppins/800.css";

export default function PageLoader({
  duration = 3200,
}: {
  duration?: number;
}) {
  const [progress, setProgress] = useState(0);
  const anim = useAnimation();
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const total = duration;
    const ease = (t: number) => 1 - Math.pow(1 - t, 2.2);
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
          transition: { duration: 0.7, ease: "easeInOut" },
        });
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [duration, anim]);

  const svgH = 200;
  const fillY = Math.round(svgH - (progress / 100) * svgH);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={anim}
      aria-hidden
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 50% 60%, #080808 0%, #000 100%)",
        color: "#fff",
      }}
    >
      <div style={{ width: "90vw", maxWidth: 1200 }} className="relative">
        <svg
          viewBox="0 0 1400 200"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* clipPath to make the wave fill inside text */}
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

            {/* vivid glassy red gradient */}
            <linearGradient id="redGlass" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff4040" stopOpacity="1" />
              <stop offset="40%" stopColor="#e10600" stopOpacity="1" />
              <stop offset="100%" stopColor="#6b0000" stopOpacity="1" />
            </linearGradient>

            {/* glossy reflection highlight */}
            <linearGradient id="reflection" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* subtle glow blur for realism */}
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* background shadow text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="160"
            fontWeight="800"
            fontFamily="Poppins, sans-serif"
            fill="#0d0d0d"
            opacity={0.95}
            letterSpacing="-6"
          >
            Vyshnav M S
          </text>

          {/* red liquid inside text */}
          <g clipPath="url(#clip-text)">
            {/* base rising rectangle */}
            <rect
              x="0"
              y={fillY}
              width="1400"
              height={200 - fillY}
              fill="url(#redGlass)"
              filter="url(#softGlow)"
            />

            {/* main wave */}
            <path d={makeWavePath(fillY, 0)} fill="#e10600" opacity="0.95">
              <animate
                attributeName="d"
                dur="3.4s"
                repeatCount="indefinite"
                values={`${makeWavePath(fillY, 0)};
                         ${makeWavePath(fillY - 8, 60)};
                         ${makeWavePath(fillY + 6, 120)};
                         ${makeWavePath(fillY, 0)}`}
              />
            </path>

            {/* secondary wave for uneven motion */}
            <path d={makeWavePath(fillY + 10, 90, 0.8)} fill="#ff1b1b99">
              <animate
                attributeName="d"
                dur="5s"
                repeatCount="indefinite"
                values={`${makeWavePath(fillY + 10, 90, 0.8)};
                         ${makeWavePath(fillY + 5, 150, 0.8)};
                         ${makeWavePath(fillY + 14, 230, 0.8)};
                         ${makeWavePath(fillY + 10, 90, 0.8)}`}
              />
            </path>

            {/* reflection line */}
            <rect
              x="0"
              y={fillY - 5}
              width="1400"
              height="10"
              fill="url(#reflection)"
              opacity="0.65"
            />
          </g>
        </svg>

        {/* red glowing counter */}
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

/* red liquid wave generator */
function makeWavePath(y: number, phase = 0, norm = 1) {
  const w = 1400;
  const segments = 8;
  const amp = 16 * norm;
  const baseY = Math.max(0, Math.min(200, y));
  let d = `M0 200 L0 ${baseY} `;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = Math.round(t * w);
    const theta = (t * Math.PI * 2) + (phase * Math.PI / 180);
    const wobble = Math.sin(theta * 1.15) * amp * Math.cos(t * Math.PI * 1.05);
    const py = Math.round(baseY + wobble);
    if (i === 0) d += `L ${x} ${py} `;
    else {
      const cx = x - w / (segments * 2);
      const cy = py - wobble * 0.4;
      d += `Q ${cx} ${cy} ${x} ${py} `;
    }
  }
  d += `L ${w} 200 Z`;
  return d;
}
