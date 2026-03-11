import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function PageLoader({ duration = 3000 }: { duration?: number }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const containerAnim = useAnimation();

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      setProgress(Math.round(ease(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        containerAnim.start({
          opacity: 0,
          scale: 1.05,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }).then(() => setDone(true));
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, containerAnim]);

  if (done) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={containerAnim}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #0d1117 0%, #08090d 100%)",
        cursor: "none",
      }}
      aria-hidden
    >
      {/* Orbital rings */}
      <div className="relative w-48 h-48">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(14, 163, 112, 0.15)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {/* Orbiting dot 1 */}
          <div
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: "#0ea370",
              boxShadow: "0 0 12px #0ea370, 0 0 30px rgba(14,163,112,0.3)",
              top: "-5px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </motion.div>

        {/* Middle ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: "20px",
            border: "1px solid rgba(245, 197, 66, 0.12)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          {/* Orbiting dot 2 */}
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: "#f5c542",
              boxShadow: "0 0 10px #f5c542, 0 0 25px rgba(245,197,66,0.3)",
              bottom: "-4px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </motion.div>

        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: "40px",
            border: "1px solid rgba(14, 163, 112, 0.1)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {/* Orbiting dot 3 */}
          <div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: "#0ea370",
              boxShadow: "0 0 8px #0ea370",
              top: "50%",
              right: "-3px",
              transform: "translateY(-50%)",
            }}
          />
        </motion.div>

        {/* Center glow */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "60px",
            background: "radial-gradient(circle, rgba(14,163,112,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Center pulsing dot */}
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: "#0ea370",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 20px rgba(14,163,112,0.5)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Progress bar — minimal line at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48">
        <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #0ea370, #f5c542)",
              width: `${progress}%`,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-center mt-3 text-[11px] font-mono text-white/20 tracking-[0.3em] uppercase">
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}
