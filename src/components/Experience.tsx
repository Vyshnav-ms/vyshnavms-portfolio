import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

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
      style={{ background: "linear-gradient(180deg, #050c1a 0%, #030712 100%)" }}
    >
      <div className="container-wide mx-auto">
        <SectionHeading label="Experience" title="Where I've" highlight="Worked" />

        <div ref={ref} className="max-w-2xl">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, x: -24 }}
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
                  transition={{ duration: 1, delay: index * 0.14 + 0.3 }}
                  style={{
                    background: "linear-gradient(180deg, rgba(6,182,212,0.5), rgba(124,58,237,0.2))",
                    boxShadow: "0 0 4px rgba(6,182,212,0.2)",
                  }}
                />
              )}

              {/* Dot */}
              <div className="absolute left-0 top-[6px]">
                <div
                  className="w-4 h-4 rounded-full z-10 relative flex items-center justify-center"
                  style={{
                    background: "#030712",
                    border: "2px solid #06b6d4",
                    boxShadow: "0 0 10px rgba(6,182,212,0.6), 0 0 20px rgba(6,182,212,0.2)",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#06b6d4" }} />
                </div>
                {exp.status === "ACTIVE" && (
                  <motion.div
                    className="absolute inset-[-4px] rounded-full"
                    style={{ border: "1px solid rgba(6,182,212,0.3)" }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="mb-1.5">
                <div className="flex items-start gap-3 flex-wrap">
                  <h3 className="font-orbitron font-bold text-sm" style={{ color: "rgba(200,230,255,0.9)" }}>
                    {exp.role}
                  </h3>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                    style={{
                      color: exp.status === "ACTIVE" ? "#10b981" : "rgba(6,182,212,0.5)",
                      background: exp.status === "ACTIVE" ? "rgba(16,185,129,0.1)" : "rgba(6,182,212,0.05)",
                      border: `1px solid ${exp.status === "ACTIVE" ? "rgba(16,185,129,0.25)" : "rgba(6,182,212,0.12)"}`,
                    }}
                  >
                    {exp.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                  <span className="font-grotesk text-sm font-semibold" style={{ color: "#06b6d4" }}>
                    {exp.company}
                  </span>
                  <span style={{ color: "rgba(6,182,212,0.2)" }}>·</span>
                  <span className="font-mono text-xs" style={{ color: "rgba(200,230,255,0.35)" }}>
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
                    className="flex items-start gap-2.5 font-inter text-sm leading-relaxed"
                    style={{ color: "rgba(200,230,255,0.5)" }}
                  >
                    <span className="font-mono mt-0.5 flex-shrink-0" style={{ color: "#06b6d4", fontSize: "0.6rem" }}>
                      ▶
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
