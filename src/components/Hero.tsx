import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Terminal, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Animated number counter
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v) + suffix);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) raw.set(to);
  }, [isInView, to, raw]);

  return (
    <motion.span ref={ref} className="font-orbitron font-bold text-3xl" style={{ color: "#06b6d4" }}>
      {display}
    </motion.span>
  );
}

// Typewriter cycling roles
const roles = ["FULL STACK DEVELOPER", "REACT ENGINEER", "DJANGO ARCHITECT", "AI INTEGRATOR"];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <div className="flex items-center gap-2 font-mono text-sm sm:text-base" style={{ color: "rgba(200,230,255,0.7)" }}>
      <span style={{ color: "#06b6d4" }}>[</span>
      <span>{displayed}</span>
      <span
        className="inline-block w-[2px] h-4 rounded-sm"
        style={{ background: "#06b6d4", animation: "blink-cursor 0.8s step-end infinite" }}
      />
      <span style={{ color: "#06b6d4" }}>]</span>
    </div>
  );
}

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "#030712" }}
      aria-label="Hero section"
    >
      {/* ── Dot grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(6,182,212,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
        }}
      />

      {/* ── Cyan grid lines ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Scanline ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)",
          animation: "scanline-move 5s linear infinite",
        }}
      />

      {/* ── Glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-20 w-[600px] h-[600px] orb-cyan"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            borderRadius: "50%",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px]"
          animate={{ scale: [1, 1.15, 1], x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
            filter: "blur(70px)",
            borderRadius: "50%",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
            filter: "blur(40px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* ── Corner brackets ── */}
      <div className="absolute top-20 right-10 w-16 h-16 pointer-events-none hidden lg:block">
        <div className="absolute top-0 right-0 w-6 h-6" style={{ borderTop: "2px solid rgba(6,182,212,0.4)", borderRight: "2px solid rgba(6,182,212,0.4)" }} />
        <div className="absolute bottom-0 left-0 w-6 h-6" style={{ borderBottom: "2px solid rgba(6,182,212,0.4)", borderLeft: "2px solid rgba(6,182,212,0.4)" }} />
      </div>
      <div className="absolute bottom-20 left-10 w-16 h-16 pointer-events-none hidden lg:block">
        <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: "2px solid rgba(124,58,237,0.35)", borderLeft: "2px solid rgba(124,58,237,0.35)" }} />
        <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: "2px solid rgba(124,58,237,0.35)", borderRight: "2px solid rgba(124,58,237,0.35)" }} />
      </div>

      <div className="container-wide mx-auto relative z-10 py-8">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">

          {/* Status badge */}
          <motion.div variants={item} className="mb-6">
            <motion.span
              className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] px-4 py-2 rounded-full"
              style={{
                color: "#10b981",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: "#10b981", boxShadow: "0 0 6px rgba(16,185,129,0.8)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              Available for work
              <Terminal size={12} />
            </motion.span>
          </motion.div>

          {/* Name heading */}
          <motion.div variants={item} className="mb-4">
            <h1
              className="font-orbitron font-black leading-none select-none"
              style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "-0.03em" }}
            >
              <span style={{ color: "rgba(200,230,255,0.9)" }}>VYSHNAV</span>
              <br />
              <span
                style={{
                  color: "#06b6d4",
                  textShadow: "0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.15)",
                }}
              >
                M<span style={{ color: "#a78bfa" }}>S</span>
              </span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={item} className="mb-6">
            <TypewriterRole />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="font-inter text-base sm:text-lg leading-relaxed max-w-xl mb-10"
            style={{ color: "rgba(200,230,255,0.5)" }}
          >
            Engineering{" "}
            <span style={{ color: "rgba(6,182,212,0.9)", fontWeight: 600 }}>intelligent web systems</span>{" "}
            with React, Django, and AI — where precision meets performance.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
            <motion.button
              onClick={() => scrollTo("projects")}
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="View my projects"
            >
              View Projects <ArrowRight size={14} />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("contact")}
              className="btn-cyber"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Contact me"
            >
              Get in Touch <Zap size={13} />
            </motion.button>
          </motion.div>

          {/* HUD Stats */}
          <motion.div
            variants={item}
            className="flex items-stretch gap-3 flex-wrap"
          >
            {[
              { to: 3, suffix: "+", label: "YEARS_LEARNING" },
              { to: 10, suffix: "+", label: "PROJECTS_BUILT" },
            ].map(({ to, suffix, label }, i) => (
              <div
                key={label}
                className="hud-stat min-w-[110px]"
              >
                <Counter to={to} suffix={suffix} />
                <p className="font-mono text-[10px] mt-1 tracking-[0.08em]" style={{ color: "rgba(6,182,212,0.5)" }}>
                  {label}
                </p>
              </div>
            ))}
            <div className="hud-stat min-w-[110px]">
              <span className="font-orbitron font-bold text-3xl" style={{ color: "#06b6d4" }}>MCA</span>
              <p className="font-mono text-[10px] mt-1 tracking-[0.08em]" style={{ color: "rgba(6,182,212,0.5)" }}>
                PURSUING
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all group"
        style={{ color: "rgba(6,182,212,0.35)" }}
        aria-label="Scroll down"
      >
        {/* <span className="font-mono text-[9px] uppercase tracking-[0.25em]">scroll</span> */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
