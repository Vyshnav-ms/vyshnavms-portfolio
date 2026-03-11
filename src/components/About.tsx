import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const facts = [
  { label: "Role", value: "Full Stack Developer" },
  { label: "Location", value: "Kerala, India" },
  { label: "Education", value: "MCA — LEAD College, Palakkad" },
  { label: "Focus", value: "React · Django · AI" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding border-b border-gray-100 bg-white">
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              label="About Me"
              title="Building things"
              highlight="that matter"
              subtitle="Developer focused on clean code, thoughtful design, and real-world impact."
            />

            <div className="space-y-4 font-inter text-base text-muted-foreground leading-relaxed">
              <p>
                I'm <span className="font-medium text-foreground">Vyshnav M S</span>, a Full Stack Developer
                passionate about crafting web experiences that are not just functional — but delightful.
              </p>
              <p>
                My expertise spans modern frontend with <span className="font-medium text-foreground">React & TypeScript</span>{" "}
                and robust backend systems with <span className="font-medium text-foreground">Django & Python</span>.
                I'm increasingly drawn to the intersection of AI and product development.
              </p>
              <p>
                I approach every project with a product mindset — I care deeply about{" "}
                <span className="font-medium text-foreground">user experience</span>,{" "}
                <span className="font-medium text-foreground">code quality</span>, and{" "}
                <span className="font-medium text-foreground">performance</span>.
              </p>
            </div>
          </motion.div>

          {/* Facts card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-minimal p-8 space-y-0 divide-y divide-gray-50">
              {facts.map((fact, i) => (
                <div key={fact.label} className="flex justify-between items-center py-4">
                  <span className="font-inter text-sm text-muted-foreground">{fact.label}</span>
                  <span className="font-inter text-sm font-medium text-foreground text-right max-w-[60%]">
                    {fact.value}
                  </span>
                </div>
              ))}

              <div className="pt-5 flex gap-3">
                <a
                  href="https://github.com/Vyshnav-ms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-2 px-4 flex-1 justify-center"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/vyshnav-m-s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2 px-4 flex-1 justify-center"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
