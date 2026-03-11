import { useEffect, useRef, useCallback } from "react";

const CursorTracker: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafRef = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    // Dot follows mouse closely
    dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.25);
    dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.25);

    // Ring follows with more delay for elastic feel
    ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
    ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);

    if (dotRef.current) {
      const size = isHovering.current ? 60 : 8;
      dotRef.current.style.transform = `translate(${dotPos.current.x - size / 2}px, ${dotPos.current.y - size / 2}px)`;
    }

    if (ringRef.current) {
      const size = isHovering.current ? 12 : 40;
      ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseEnterInteractive = () => {
      isHovering.current = true;
      dotRef.current?.classList.add("hovering");
      ringRef.current?.classList.add("hovering");
    };

    const onMouseLeaveInteractive = () => {
      isHovering.current = false;
      dotRef.current?.classList.remove("hovering");
      ringRef.current?.classList.remove("hovering");
    };

    window.addEventListener("mousemove", onMouseMove);

    // Attach hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    rafRef.current = requestAnimationFrame(animate);

    // Re-observe for dynamic elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      newElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [animate]);

  // Hide custom cursor on touch devices
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CursorTracker;
