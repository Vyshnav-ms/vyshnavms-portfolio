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
    status: "ACTIVE",
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
    status: "COMPLETE",
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
      className="section-padding section-border-b"
      style={{ background: "#030712" }}
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
              className="group card-holo overflow-hidden"
              whileHover={{ y: -3 }}
            >
              {/* Left neon accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm"
                initial={{ scaleY: 0, originY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.14 + 0.2 }}
                style={{
                  background: "linear-gradient(180deg, #06b6d4, #7c3aed)",
                  boxShadow: "2px 0 12px rgba(6,182,212,0.3)",
                }}
              />

              <div className="flex gap-5 p-5 sm:p-6 pl-7">
                {/* Icon */}
                <motion.div
                  className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(6,182,212,0.06)",
                    border: "1px solid rgba(6,182,212,0.15)",
                  }}
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: "#06b6d4" }} />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="font-orbitron font-bold text-sm leading-snug" style={{ color: "rgba(200,230,255,0.9)" }}>
                      {edu.degree}
                    </h3>
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        color: edu.status === "ACTIVE" ? "#10b981" : "rgba(6,182,212,0.6)",
                        background: edu.status === "ACTIVE" ? "rgba(16,185,129,0.1)" : "rgba(6,182,212,0.06)",
                        border: `1px solid ${edu.status === "ACTIVE" ? "rgba(16,185,129,0.25)" : "rgba(6,182,212,0.15)"}`,
                      }}
                    >
                      {edu.status === "ACTIVE" && (
                        <motion.span
                          className="inline-block w-1.5 h-1.5 rounded-full mr-1"
                          style={{ background: "#10b981" }}
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      {edu.status}
                    </span>
                  </div>

                  <p className="font-grotesk text-sm font-semibold mt-1" style={{ color: "#06b6d4" }}>
                    {edu.institution}
                  </p>

                  <div className="flex gap-3 mt-1 flex-wrap">
                    <span className="font-mono text-xs" style={{ color: "rgba(200,230,255,0.35)" }}>
                      {edu.location}
                    </span>
                    <span style={{ color: "rgba(6,182,212,0.2)" }}>·</span>
                    <span className="font-mono text-xs" style={{ color: "rgba(200,230,255,0.35)" }}>
                      {edu.period}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 font-inter text-sm leading-relaxed"
                          style={{ color: "rgba(200,230,255,0.5)" }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#06b6d4" }} />
                        {h}
                      </li>
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
