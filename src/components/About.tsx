import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const facts = [
  { label: "ROLE", value: "Full Stack Developer" },
  { label: "LOCATION", value: "Kerala, India" },
  { label: "EDUCATION", value: "MCA — LEAD College, Palakkad" },
  { label: "FOCUS", value: "React · Django · AI" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="section-padding section-border-b"
      style={{ background: "linear-gradient(180deg, #030712 0%, #050c1a 100%)" }}
    >
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

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

            <div className="space-y-4 font-inter text-base leading-relaxed" style={{ color: "rgba(200,230,255,0.55)" }}>
              {[
                <>I'm <span style={{ color: "rgba(200,230,255,0.9)", fontWeight: 600 }}>Vyshnav M S</span>, a Full Stack Developer passionate about crafting web experiences that are not just functional — but delightful.</>,
                <>My expertise spans modern frontend with <span style={{ color: "#06b6d4", fontWeight: 600 }}>React &amp; TypeScript</span> and robust backend systems with <span style={{ color: "#06b6d4", fontWeight: 600 }}>Django &amp; Python</span>. I'm increasingly drawn to the intersection of AI and product development.</>,
                <>I approach every project with a product mindset — caring deeply about <span style={{ color: "rgba(200,230,255,0.9)", fontWeight: 600 }}>user experience</span>, <span style={{ color: "rgba(200,230,255,0.9)", fontWeight: 600 }}>code quality</span>, and <span style={{ color: "rgba(200,230,255,0.9)", fontWeight: 600 }}>performance</span>.</>,
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
              className="card-holo bracket-corners overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {/* Accent top bar */}
              <div
                className="h-[2px] w-full"
                style={{ background: "linear-gradient(90deg, #06b6d4, #7c3aed, transparent)" }}
              />

              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] mb-5 flex items-center gap-2"
                   style={{ color: "#06b6d4" }}>
                  <span style={{ color: "rgba(6,182,212,0.4)" }}>&gt;</span>
                  QUICK_FACTS.json
                  <span className="inline-block w-[6px] h-[10px] rounded-sm ml-1"
                        style={{ background: "#06b6d4", animation: "blink-cursor 0.8s step-end infinite" }} />
                </p>

                <div className="space-y-0" style={{ borderTop: "1px solid rgba(6,182,212,0.08)" }}>
                  {facts.map((fact, i) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, x: 12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex justify-between items-center py-3.5"
                      style={{ borderBottom: "1px solid rgba(6,182,212,0.06)" }}
                    >
                      <span className="font-mono text-xs tracking-[0.1em]" style={{ color: "rgba(6,182,212,0.5)" }}>
                        {fact.label}
                      </span>
                      <span className="font-inter text-sm font-medium text-right max-w-[55%]"
                            style={{ color: "rgba(200,230,255,0.85)" }}>
                        {fact.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="pt-6 flex gap-3">
                  {[
                    { label: "GitHub", href: "https://github.com/Vyshnav-ms", cls: "btn-cyber" },
                    { label: "LinkedIn", href: "https://linkedin.com/in/vyshnav-m-s", cls: "btn-primary" },
                  ].map(({ label, href, cls }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cls} text-[10px] py-2.5 px-4 flex-1 justify-center`}
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
