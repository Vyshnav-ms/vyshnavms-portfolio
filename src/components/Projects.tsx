import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "Lumos Learning App",
    description: "Interactive learning application with adaptive difficulty levels and engaging lessons for enhanced UX.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Vyshnav-ms/Lumos-learning-app",
    live: "https://lumos-learning-app.vercel.app/",
    index: "01",
  },
  {
    title: "IncubateX",
    description: "Startup tracker for managing incubation projects, progress tracking, and milestone management.",
    tech: ["Flutter", "Firebase", "Dart"],
    github: "https://github.com/Vyshnav-ms/incubatex-business-incubation-tracker",
    live: null,
    index: "02",
  },
  {
    title: "MentalPal",
    description: "Professional mentor matching platform connecting mentors with mentees based on expertise and goals.",
    tech: ["Django", "Python", "SQLite3"],
    github: "https://github.com/Vyshnav-ms/Mental-pal",
    live: null,
    index: "03",
  },
  {
    title: "Meet and Travel",
    description: "A web app that connects people with strangers to plan and explore destinations together.",
    tech: ["Django", "Python", "SQLite3"],
    github: "https://github.com/Vyshnav-ms/Meet-and-Travel",
    live: null,
    index: "04",
  },
  {
    title: "Admissions Landing Page",
    description: "High-conversion responsive landing page with smooth animations for international admissions.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    github: null,
    live: "https://lead.ac.in/InternationalAdmission/",
    index: "05",
  },
  {
    title: "Portfolio Website",
    description: "This portfolio — futuristic developer showcase with holographic layouts and animated cyber UI.",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Vyshnav-ms/Vyshnav-portfolio",
    live: "https://vyshnavms-portfolio.vercel.app/",
    index: "06",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="section-padding section-border-b"
      style={{ background: "linear-gradient(180deg, #050c1a 0%, #030712 100%)" }}
    >
      <div className="container-wide mx-auto">
        <SectionHeading
          label="Projects"
          title="Selected"
          highlight="Work"
          subtitle="A curated collection of projects I've built and shipped."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-lg overflow-hidden"
              style={{
                background: "rgba(7,14,31,0.9)",
                border: "1px solid rgba(6,182,212,0.1)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
              }}
              whileHover={{
                y: -5,
                borderColor: "rgba(6,182,212,0.35)",
                boxShadow: "0 0 25px rgba(6,182,212,0.12), 0 12px 40px rgba(0,0,0,0.5)",
              }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Animated scan bar on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, transparent, #06b6d4, #7c3aed, transparent)",
                  boxShadow: "0 0 8px rgba(6,182,212,0.6)",
                  scaleX: 0,
                  transformOrigin: "left",
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="p-5 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: "rgba(6,182,212,0.35)" }}
                    >
                      {project.index}
                    </span>
                    <h3
                      className="font-orbitron font-bold text-xs leading-snug transition-colors duration-300"
                      style={{ color: "rgba(200,230,255,0.85)" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded flex items-center justify-center transition-all duration-200"
                        style={{
                          color: "rgba(200,230,255,0.4)",
                          background: "rgba(6,182,212,0.04)",
                          border: "1px solid rgba(6,182,212,0.1)",
                        }}
                        aria-label={`${project.title} GitHub`}
                        whileHover={{
                          scale: 1.15,
                          color: "#06b6d4",
                          borderColor: "rgba(6,182,212,0.4)",
                          boxShadow: "0 0 8px rgba(6,182,212,0.3)",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={13} />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded flex items-center justify-center transition-all duration-200"
                        style={{
                          color: "rgba(200,230,255,0.4)",
                          background: "rgba(6,182,212,0.04)",
                          border: "1px solid rgba(6,182,212,0.1)",
                        }}
                        aria-label={`${project.title} live demo`}
                        whileHover={{
                          scale: 1.15,
                          color: "#10b981",
                          borderColor: "rgba(16,185,129,0.4)",
                          boxShadow: "0 0 8px rgba(16,185,129,0.3)",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={13} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p
                  className="font-inter text-sm leading-relaxed flex-1 mb-4"
                  style={{ color: "rgba(200,230,255,0.45)" }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-1 rounded"
                      style={{
                        color: "rgba(6,182,212,0.7)",
                        background: "rgba(6,182,212,0.05)",
                        border: "1px solid rgba(6,182,212,0.12)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="h-[1px] w-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.12), transparent)",
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
