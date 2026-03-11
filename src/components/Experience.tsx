import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";

const experienceData = [
  {
    role: "Software Developer Intern",
    company: "Moonhive Private Limited",
    location: "Kerala, India",
    period: "September 2025 – March 2026",
    highlights: [
      "Managed and maintained WordPress websites hosted on GoDaddy, ensuring 99%+ uptime and performance.",
      "Developed and customized PHP-based web features, improving site functionality and client satisfaction.",
      "Administered cPanel environments for server configuration, domain management, and content deployment.",
      "Collaborated cross-functionally with design and content teams to deliver projects on schedule.",
      "Streamlined content management workflows, reducing update turnaround time for clients.",
      "Leveraged AI-powered developer tools including Claude AI, Cursor AI, Codex, Gemini, and Antigravity to accelerate development, automate repetitive tasks, and improve code quality.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Freelance & Academic Projects",
    location: "Kerala, India",
    period: "2023 – Present",
    highlights: [
      "Built responsive web applications using React, Django, and TypeScript.",
      "Developed AI-integrated features using OpenAI APIs and prompt engineering.",
      "Delivered production-ready landing pages and full-stack SaaS prototypes.",
      "Collaborated with cross-functional teams on agile workflows.",
    ],
  },
  {
    role: "Web Development Trainee",
    company: "Academic & Self-Learning",
    location: "Kerala, India",
    period: "2022 – 2023",
    highlights: [
      "Mastered front-end fundamentals: HTML5, CSS3, JavaScript, and React.",
      "Built backend REST APIs with Django and integrated database solutions.",
      "Completed cybersecurity fundamentals including network scanning and vulnerability assessment.",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading title="Work" highlight="Experience" />

        <div ref={ref} className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent/40 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-[26px] top-8 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background hidden md:block" />

                <div className="glass-card glass-card-hover rounded-2xl p-6 lg:p-8">
                  <div className="flex items-start gap-3 mb-3">
                    <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <h3 className="font-poppins font-bold text-xl lg:text-2xl text-foreground">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="ml-8 mb-4 space-y-2">
                    <p className="font-inter text-base text-primary font-medium">
                      {exp.company}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {exp.period}
                      </div>
                    </div>
                  </div>

                  <div className="ml-8 space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                        <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
