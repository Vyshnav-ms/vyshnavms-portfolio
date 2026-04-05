import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";
const PLATINUM = "rgba(228,221,211,0.88)";
const STEEL = "rgba(228,221,211,0.5)";

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
    <section
      id="about"
      className="section-padding section-border-b"
      style={{
        background: "linear-gradient(180deg, #0f0f0f 0%, #141414 100%)",
      }}
    >
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Text column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              label="About Me"
              title="Building things"
              highlight="that matter"
              subtitle="Developer focused on clean code, thoughtful design, and real-world impact."
            />

            <div className="space-y-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.97rem", lineHeight: "1.75", color: STEEL }}>
              {[
                <>I'm <span style={{ color: PLATINUM, fontWeight: 600 }}>Vyshnav M S</span>, a Full Stack Developer passionate about crafting web experiences that are not just functional — but memorable.</>,
                <>My expertise spans modern frontend with <span style={{ color: GOLD, fontWeight: 500 }}>React & TypeScript</span> and robust backend systems with <span style={{ color: GOLD, fontWeight: 500 }}>Django & Python</span>. I'm increasingly drawn to the intersection of AI and product development.</>,
                <>I approach every project with a product mindset — caring deeply about <span style={{ color: PLATINUM, fontWeight: 500 }}>user experience</span>, <span style={{ color: PLATINUM, fontWeight: 500 }}>code quality</span>, and <span style={{ color: PLATINUM, fontWeight: 500 }}>performance</span>.</>,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Card column */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="card-metal engraved-corners overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              {/* Gold top rule */}
              <div
                style={{
                  height: "1px",
                  background: `linear-gradient(90deg, ${GOLD}, rgba(201,168,76,0.3), transparent)`,
                }}
              />

              <div className="p-6 sm:p-8">
                {/* Card header */}
                <p
                  className="mb-5 flex items-center gap-2"
                  style={{
                    fontFamily: "'Barlow Condensed', Inter, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: GOLD_DIM,
                  }}
                >
                  <span style={{ color: GOLD_DIM, fontSize: "0.8rem" }}>›</span>
                  Quick Facts
                  <span
                    className="inline-block w-[6px] h-[10px] rounded-sm ml-1"
                    style={{ background: GOLD, animation: "blink-cursor 0.8s step-end infinite" }}
                  />
                </p>

                {/* Facts list */}
                <div style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
                  {facts.map((fact, i) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex justify-between items-center py-3.5"
                      style={{ borderBottom: "1px solid rgba(201,168,76,0.06)" }}
                    >
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed', Inter, sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: GOLD_DIM,
                        }}
                      >
                        {fact.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: PLATINUM,
                          textAlign: "right",
                          maxWidth: "55%",
                        }}
                      >
                        {fact.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="pt-6 flex gap-3">
                  {[
                    { label: "GitHub", href: "https://github.com/Vyshnav-ms", cls: "btn-steel" },
                    { label: "LinkedIn", href: "https://linkedin.com/in/vyshnav-m-s", cls: "btn-gold" },
                  ].map(({ label, href, cls }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cls} flex-1 justify-center`}
                      style={{ fontSize: "0.68rem", padding: "0.6rem 1rem" }}
                      whileHover={{ scale: 1.02 }}
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
