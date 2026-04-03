import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
         style={{ background: "rgba(6,182,212,0.05)" }}>
      <div
        ref={barRef}
        className="h-full rounded-r-full"
        style={{
          width: "0%",
          transition: "width 0.08s linear",
          background: "linear-gradient(90deg, #06b6d4, #7c3aed, #06b6d4)",
          boxShadow: "0 0 8px rgba(6,182,212,0.8), 0 0 16px rgba(6,182,212,0.4)",
        }}
      />
    </div>
  );
}
