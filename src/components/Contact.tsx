import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Phone } from "lucide-react";
import { Button } from "./ui/button-custom";
import { toast } from "sonner";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "khureshigaming@gmail.com",
      href: "mailto:khureshigaming@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Vyshnav-ms",
      href: "https://github.com/Vyshnav-ms",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/vyshnav-m-s",
      href: "https://linkedin.com/in/vyshnav-m-s",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8547776976",
      href: "tel:+918547776976",
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-foreground mb-12 text-center">
            Let's <span className="text-primary">Connect</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <p className="font-inter text-lg text-muted-foreground mb-6">
                  Let's collaborate or discuss new ideas. I'm always open to interesting projects and opportunities.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-card border-2 border-primary/30 rounded-lg transition-all duration-300 hover:border-primary hover:scale-105 group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg group-hover:bg-primary transition-colors duration-300">
                      <info.icon className="w-6 h-6 text-primary group-hover:text-foreground" />
                    </div>
                    <div>
                      <p className="font-inter text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-inter font-medium text-foreground">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-inter text-sm text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-card border-2 border-primary/30 rounded-lg text-foreground font-inter focus:outline-none focus:border-primary transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-inter text-sm text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-card border-2 border-primary/30 rounded-lg text-foreground font-inter focus:outline-none focus:border-primary transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-inter text-sm text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-card border-2 border-primary/30 rounded-lg text-foreground font-inter focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
