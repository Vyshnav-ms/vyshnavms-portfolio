import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(79,70,229,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79,70,229,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* Soft ambient glow — top left */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-wide mx-auto relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Status badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-[0.15em] text-primary bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Available for work
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-dm-sans font-bold text-5xl sm:text-6xl lg:text-[68px] tracking-tight text-foreground leading-[1.05]"
          >
            Hi, I'm{" "}
            <span className="text-primary">Vyshnav</span>
            <br />
            <span className="text-foreground">Full Stack</span>
            <br />
            <span className="text-foreground/40">Developer.</span>
          </motion.h1>

          {/* Subheadline */}
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
            <button
              onClick={() => scrollTo("projects")}
              className="btn-primary"
              aria-label="View my projects"
            >
              View Projects <ArrowRight size={15} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-secondary"
              aria-label="Contact me"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-6"
          >
            <div className="text-center">
              <p className="font-dm-sans font-bold text-2xl text-foreground">3+</p>
              <p className="font-inter text-xs text-muted-foreground">Years Learning</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="font-dm-sans font-bold text-2xl text-foreground">10+</p>
              <p className="font-inter text-xs text-muted-foreground">Projects Built</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="font-dm-sans font-bold text-2xl text-foreground">MCA</p>
              <p className="font-inter text-xs text-muted-foreground">Pursuing</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <div className="w-px h-10 bg-gradient-to-b from-border to-transparent" />
        <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;
