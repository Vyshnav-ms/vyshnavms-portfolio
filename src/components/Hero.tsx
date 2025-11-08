import { motion } from "framer-motion";
import { Button } from "./ui/button-custom";
import LiquidEther from "./LiquidEther"; // ✅ Ensure correct path

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* 🔴 Liquid Ether Background */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <LiquidEther
          colors={["#ff1b1b", "#ff4040", "#ff8080"]} // Red tone
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={25}
          iterationsViscous={28}
          iterationsPoisson={28}
          resolution={0.45}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.6}
          autoIntensity={2.0}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>

      {/* 🧠 Text Content (on top of Liquid Ether) */}
      <div className="relative z-10 container mx-auto px-6 flex items-center justify-center h-full">
        <div className="text-center lg:text-left space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-lg text-muted-foreground"
          >
            Hi, I'm
          </motion.h2>

          <motion.h1
            className="font-poppins font-bold text-5xl lg:text-7xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Vyshnav M S
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-poppins text-2xl lg:text-3xl text-red-400"
          >
            Full Stack Developer · React | Django | AI Enthusiast
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-inter text-lg text-gray-300 max-w-xl mx-auto lg:mx-0"
          >
            “Building clean, intelligent, and high-performing web experiences.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
          >
            <Button
              variant="hero"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
