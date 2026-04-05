import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";
const PLATINUM = "rgba(228,221,211,0.85)";
const STEEL = "rgba(228,221,211,0.45)";

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
    description: "This portfolio — a premium developer showcase with a classic metallic professional aesthetic.",
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
      style={{ background: "linear-gradient(180deg, #141414 0%, #0f0f0f 100%)" }}
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
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(14,14,14,0.98) 100%)",
                border: "1px solid rgba(201,168,76,0.1)",
                borderRadius: "3px",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
              }}
              whileHover={{
                y: -5,
                borderColor: "rgba(201,168,76,0.32)",
                boxShadow: "0 0 24px rgba(201,168,76,0.08), 0 12px 40px rgba(0,0,0,0.55)",
              }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Gold scan bar on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                  scaleX: 0,
                  transformOrigin: "left",
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="p-5 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "0.75rem",
                        color: GOLD_DIM,
                        fontStyle: "italic",
                      }}
                    >
                      {project.index}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        lineHeight: 1.3,
                        color: PLATINUM,
                      }}
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
                          color: "rgba(228,221,211,0.38)",
                          background: "rgba(201,168,76,0.04)",
                          border: "1px solid rgba(201,168,76,0.1)",
                        }}
                        aria-label={`${project.title} GitHub`}
                        whileHover={{
                          scale: 1.12,
                          color: GOLD,
                          borderColor: "rgba(201,168,76,0.4)",
                          boxShadow: "0 0 8px rgba(201,168,76,0.2)",
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
                          color: "rgba(228,221,211,0.38)",
                          background: "rgba(201,168,76,0.04)",
                          border: "1px solid rgba(201,168,76,0.1)",
                        }}
                        aria-label={`${project.title} live demo`}
                        whileHover={{
                          scale: 1.12,
                          color: "#e0bc6a",
                          borderColor: "rgba(224,188,106,0.4)",
                          boxShadow: "0 0 8px rgba(224,188,106,0.2)",
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
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.83rem",
                    lineHeight: "1.65",
                    color: STEEL,
                    flex: 1,
                    marginBottom: "1rem",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.62rem",
                        padding: "0.2rem 0.6rem",
                        color: GOLD_DIM,
                        background: "rgba(201,168,76,0.05)",
                        border: "1px solid rgba(201,168,76,0.12)",
                        borderRadius: "2px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom gold accent */}
              <div
                style={{
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)",
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
