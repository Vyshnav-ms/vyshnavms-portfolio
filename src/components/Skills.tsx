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
      className="section-padding border-b border-[hsl(var(--border))]"
      style={{ background: "hsl(var(--background))" }}
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
                <span className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {group.category}
                </span>
                <div className="flex-1 h-px bg-[hsl(var(--border))]" />
              </div>

              {/* Skills row */}
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: gi * 0.07 + si * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-primary/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    {/* Color logo — always full color */}
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
                    <span className="font-inter text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
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
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Specialized
              </span>
              <div className="flex-1 h-px bg-[hsl(var(--border))]" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {["Prompt Engineering", "AI System Prompt Design & Optimization"].map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-2 rounded-lg border border-primary/30 bg-[hsl(var(--primary-light))] font-inter text-sm text-primary"
                >
                  {s}
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
