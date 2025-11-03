import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-foreground mb-12 text-center">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                I'm Vyshnav, a developer focused on crafting responsive and intelligent web applications.
                I combine logical precision with design intuition to build user experiences that feel fluid and natural.
              </p>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                With expertise spanning from frontend frameworks like React to backend systems with Django, 
                I bridge the gap between elegant design and robust functionality. My passion extends into AI and 
                cybersecurity, where I explore the intersection of innovation and protection.
              </p>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                Every project is an opportunity to push boundaries and create something meaningful.
              </p>
            </motion.div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group"
            >
              <div className="bg-card border-2 border-primary/50 rounded-lg p-8 transition-all duration-300 hover:border-primary hover:scale-105 relative overflow-hidden">
                {/* Glare effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <h3 className="font-poppins font-bold text-2xl text-primary mb-4">Quick Facts</h3>
                  <ul className="space-y-3 font-inter text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <span className="text-primary">▸</span>
                      Full Stack Development
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary">▸</span>
                      AI & Prompt Engineering
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary">▸</span>
                      Cybersecurity Enthusiast
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary">▸</span>
                      Problem Solver & Innovator
                    </li>
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
