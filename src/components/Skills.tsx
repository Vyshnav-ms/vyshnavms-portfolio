import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills, skillCategories } from "@/data/skills";
import SectionHeading from "./SectionHeading";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";
const PLATINUM = "rgba(228,221,211,0.88)";
const STEEL = "rgba(228,221,211,0.55)";

// Group skills by category (excluding "All")
const grouped = skillCategories
  .filter((c) => c !== "All")
  .map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  }));

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="skills"
      className="section-padding section-border-b"
      style={{ background: "#0f0f0f" }}
    >
      <div className="container-wide mx-auto">
        <SectionHeading
          label="Tech Stack"
          title="Skills &"
          highlight="Tools"
          subtitle="Technologies I use to build products from idea to deployment."
        />

        <div ref={ref} className="space-y-10">
          {grouped.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', Inter, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: GOLD_DIM,
                  }}
                >
                  {group.category}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)" }}
                />
              </div>

              {/* Skills row */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: gi * 0.07 + si * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-2 px-3 py-2 cursor-default transition-all duration-200"
                    style={{
                      background: "rgba(201,168,76,0.04)",
                      border: "1px solid rgba(201,168,76,0.1)",
                      borderRadius: "2px",
                    }}
                    whileHover={{
                      scale: 1.04,
                      borderColor: "rgba(201,168,76,0.35)",
                      boxShadow: "0 0 10px rgba(201,168,76,0.1)",
                      background: "rgba(201,168,76,0.07)",
                    }}
                  >
                    {/* Icon */}
                    <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        width={18}
                        height={18}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    {/* Name */}
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.72rem",
                        color: STEEL,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Specialized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: grouped.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', Inter, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: GOLD_DIM,
                }}
              >
                Specialized
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)" }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Prompt Engineering", "AI System Prompt Design & Optimization"].map((s) => (
                <span
                  key={s}
                  className="px-3 py-2"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.72rem",
                    color: GOLD,
                    background: "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.18)",
                    borderRadius: "2px",
                  }}
                >
                  ◈ {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
