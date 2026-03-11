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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <p className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3">
          {label}
        </p>
      )}
      <h2 className="font-dm-sans font-bold text-3xl lg:text-4xl tracking-tight text-foreground">
        {title}
        {highlight && (
          <span className="text-primary"> {highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground font-inter text-base max-w-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
