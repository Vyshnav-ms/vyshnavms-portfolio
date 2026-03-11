import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="min-h-screen flex items-center py-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="About"
          highlight="Me"
          subtitle="Crafting digital experiences at the intersection of design and technology"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-primary font-semibold">Vyshnav</span>, a developer focused on crafting
                responsive and intelligent web applications. I combine logical precision with design intuition
                to build user experiences that feel fluid and natural.
              </p>

              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                With expertise spanning from frontend frameworks like{" "}
                <span className="text-primary font-semibold">React</span> to backend systems with{" "}
                <span className="text-primary font-semibold">Django</span>, I bridge the gap between elegant design
                and robust functionality. My passion extends into{" "}
                <span className="text-accent font-semibold">AI</span> and{" "}
                <span className="text-accent font-semibold">Cybersecurity</span>, where I explore the intersection
                of innovation and protection.
              </p>

              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                Every project is an opportunity to push boundaries and create something{" "}
                <span className="gradient-text font-semibold">meaningful</span>.
              </p>
            </motion.div>

            {/* Card — Quick Facts */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group"
            >
              <div className="glass-card glass-card-hover rounded-2xl p-8 relative overflow-hidden">
                {/* Gradient glow on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <h3 className="font-poppins font-bold text-2xl gradient-text mb-6">
                    Quick Facts
                  </h3>
                  <ul className="space-y-4 font-inter text-muted-foreground">
                    {[
                      "Full Stack Development",
                      "AI & Prompt Engineering",
                      "Cybersecurity Enthusiast",
                      "Problem Solver & Innovator",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 group/item">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                        <span className="group-hover/item:text-foreground transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
