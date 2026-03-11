import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const experienceData = [
  {
    role: "Software Developer Intern",
    company: "Moonhive Private Limited",
    period: "Sep 2025 – Mar 2026",
    location: "Kerala, India",
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
    role: "Full Stack Developer",
    company: "Freelance & Academic Projects",
    period: "2023 – Present",
    location: "Kerala, India",
    highlights: [
      "Built responsive web applications using React, Django, and TypeScript.",
      "Developed AI-integrated features using OpenAI APIs and prompt engineering.",
      "Delivered production-ready landing pages and full-stack SaaS prototypes.",
    ],
  },
  {
    role: "Web Development Trainee",
    company: "Academic & Self-Learning",
    period: "2022 – 2023",
    location: "Kerala, India",
    highlights: [
      "Mastered front-end fundamentals: HTML5, CSS3, JavaScript, and React.",
      "Built backend REST APIs with Django and SQLite/PostgreSQL.",
      "Completed cybersecurity fundamentals including network scanning and vulnerability assessment.",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="section-padding border-b border-[hsl(var(--border))]"
      style={{ background: "hsl(var(--background))" }}
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
              className="relative pl-8 pb-10 last:pb-0"
            >
              {/* Animated timeline line fill */}
              {index < experienceData.length - 1 && (
                <motion.div
                  className="absolute left-[5px] top-4 w-[1.5px] bg-gradient-to-b from-primary/60 to-[hsl(var(--border))]"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: "calc(100% - 1rem)" } : {}}
                  transition={{ duration: 0.8, delay: index * 0.14 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              {/* Dot with pulse */}
              <div className="absolute left-0 top-[6px]">
                <div className="w-[11px] h-[11px] rounded-full bg-[hsl(var(--card))] border-2 border-primary z-10 relative" />
                <motion.div
                  className="absolute inset-[-3px] rounded-full border border-primary/30"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                />
              </div>

              <div className="mb-1.5">
                <h3 className="font-dm-sans font-semibold text-base text-foreground">{exp.role}</h3>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                  <span className="font-inter text-sm font-medium text-primary">{exp.company}</span>
                  <span className="text-muted-foreground/40 text-xs">·</span>
                  <span className="font-inter text-xs text-muted-foreground">{exp.period}</span>
                </div>
              </div>

              <ul className="mt-3 space-y-1.5">
                {exp.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.35, delay: index * 0.14 + i * 0.04 + 0.2 }}
                    className="flex items-start gap-2 font-inter text-sm text-muted-foreground leading-relaxed"
                  >
                    <span className="text-primary mt-1 flex-shrink-0 text-xs">–</span>
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
