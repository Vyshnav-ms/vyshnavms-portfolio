import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  title: string;
  highlight: string;
  subtitle?: string;
}

const SectionHeading = ({ title, highlight, subtitle }: SectionHeadingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-foreground">
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground font-inter text-base max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto w-16 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent" />
    </motion.div>
  );
};

export default SectionHeading;
