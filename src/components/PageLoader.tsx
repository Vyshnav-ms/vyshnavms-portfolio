import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";

export default function PageLoader({ duration = 2000 }: { duration?: number }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  const bootLines = [
    "Loading portfolio assets...",
    "Initializing design system...",
    "Mounting components...",
    "Polishing details...",
    "Ready",
  ];

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const p = Math.round(ease(t) * 100);
      setProgress(p);
      setPhase(Math.floor((p / 100) * bootLines.length));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0a0a0a" }}
          aria-hidden
        >
          {/* Brushed metal grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Diagonal metal grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                135deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.005) 3px,
                rgba(255,255,255,0.005) 6px
              )`,
            }}
          />

          {/* Corner marks */}
          <div className="absolute top-6 left-6 w-8 h-8"
               style={{ borderTop: "1px solid rgba(201,168,76,0.4)", borderLeft: "1px solid rgba(201,168,76,0.4)" }} />
          <div className="absolute top-6 right-6 w-8 h-8"
               style={{ borderTop: "1px solid rgba(201,168,76,0.4)", borderRight: "1px solid rgba(201,168,76,0.4)" }} />
          <div className="absolute bottom-6 left-6 w-8 h-8"
               style={{ borderBottom: "1px solid rgba(201,168,76,0.4)", borderLeft: "1px solid rgba(201,168,76,0.4)" }} />
          <div className="absolute bottom-6 right-6 w-8 h-8"
               style={{ borderBottom: "1px solid rgba(201,168,76,0.4)", borderRight: "1px solid rgba(201,168,76,0.4)" }} />

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs px-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "3.5rem",
                  letterSpacing: "0.04em",
                  color: GOLD,
                }}
              >
                V<span style={{ color: "rgba(228,221,211,0.5)", fontStyle: "italic" }}>MS</span>
              </span>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', Inter, sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: GOLD_DIM,
                  marginTop: "0.25rem",
                }}
              >
                Portfolio
              </p>
            </motion.div>

            {/* Gold separator */}
            <div
              style={{
                width: "40px",
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              }}
            />

            {/* Boot lines */}
            <div className="w-full space-y-1.5">
              {bootLines.slice(0, Math.max(1, phase)).map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span style={{ color: GOLD, fontSize: "0.6rem" }}>—</span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.7rem",
                      color: i === Math.min(phase - 1, bootLines.length - 1)
                        ? "rgba(228,221,211,0.75)"
                        : "rgba(228,221,211,0.3)",
                    }}
                  >
                    {line}
                  </span>
                  {i === Math.min(phase - 1, bootLines.length - 1) && progress < 100 && (
                    <span
                      style={{
                        color: GOLD,
                        fontSize: "0.6rem",
                        animation: "blink-cursor 0.8s step-end infinite",
                      }}
                    >
                      ▌
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', Inter, sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: GOLD_DIM,
                  }}
                >
                  Loading
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: GOLD,
                  }}
                >
                  {progress}%
                </span>
              </div>
              <div
                className="w-full overflow-hidden"
                style={{
                  height: "2px",
                  background: "rgba(201,168,76,0.1)",
                  borderRadius: "1px",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: `linear-gradient(90deg, #6b5a30, ${GOLD}, #e8c96a)`,
                    boxShadow: `0 0 8px rgba(201,168,76,0.5)`,
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                    borderRadius: "1px",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
