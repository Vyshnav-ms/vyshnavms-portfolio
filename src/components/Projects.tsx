import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "Lumos Learning App",
    description: "Interactive learning application with adaptive difficulty levels and engaging lessons for enhanced user experience.",
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
    description: "A web app that connects people with strangers to plan and travel together.",
    tech: ["Django", "Python", "SQLite3"],
    github: "https://github.com/Vyshnav-ms/Meet-and-Travel",
    live: null,
  },
  {
    title: "Admissions Landing Page",
    description: "High-conversion responsive landing page with smooth animations for LEAD international admissions.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    github: null,
    live: "https://lead.ac.in/InternationalAdmission/",
  },
  {
    title: "Portfolio Website",
    description: "Modern developer portfolio showcasing projects and skills with animated layouts and responsive design.",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Vyshnav-ms/Vyshnav-portfolio",
    live: "https://vyshnavms-portfolio.vercel.app/",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding bg-white border-b border-gray-100">
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="card-minimal group flex flex-col p-6 bg-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-dm-sans font-semibold text-base text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <div className="flex gap-2 flex-shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${project.title} GitHub`}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="font-inter text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className="tag-neutral font-inter text-xs px-2.5 py-1 rounded-md bg-gray-50 text-muted-foreground border border-gray-100">
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
