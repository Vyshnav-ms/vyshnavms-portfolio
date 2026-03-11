import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skills } from "@/data/skills";
import SectionHeading from "./SectionHeading";

const categories = ["All", "Frontend", "Backend", "AI", "Cybersecurity"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Technical"
          highlight="Skills"
          subtitle="Tools and technologies I use to bring ideas to life"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-inter text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="glass-card glass-card-hover rounded-xl flex flex-col items-center justify-center p-6 group relative overflow-hidden"
            >
              {/* Glow orb on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Logo */}
              <div className="w-14 h-14 mb-4 flex items-center justify-center relative z-10">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Skill Name */}
              <p className="text-foreground text-sm font-inter font-medium text-center relative z-10 group-hover:text-primary transition-colors duration-300">
                {skill.name}
              </p>

              {/* Category badge — small */}
              <span className="mt-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider relative z-10">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
