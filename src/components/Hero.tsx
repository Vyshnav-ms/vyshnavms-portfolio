import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import WebGLFallback from "./three/WebGLFallback";

const HeroScene = lazy(() => import("./three/HeroScene"));

// Gold color constants
const GOLD = "#c9a84c";
const GOLD_LIGHT = "#e0bc6a";
const GOLD_DIM = "rgba(201,168,76,0.5)";
const PLATINUM = "#e4ddd3";
const STEEL = "rgba(228,221,211,0.55)";

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
    <motion.span
      ref={ref}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 700,
        fontSize: "2rem",
        color: GOLD,
      }}
    >
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
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <div
      style={{
        fontFamily: "'Barlow Condensed', Inter, sans-serif",
        fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
        letterSpacing: "0.18em",
        color: "rgba(228,221,211,0.6)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span style={{ color: GOLD_DIM, fontSize: "0.75rem" }}>—</span>
      <span>{displayed}</span>
      <span
        className="inline-block w-[2px] h-4 rounded-sm"
        style={{ background: GOLD, animation: "blink-cursor 0.8s step-end infinite" }}
      />
    </div>
  );
}

import type { Variants } from "framer-motion";

const stagger: Variants = { visible: { transition: { staggerChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "#0f0f0f" }}
      aria-label="Hero section"
    >
      {/* ── Black Hole 3D Scene ── */}
      <WebGLFallback>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </WebGLFallback>

      {/* ── Subtle cross-hatch background (behind 3D) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.008) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Warm ambient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-16 w-[500px] h-[500px]"
          animate={{ scale: [1, 1.08, 1], x: [0, 15, 0], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)",
            filter: "blur(60px)",
            borderRadius: "50%",
          }}
        />
        <motion.div
          className="absolute -bottom-16 right-0 w-[420px] h-[420px]"
          animate={{ scale: [1, 1.1, 1], x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            background: "radial-gradient(circle, rgba(95,103,122,0.08) 0%, transparent 70%)",
            filter: "blur(70px)",
            borderRadius: "50%",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
            filter: "blur(40px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* ── Engraved corner marks ── */}
      <div className="absolute top-24 right-12 w-12 h-12 pointer-events-none hidden lg:block">
        <div className="absolute top-0 right-0 w-5 h-5" style={{ borderTop: "1px solid rgba(201,168,76,0.35)", borderRight: "1px solid rgba(201,168,76,0.35)" }} />
        <div className="absolute bottom-0 left-0 w-5 h-5" style={{ borderBottom: "1px solid rgba(201,168,76,0.35)", borderLeft: "1px solid rgba(201,168,76,0.35)" }} />
      </div>
      <div className="absolute bottom-24 left-12 w-12 h-12 pointer-events-none hidden lg:block">
        <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: "1px solid rgba(201,168,76,0.2)", borderLeft: "1px solid rgba(201,168,76,0.2)" }} />
        <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: "1px solid rgba(201,168,76,0.2)", borderRight: "1px solid rgba(201,168,76,0.2)" }} />
      </div>

      {/* ── Gold hairline top rule ── */}
      <div
        className="absolute top-16 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }}
      />

      <div className="container-wide mx-auto relative z-10 py-8">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">

          {/* Status badge */}
          <motion.div variants={item} className="mb-8">
            <motion.span
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: "'Barlow Condensed', Inter, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.75)",
              }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "1px",
                  background: "rgba(201,168,76,0.5)",
                }}
              />
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: GOLD, boxShadow: `0 0 5px ${GOLD}` }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Available for work
            </motion.span>
          </motion.div>

          {/* Name heading — editorial serif */}
          <motion.div variants={item} className="mb-5">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                color: PLATINUM,
              }}
            >
              VYSHNAV
              <br />
              <span
                style={{
                  color: GOLD,
                  fontStyle: "italic",
                  textShadow: `0 0 40px rgba(201,168,76,0.25)`,
                }}
              >
                M<span style={{ color: "rgba(228,221,211,0.5)", fontStyle: "normal" }}>S</span>
              </span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={item} className="mb-8">
            <TypewriterRole />
          </motion.div>

          {/* Gold rule */}
          <motion.div
            variants={item}
            className="mb-8"
            style={{
              height: "1px",
              width: "120px",
              background: `linear-gradient(90deg, ${GOLD}, transparent)`,
            }}
          />

          {/* Description */}
          <motion.p
            variants={item}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              lineHeight: "1.75",
              maxWidth: "520px",
              color: "rgba(228,221,211,0.5)",
              marginBottom: "2.5rem",
            }}
          >
            Engineering{" "}
            <span style={{ color: GOLD_LIGHT, fontWeight: 500 }}>intelligent web systems</span>{" "}
            with React, Django, and AI — where precision meets performance.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
            <motion.button
              onClick={() => scrollTo("projects")}
              className="btn-gold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="View my projects"
            >
              View Projects <ArrowRight size={14} />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("contact")}
              className="btn-steel"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Contact me"
            >
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Stats — metal plates */}
          <motion.div variants={item} className="flex items-stretch gap-3 flex-wrap">
            {[
              { to: 3, suffix: "+", label: "Yrs Learning" },
              { to: 10, suffix: "+", label: "Projects Built" },
            ].map(({ to, suffix, label }) => (
              <div key={label} className="hud-stat min-w-[110px]">
                <Counter to={to} suffix={suffix} />
                <p
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.65rem",
                    marginTop: "0.25rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: GOLD_DIM,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
            <div className="hud-stat min-w-[110px]">
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "2rem",
                  color: GOLD,
                }}
              >
                MCA
              </span>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.65rem",
                  marginTop: "0.25rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: GOLD_DIM,
                }}
              >
                Pursuing
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
        style={{ color: "rgba(201,168,76,0.3)" }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
