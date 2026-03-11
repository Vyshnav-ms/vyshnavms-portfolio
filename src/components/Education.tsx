import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "LEAD College of Management (Autonomous)",
    location: "Dhoni, Palakkad, Kerala",
    period: "2024 – Pursuing",
    highlights: [
      "Focused on AI, ML, and Full Stack Development.",
      "Hands-on projects with React, Django, and emerging technologies.",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "University of Kerala",
    location: "Kollam, Kerala",
    period: "2019 – 2022",
    highlights: [
      "Graduated with 71.08%. Strong foundation in programming, databases, and software engineering.",
      "Final-year project: web application built with Python and Django.",
    ],
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
      className="section-padding border-b border-[hsl(var(--border))]"
      style={{ background: "hsl(var(--card))" }}
    >
      <div className="container-wide mx-auto">
        <SectionHeading label="Education" title="Academic" highlight="Background" />

        <div ref={ref} className="max-w-2xl space-y-5">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[var(--radius)] border border-[hsl(var(--border))] overflow-hidden"
              style={{ background: "hsl(var(--background))" }}
              whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(79,70,229,0.08)" }}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/40"
                initial={{ scaleY: 0, originY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.14 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="flex gap-5 p-6 pl-7">
                <motion.div
                  className="flex-shrink-0 mt-1 w-9 h-9 rounded-lg bg-[hsl(var(--primary-light))] flex items-center justify-center"
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <GraduationCap className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-base text-foreground leading-snug">{edu.degree}</h3>
                  <p className="font-inter text-sm font-medium text-primary mt-0.5">{edu.institution}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="font-inter text-xs text-muted-foreground">{edu.location}</span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <span className="font-inter text-xs text-muted-foreground">{edu.period}</span>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="font-inter text-sm text-muted-foreground leading-relaxed">{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
