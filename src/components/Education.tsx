import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "LEAD College of Management (Autonomous)",
    location: "Dhoni, Palakkad, Kerala",
    period: "2024 – Pursuing",
    highlights: [
      "Focused on AI, ML, and Full Stack Development.",
      "Engaged in hands-on projects with React, Django, and emerging technologies.",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "University of Kerala",
    location: "Kollam, Kerala",
    period: "2019 – 2022",
    highlights: [
      "Graduated with 71.08%. Built a strong foundation in programming, databases, and software engineering.",
      "Final-year project: web application built with Python and Django.",
    ],
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding bg-white border-b border-gray-100">
      <div className="container-wide mx-auto">
        <SectionHeading label="Education" title="Academic" highlight="Background" />

        <div ref={ref} className="max-w-2xl space-y-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="card-minimal p-6 bg-white flex gap-5"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-dm-sans font-semibold text-base text-foreground leading-snug">
                  {edu.degree}
                </h3>
                <p className="font-inter text-sm font-medium text-primary mt-0.5">{edu.institution}</p>
                <div className="flex gap-3 mt-1">
                  <span className="font-inter text-xs text-muted-foreground">{edu.location}</span>
                  <span className="text-muted-foreground/40 text-xs">·</span>
                  <span className="font-inter text-xs text-muted-foreground">{edu.period}</span>
                </div>

                <ul className="mt-3 space-y-1">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="font-inter text-sm text-muted-foreground leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
