import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ duration = 2000 }: { duration?: number }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  const bootLines = [
    "INITIALIZING NEURAL INTERFACE...",
    "LOADING CORE MODULES...",
    "ESTABLISHING SECURE CONNECTION...",
    "CALIBRATING HOLOGRAPHIC DISPLAY...",
    "SYSTEM READY",
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
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#030712" }}
          aria-hidden
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Scanline */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
               style={{ animation: "scanline-move 2.5s linear infinite" }} />

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-500/60" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-cyan-500/60" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-cyan-500/60" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-cyan-500/60" />

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs px-6">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <span
                className="font-orbitron font-black text-4xl tracking-wider"
                style={{ color: "#06b6d4", textShadow: "0 0 20px rgba(6,182,212,0.6), 0 0 40px rgba(6,182,212,0.3)" }}
              >
                V<span style={{ color: "#a78bfa" }}>MS</span>
              </span>
              <p className="font-mono text-xs text-cyan-500/50 tracking-[0.3em] mt-1 uppercase">
                System Boot
              </p>
            </motion.div>

            {/* Boot text */}
            <div className="w-full font-mono text-xs space-y-1">
              {bootLines.slice(0, Math.max(1, phase)).map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2"
                >
                  <span style={{ color: "#10b981" }}>›</span>
                  <span style={{ color: i === Math.min(phase - 1, bootLines.length - 1) ? "#06b6d4" : "rgba(6,182,212,0.4)" }}>
                    {line}
                  </span>
                  {i === Math.min(phase - 1, bootLines.length - 1) && progress < 100 && (
                    <span style={{ color: "#06b6d4", animation: "blink-cursor 0.8s step-end infinite" }}>█</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs" style={{ color: "rgba(6,182,212,0.5)" }}>LOADING</span>
                <span className="font-orbitron text-xs font-bold" style={{ color: "#06b6d4" }}>{progress}%</span>
              </div>
              <div
                className="w-full h-[3px] rounded-full overflow-hidden"
                style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.15)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #06b6d4, #7c3aed)",
                    boxShadow: "0 0 10px rgba(6,182,212,0.7)",
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
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
