import { useEffect, useRef } from "react";

// Thin animated scroll progress line at the top of the page
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
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-primary via-indigo-400 to-primary/60 rounded-r-full"
        style={{ width: "0%", transition: "width 0.08s linear" }}
      />
    </div>
  );
}
