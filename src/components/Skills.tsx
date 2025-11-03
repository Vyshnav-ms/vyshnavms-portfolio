import { motion } from "framer-motion";
import { skills } from "@/data/skills";

const Skills = () => {
  return (
    <section id="skills" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex justify-center mb-10">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-foreground text-center border-b-4 border-primary pb-2 inline-block">
            Technical <span className="text-primary">Skills</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background border-2 border-primary/70 rounded-xl flex flex-col items-center justify-center p-6 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Logo */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback if logo fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Skill Name */}
              <p className="text-foreground text-sm font-inter font-medium text-center">
                {skill.name}
              </p>

              {/* White glare reflection on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/[0.08] transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
