"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

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
    institution:
      "University of Kerala",
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
    <section
      id="education"
      className="min-h-screen flex items-center py-20 bg-black text-white"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-bold text-4xl lg:text-5xl mb-12 text-center text-white">
            <span className="text-white-600">Education</span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-black border-2 border-red-600/30 rounded-2xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:border-red-600 hover:scale-[1.02] group shadow-lg"
              >
                {/* White glare hover effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />

                <div className="relative z-10">
                  {/* Degree */}
                  <div className="flex items-start gap-3 mb-3">
                    <GraduationCap className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <h3 className="font-poppins font-bold text-xl lg:text-2xl text-white">
                      {edu.degree}
                    </h3>
                  </div>

                  {/* Institution and Location */}
                  <div className="ml-9 mb-4 space-y-2">
                    <p className="font-inter text-lg text-red-500 font-medium">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-red-500" />
                        {edu.period}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="ml-9 space-y-2">
                    {edu.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1.5">▸</span>
                        <p className="font-inter text-sm text-gray-300">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
