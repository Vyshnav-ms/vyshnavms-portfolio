import { motion } from "framer-motion";
import { Button } from "./ui/button-custom";
import LiquidEther from "./LiquidEther";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Ambient gradient background */}
      <div className="absolute inset-0 animated-gradient-bg" />

      {/* LiquidEther — Teal + Gold tones */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#0ea370", "#0d9488", "#f5c542"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={25}
          iterationsViscous={28}
          iterationsPoisson={28}
          resolution={0.45}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={1.8}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? 3 : 2,
              height: i % 2 === 0 ? 3 : 2,
              background: i % 3 === 0 ? "rgba(245,197,66,0.3)" : "rgba(14,163,112,0.3)",
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex items-center justify-center h-full">
        <div className="text-center lg:text-left space-y-7 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 font-inter text-xs tracking-[0.3em] uppercase text-muted-foreground border border-white/8 px-5 py-2.5 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Full Stack Developer · AI Enthusiast
            </span>
          </motion.div>

          <motion.h1
            className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Vyshnav{" "}
            <span className="gradient-text">M S</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-inter text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Crafting clean, intelligent, and performant digital experiences
            that make a lasting impression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2"
          >
            <Button
              variant="hero"
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
