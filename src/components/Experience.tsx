import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";
const PLATINUM = "rgba(228,221,211,0.9)";
const STEEL = "rgba(228,221,211,0.5)";

const experienceData = [
  {
    role: "Software Developer Intern",
    company: "Moonhive Private Limited",
    period: "Sep 2025 – Mar 2026",
    location: "Kerala, India",
    status: "COMPLETED",
    highlights: [
      "Managed and maintained WordPress websites on GoDaddy, ensuring 99%+ uptime.",
      "Developed and customized PHP-based web features, improving site functionality.",
      "Administered cPanel environments for server configuration and domain management.",
      "Collaborated with design and content teams to deliver projects on schedule.",
      "Streamlined CMS workflows, reducing update turnaround time for clients.",
      "Leveraged AI tools (Claude AI, Cursor AI, Codex, Gemini, Antigravity) to accelerate development.",
    ],
  },
  {
    role: "Junior Python Full Stack Developer Intern",
    company: "Inmakes Infotech",
    period: "Sep 2023 – Dec 2023",
    location: "Kerala, India",
    status: "COMPLETED",
    highlights: [
      "Built responsive web applications using React, Django, and TypeScript.",
      "Developed AI-integrated features using OpenAI APIs and prompt engineering.",
      "Delivered production-ready landing pages and full-stack SaaS prototypes.",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="section-padding section-border-b"
      style={{ background: "linear-gradient(180deg, #141414 0%, #0f0f0f 100%)" }}
    >
      <div className="container-wide mx-auto">
        <SectionHeading label="Experience" title="Where I've" highlight="Worked" />

        <div ref={ref} className="max-w-2xl">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-10 pb-10 last:pb-0"
            >
              {/* Timeline line */}
              {index < experienceData.length - 1 && (
                <motion.div
                  className="absolute left-[7px] top-4 w-[1px]"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: "calc(100% - 1rem)" } : {}}
                  transition={{ duration: 1.2, delay: index * 0.14 + 0.3 }}
                  style={{
                    background: `linear-gradient(180deg, rgba(201,168,76,0.45), rgba(201,168,76,0.08))`,
                  }}
                />
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-[6px]">
                <div
                  className="w-4 h-4 rounded-full z-10 relative flex items-center justify-center"
                  style={{
                    background: "#0f0f0f",
                    border: `1px solid ${GOLD}`,
                    boxShadow: `0 0 8px rgba(201,168,76,0.35)`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
                </div>
              </div>

              {/* Content */}
              <div className="mb-1.5">
                <div className="flex items-start gap-3 flex-wrap">
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: PLATINUM,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', Inter, sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "0.12rem 0.5rem",
                      borderRadius: "2px",
                      color: GOLD_DIM,
                      background: "rgba(201,168,76,0.06)",
                      border: "1px solid rgba(201,168,76,0.14)",
                    }}
                  >
                    {exp.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: GOLD,
                    }}
                  >
                    {exp.company}
                  </span>
                  <span style={{ color: "rgba(201,168,76,0.2)" }}>·</span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.72rem",
                      color: "rgba(228,221,211,0.32)",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
              </div>

              <ul className="mt-3 space-y-2">
                {exp.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.35, delay: index * 0.14 + i * 0.04 + 0.25 }}
                    className="flex items-start gap-2.5"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      lineHeight: "1.65",
                      color: STEEL,
                    }}
                  >
                    <span
                      style={{
                        color: GOLD_DIM,
                        fontSize: "0.5rem",
                        marginTop: "0.45rem",
                        flexShrink: 0,
                      }}
                    >
                      ◆
                    </span>
                    {h}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
