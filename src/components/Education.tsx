import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { GraduationCap } from "lucide-react";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";
const PLATINUM = "rgba(228,221,211,0.9)";
const STEEL = "rgba(228,221,211,0.5)";

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
      style={{ background: "#0f0f0f" }}
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
              className="card-metal overflow-hidden"
              style={{ position: "relative" }}
              whileHover={{ y: -3 }}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                initial={{ scaleY: 0, originY: "top" }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.14 + 0.2 }}
                style={{
                  background: `linear-gradient(180deg, ${GOLD}, rgba(201,168,76,0.2))`,
                }}
              />

              <div className="flex gap-5 p-5 sm:p-6 pl-7">
                {/* Icon */}
                <motion.div
                  className="flex-shrink-0 mt-0.5 w-10 h-10 rounded flex items-center justify-center"
                  style={{
                    background: "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.15)",
                  }}
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: GOLD }} />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        lineHeight: 1.3,
                        color: PLATINUM,
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', Inter, sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        padding: "0.12rem 0.5rem",
                        borderRadius: "2px",
                        color: edu.status === "ACTIVE" ? GOLD : GOLD_DIM,
                        background: edu.status === "ACTIVE" ? "rgba(201,168,76,0.1)" : "rgba(201,168,76,0.05)",
                        border: `1px solid ${edu.status === "ACTIVE" ? "rgba(201,168,76,0.28)" : "rgba(201,168,76,0.12)"}`,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {edu.status === "ACTIVE" && (
                        <motion.span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: GOLD }}
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                        />
                      )}
                      {edu.status}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      marginTop: "0.25rem",
                      color: GOLD,
                    }}
                  >
                    {edu.institution}
                  </p>

                  <div className="flex gap-3 mt-1 flex-wrap">
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.7rem",
                        color: "rgba(228,221,211,0.32)",
                      }}
                    >
                      {edu.location}
                    </span>
                    <span style={{ color: "rgba(201,168,76,0.2)" }}>·</span>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.7rem",
                        color: "rgba(228,221,211,0.32)",
                      }}
                    >
                      {edu.period}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {edu.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.875rem",
                          lineHeight: "1.6",
                          color: STEEL,
                        }}
                      >
                        <span
                          className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: GOLD_DIM }}
                        />
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
