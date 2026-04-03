import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeading = ({
  label,
  title,
  highlight,
  subtitle,
  align = "left",
}: SectionHeadingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
          style={{ color: "#06b6d4" }}
        >
          <span style={{ color: "rgba(6,182,212,0.4)" }}>//</span>
          {label}
          <span style={{ color: "rgba(6,182,212,0.4)" }}>──</span>
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="font-orbitron font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight"
        style={{ color: "rgba(200,230,255,0.9)" }}
      >
        {title}
        {highlight && (
          <span
            style={{
              color: "#06b6d4",
              textShadow: "0 0 20px rgba(6,182,212,0.4)",
            }}
          >
            {" "}
            {highlight}
          </span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-inter text-base max-w-lg leading-relaxed"
          style={{ color: "rgba(200,230,255,0.45)" }}
        >
          {subtitle}
        </motion.p>
      )}
      {/* Animated accent line */}
      <div className={`mt-5 flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
        <motion.div
          className="h-[2px] rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: align === "center" ? "4rem" : "2.5rem" } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "linear-gradient(90deg, #06b6d4, #7c3aed)",
            boxShadow: "0 0 6px rgba(6,182,212,0.5)",
          }}
        />
        <motion.div
          className="h-[1px] w-8 rounded-full"
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: 32 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ background: "rgba(6,182,212,0.2)" }}
        />
      </div>
    </motion.div>
  );
};

export default SectionHeading;
