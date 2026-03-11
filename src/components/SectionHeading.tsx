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
          className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="font-dm-sans font-bold text-3xl lg:text-4xl tracking-tight text-foreground"
      >
        {title}
        {highlight && <span className="text-primary"> {highlight}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-muted-foreground font-inter text-base max-w-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      {/* Animated accent line */}
      <motion.div
        className="mt-5 h-[2px] rounded-full bg-gradient-to-r from-primary/70 to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: align === "center" ? "4rem" : "2.5rem" } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ ...(align === "center" ? { margin: "1.25rem auto 0" } : {}) }}
      />
    </motion.div>
  );
};

export default SectionHeading;
