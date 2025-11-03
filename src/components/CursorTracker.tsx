import { useEffect } from "react";

const CursorTracker: React.FC = () => {
  useEffect(() => {
    const dot = document.querySelector<HTMLDivElement>(".cursor-dot");
    const glow = document.querySelector<HTMLDivElement>(".cursor-glow");

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (dot) {
        dot.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (glow) {
        glow.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-glow" />
    </>
  );
};

export default CursorTracker;
