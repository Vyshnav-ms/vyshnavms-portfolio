import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";
const PLATINUM = "rgba(228,221,211,0.9)";

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
          className="mb-3 flex items-center gap-3"
          style={{
            fontFamily: "'Barlow Condensed', Inter, sans-serif",
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: GOLD,
          }}
        >
          {align !== "center" && (
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "1px",
                background: GOLD_DIM,
                flexShrink: 0,
              }}
            />
          )}
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
          color: PLATINUM,
        }}
      >
        {title}
        {highlight && (
          <span
            style={{
              color: GOLD,
              fontStyle: "italic",
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
          transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "0.75rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            maxWidth: " 520px",
            lineHeight: "1.65",
            color: "rgba(228,221,211,0.42)",
          }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Gold accent rule */}
      <div className={`mt-5 flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
        <motion.div
          style={{ height: "1px", borderRadius: "1px" }}
          initial={{ width: 0 }}
          animate={isInView ? { width: align === "center" ? "4rem" : "2.5rem" } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              height: "1px",
              width: "100%",
              background: `linear-gradient(90deg, ${GOLD}, transparent)`,
            }}
          />
        </motion.div>
        <motion.div
          style={{ height: "1px", width: "2rem", borderRadius: "1px" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div
            style={{
              height: "1px",
              width: "100%",
              background: "rgba(201,168,76,0.15)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SectionHeading;
