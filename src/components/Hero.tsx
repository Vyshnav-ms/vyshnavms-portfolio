import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

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
    <motion.span ref={ref} className="font-dm-sans font-bold text-3xl text-foreground">
      {display}
    </motion.span>
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
      aria-label="Hero section"
    >
      {/* ── Animated gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, hsl(244,55%,58%), transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, hsl(244,55%,58%), transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 pointer-events-none hero-grid"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(79,70,229,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79,70,229,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      <div className="container-wide mx-auto relative z-10">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">

          {/* Badge */}
          <motion.div variants={item} className="mb-6">
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-[0.15em] text-primary bg-[hsl(var(--primary-light))] px-4 py-1.5 rounded-full border border-primary/15"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              Available for work
            </motion.span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="font-dm-sans font-bold text-5xl sm:text-6xl lg:text-[70px] tracking-tight text-foreground leading-[1.05]"
          >
            Hi, I'm{" "}
            <span className="text-primary relative inline-block">
              Vyshnav
              {/* animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] rounded-full bg-primary/40"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Full Stack
            </motion.span>{" "}
            <motion.span
              className="text-foreground/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Developer.
            </motion.span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="mt-6 font-inter text-lg text-muted-foreground leading-relaxed max-w-lg"
          >
            I build clean, fast, and intelligent web applications using{" "}
            <span className="font-medium text-foreground">React</span>,{" "}
            <span className="font-medium text-foreground">Django</span>, and{" "}
            <span className="font-medium text-foreground">AI</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <motion.button
              onClick={() => scrollTo("projects")}
              className="btn-primary"
              whileHover={{ scale: 1.04, boxShadow: "0 6px 24px hsl(244 55% 58% / 0.35)" }}
              whileTap={{ scale: 0.97 }}
              aria-label="View my projects"
            >
              View Projects <ArrowRight size={15} />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("contact")}
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Contact me"
            >
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-14 flex items-center gap-8 flex-wrap"
          >
            {[
              { to: 3, suffix: "+", label: "Years Learning" },
              { to: 10, suffix: "+", label: "Projects Built" },
            ].map(({ to, suffix, label }, i) => (
              <div key={label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-8 bg-[hsl(var(--border))]" />}
                <div className="text-center">
                  <Counter to={to} suffix={suffix} />
                  <p className="font-inter text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              </div>
            ))}
            <div className="w-px h-8 bg-[hsl(var(--border))]" />
            <div className="text-center">
              <span className="font-dm-sans font-bold text-3xl text-foreground">MCA</span>
              <p className="font-inter text-xs text-muted-foreground mt-0.5">Pursuing</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/40 hover:text-primary transition-colors group"
        aria-label="Scroll down"
      >
        <span className="font-inter text-[10px] uppercase tracking-[0.2em]">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
