"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import SectionHeading from "./SectionHeading";

const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "LEAD College of Management (Autonomous)",
    location: "Dhoni, Palakkad, Kerala",
    period: "2024 – Pursuing",
    highlights: [
      "Focusing on advanced concepts in AI, ML, and Full Stack Development.",
      "Engaged in hands-on projects integrating modern frameworks like React and Django.",
      "Active participant in academic events and technical workshops.",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "University of Kerala",
    location: "Kollam, Kerala",
    period: "2019 – 2022",
    highlights: [
      "Graduated with 71.08% overall.",
      "Developed a strong foundation in programming, databases, and software engineering.",
      "Completed a final-year project using Python and Django for web application development.",
    ],
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading title="Education" highlight="& Learning" />

        <div ref={ref} className="max-w-4xl mx-auto relative">
          {/* Timeline connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent hidden md:block" />

          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-[26px] top-8 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background hidden md:block" />

                <div className="glass-card glass-card-hover rounded-2xl p-6 lg:p-8 relative overflow-hidden">
                  {/* Subtle hover glow */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    {/* Degree */}
                    <div className="flex items-start gap-3 mb-3">
                      <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <h3 className="font-poppins font-bold text-xl lg:text-2xl text-foreground">
                        {edu.degree}
                      </h3>
                    </div>

                    {/* Institution and Location */}
                    <div className="ml-9 mb-4 space-y-2">
                      <p className="font-inter text-lg text-primary font-medium">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          {edu.period}
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="ml-9 space-y-2">
                      {edu.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5 text-sm">▸</span>
                          <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
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

export default Education;
