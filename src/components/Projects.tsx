"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "Lumos Learning App",
    description:
      "Interactive learning application with adaptive difficulty levels and engaging lessons for enhanced user experience",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: "/lumos.png",
    github: "https://github.com/Vyshnav-ms/Lumos-learning-app",
    live: "https://lumos-learning-app.vercel.app/",
  },
  {
    title: "IncubateX",
    description: "Startup tracker for managing incubation projects, progress tracking, and milestone management",
    tech: ["Flutter", "Firebase", "Dart"],
    image: "/startup-management-dashboard.jpg",
    github: "https://github.com/Vyshnav-ms/incubatex-business-incubation-tracker",
    live: "#",
  },
  {
    title: "MentalPal",
    description: "Professional mentor matching platform connecting mentors with mentees based on expertise and goals",
    tech: ["Django", "Python", "SQLite3"],
    image: "/mentor-matching-platform-interface.jpg",
    github: "https://github.com/Vyshnav-ms/Mental-pal",
    live: "#",
  },
  {
    title: "Meet and Travel",
    description: "A web application built with Django that connects people with strangers to plan and travel together.",
    tech: ["Django", "Python", "SQLite3"],
    image: "/mentor-matching-platform-interface.jpg",
    github: "https://github.com/Vyshnav-ms/Meet-and-Travel",
    live: "#",
  },
  {
    title: "Admissions Landing Page",
    description: "Modern responsive landing page with smooth animations and optimal user experience design",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/lead.png",
    github: "#",
    live: "https://lead.ac.in/InternationalAdmission/",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern developer portfolio showcasing projects and skills with interactive animations and responsive design",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/dark-theme-ironman-futuristic-portfolio.jpg",
    github: "https://github.com/Vyshnav-ms/Vyshnav-portfolio",
    live: "https://vyshnavms-portfolio.vercel.app/",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="My"
          highlight="Projects"
          subtitle="A showcase of work that defines my craft"
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="glass-card glass-card-hover rounded-2xl p-6 lg:p-8 relative overflow-hidden group"
            >
              {/* Gradient top accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-accent to-primary/30" />

              {/* Hover glow orbs */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/8 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 space-y-4">
                <h3 className="font-poppins font-semibold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-full transition-all duration-300
                        bg-secondary text-muted-foreground border border-primary/20
                        hover:border-primary/50 hover:text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-5 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
