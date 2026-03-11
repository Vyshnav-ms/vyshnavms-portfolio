import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skills } from "@/data/skills";
import SectionHeading from "./SectionHeading";

const categories = ["All", "Frontend", "Backend", "AI", "Cybersecurity"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-background border-b border-gray-100">
      <div className="container-wide mx-auto">
        <SectionHeading
          label="Tech Stack"
          title="Skills &"
          highlight="Tools"
          subtitle="Technologies I use to build products from idea to deployment."
        />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-inter text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-gray-200 text-muted-foreground hover:border-gray-300 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filtered.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="card-minimal group flex flex-col items-center gap-3 p-5 bg-white"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  width={40}
                  height={40}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              <p className="font-inter text-xs font-medium text-muted-foreground group-hover:text-foreground text-center transition-colors duration-200">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
