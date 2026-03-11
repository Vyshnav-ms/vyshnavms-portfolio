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
  },
  {
    title: "IncubateX",
    description: "Startup tracker for managing incubation projects, progress tracking, and milestone management.",
    tech: ["Flutter", "Firebase", "Dart"],
    github: "https://github.com/Vyshnav-ms/incubatex-business-incubation-tracker",
    live: null,
  },
  {
    title: "MentalPal",
    description: "Professional mentor matching platform connecting mentors with mentees based on expertise and goals.",
    tech: ["Django", "Python", "SQLite3"],
    github: "https://github.com/Vyshnav-ms/Mental-pal",
    live: null,
  },
  {
    title: "Meet and Travel",
    description: "A web app that connects people with strangers to plan and explore destinations together.",
    tech: ["Django", "Python", "SQLite3"],
    github: "https://github.com/Vyshnav-ms/Meet-and-Travel",
    live: null,
  },
  {
    title: "Admissions Landing Page",
    description: "High-conversion responsive landing page with smooth animations for international admissions.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    github: null,
    live: "https://lead.ac.in/InternationalAdmission/",
  },
  {
    title: "Portfolio Website",
    description: "This portfolio — modern developer showcase with animated layouts, dark/light mode, and responsive design.",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Vyshnav-ms/Vyshnav-portfolio",
    live: "https://vyshnavms-portfolio.vercel.app/",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding border-b border-[hsl(var(--border))]" style={{ background: "hsl(var(--card))" }}>
      <div className="container-wide mx-auto">
        <SectionHeading
          label="Projects"
          title="Selected"
          highlight="Work"
          subtitle="A curated collection of projects I've built and shipped."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col p-6 rounded-[var(--radius)] border border-[hsl(var(--border))] overflow-hidden"
              style={{ background: "hsl(var(--background))" }}
              whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(79,70,229,0.1)" }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {/* Animated gradient bar */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-indigo-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-dm-sans font-semibold text-base text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex gap-2 flex-shrink-0">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${project.title} GitHub`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={15} />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${project.title} live demo`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={15} />
                    </motion.a>
                  )}
                </div>
              </div>

              <p className="font-inter text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-inter text-xs px-2.5 py-1 rounded-md bg-[hsl(var(--surface-2))] text-muted-foreground border border-[hsl(var(--border))]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
