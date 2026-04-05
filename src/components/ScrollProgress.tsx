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
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none"
      style={{ background: "rgba(201,168,76,0.06)" }}
    >
      <div
        ref={barRef}
        className="h-full rounded-r-full"
        style={{
          width: "0%",
          transition: "width 0.08s linear",
          background: "linear-gradient(90deg, #6b5a30, #c9a84c, #e8c96a, #c9a84c)",
          boxShadow: "0 0 6px rgba(201,168,76,0.6), 0 0 12px rgba(201,168,76,0.25)",
        }}
      />
    </div>
  );
}
