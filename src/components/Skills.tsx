import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills, skillCategories } from "@/data/skills";
import SectionHeading from "./SectionHeading";

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
      style={{ background: "#030712" }}
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
              transition={{ duration: 0.45, delay: gi * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#06b6d4" }}
                >
                  // {group.category}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.25), transparent)" }}
                />
              </div>

              {/* Skills row */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: gi * 0.07 + si * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 group cursor-default"
                    style={{
                      background: "rgba(6,182,212,0.04)",
                      border: "1px solid rgba(6,182,212,0.12)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(6,182,212,0.4)",
                      boxShadow: "0 0 10px rgba(6,182,212,0.15)",
                      background: "rgba(6,182,212,0.08)",
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
                      className="font-mono text-xs whitespace-nowrap transition-colors duration-200"
                      style={{ color: "rgba(200,230,255,0.65)" }}
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
            transition={{ duration: 0.45, delay: grouped.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#06b6d4" }}
              >
                // Specialized
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.25), transparent)" }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Prompt Engineering", "AI System Prompt Design & Optimization"].map((s) => (
                <span
                  key={s}
                  className="px-3 py-2 rounded-md font-mono text-xs"
                  style={{
                    color: "#a78bfa",
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.2)",
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
