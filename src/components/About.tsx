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
    <section id="about" className="section-padding border-b border-[hsl(var(--border))]" style={{ background: "hsl(var(--card))" }}>
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              label="About Me"
              title="Building things"
              highlight="that matter"
              subtitle="Developer focused on clean code, thoughtful design, and real-world impact."
            />

            <div className="space-y-4 font-inter text-base text-muted-foreground leading-relaxed">
              {[
                <>I'm <span className="font-medium text-foreground">Vyshnav M S</span>, a Full Stack Developer passionate about crafting web experiences that are not just functional — but delightful.</>,
                <>My expertise spans modern frontend with <span className="font-medium text-foreground">React & TypeScript</span> and robust backend systems with <span className="font-medium text-foreground">Django & Python</span>. I'm increasingly drawn to the intersection of AI and product development.</>,
                <>I approach every project with a product mindset — I care deeply about <span className="font-medium text-foreground">user experience</span>, <span className="font-medium text-foreground">code quality</span>, and <span className="font-medium text-foreground">performance</span>.</>,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="card-minimal overflow-hidden"
              style={{ background: "hsl(var(--background))" }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(79,70,229,0.08)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {/* Accent top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-indigo-400/50 to-transparent" />
              
              <div className="p-8">
                <p className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4">
                  Quick Facts
                </p>
                <div className="space-y-0 divide-y divide-[hsl(var(--border))]">
                  {facts.map((fact, i) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, x: 12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex justify-between items-center py-3.5"
                    >
                      <span className="font-inter text-sm text-muted-foreground">{fact.label}</span>
                      <span className="font-inter text-sm font-medium text-foreground text-right max-w-[60%]">{fact.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-5 flex gap-3">
                  {[
                    { label: "GitHub", href: "https://github.com/Vyshnav-ms", cls: "btn-secondary" },
                    { label: "LinkedIn", href: "https://linkedin.com/in/vyshnav-m-s", cls: "btn-primary" },
                  ].map(({ label, href, cls }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cls} text-xs py-2 px-4 flex-1 justify-center`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
