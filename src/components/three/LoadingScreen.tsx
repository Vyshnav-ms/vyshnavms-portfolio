import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cyberpunk-styled loading screen used as Suspense fallback
 * while 3D assets initialise.
 */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);

  const logLines = [
    "INITIALISING WEBGL CONTEXT...",
    "LOADING 3D SCENE GRAPH...",
    "COMPILING SHADER PROGRAMS...",
    "MOUNTING PARTICLE FIELD...",
    "CALIBRATING LIGHTING...",
    "SCENE READY",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18, 100);
        return next;
      });
    }, 160);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setLine((l) => Math.min(l + 1, logLines.length - 1));
    }, 280);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: "#030712" }}
      >
        {/* Scan line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)",
            animation: "scanline-move 2.5s linear infinite",
          }}
        />

        {/* Content */}
        <div className="flex flex-col items-center gap-8 px-8 max-w-sm w-full">
          {/* Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              border: "2px solid rgba(6,182,212,0.25)",
              boxShadow: "0 0 20px rgba(6,182,212,0.2)",
            }}
          >
            <motion.div
              className="w-6 h-6 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.9) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Title */}
          <div className="text-center">
            <p
              className="font-orbitron text-xs font-semibold tracking-[0.25em] uppercase mb-1"
              style={{ color: "rgba(6,182,212,0.7)" }}
            >
              3D ENGINE
            </p>
            <p
              className="font-mono text-[10px] tracking-[0.15em]"
              style={{ color: "rgba(200,230,255,0.3)" }}
            >
              LOADING SCENE
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div
              className="w-full h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(6,182,212,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #0891b2, #06b6d4, #7c3aed)",
                  boxShadow: "0 0 8px rgba(6,182,212,0.6)",
                }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <p
              className="text-right font-mono text-[9px] mt-1"
              style={{ color: "rgba(6,182,212,0.4)" }}
            >
              {Math.round(progress)}%
            </p>
          </div>

          {/* Log lines */}
          <div className="w-full space-y-1">
            {logLines.slice(0, line + 1).map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[9px] tracking-[0.1em]"
                style={{
                  color:
                    i === line
                      ? "rgba(6,182,212,0.8)"
                      : "rgba(200,230,255,0.2)",
                }}
              >
                {i === line ? "> " : "  "}
                {l}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
