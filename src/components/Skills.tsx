import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skills, skillCategories } from "@/data/skills";
import SectionHeading from "./SectionHeading";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding border-b border-[hsl(var(--border))]" style={{ background: "hsl(var(--background))" }}>
      <div className="container-wide mx-auto">
        <SectionHeading
          label="Tech Stack"
          title="Skills &"
          highlight="Tools"
          subtitle="Technologies I use to build products from idea to deployment."
        />

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-inter text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-muted-foreground hover:border-[hsl(var(--foreground-3))] hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {filtered.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card-minimal group flex flex-col items-center gap-3 p-5"
              style={{ background: "hsl(var(--card))" }}
            >
              {/* Logo */}
              <div className="w-9 h-9 flex items-center justify-center">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 dark:invert-[0.15]"
                  loading="lazy"
                  width={36}
                  height={36}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              {/* Name */}
              <p className="font-inter text-xs font-medium text-muted-foreground group-hover:text-foreground text-center transition-colors duration-200 leading-tight">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Specialized skills — text list */}
        <div className="mt-10 p-6 card-minimal" style={{ background: "hsl(var(--card))" }}>
          <p className="font-inter text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-3">
            Specialized
          </p>
          <div className="flex flex-wrap gap-2">
            {["Prompt Engineering", "AI System Prompt Design & Optimization"].map((s) => (
              <span key={s} className="tag text-xs px-3 py-1.5">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
