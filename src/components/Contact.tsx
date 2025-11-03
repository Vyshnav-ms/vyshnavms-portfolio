import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { SiWhatsapp } from "react-icons/si"; // ✅ WhatsApp icon

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "vyshnams1@gmail.com",
      href: "mailto:vyshnams1@gmail.com",
      description: "Let's talk about your next big idea!",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Vyshnav-ms",
      href: "https://github.com/Vyshnav-ms",
      description: "Check out my latest open-source work.",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/vyshnav-m-s",
      href: "https://linkedin.com/in/vyshnav-m-s",
      description: "Let's grow our professional network.",
    },
    {
      icon: SiWhatsapp,
      label: "WhatsApp",
      value: "+91 8547776976",
      href: "https://wa.me/918547776976",
      description: "Message me directly on WhatsApp.",
      isWhatsApp: true,
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-center text-foreground mb-12">
            Let’s <span className="text-primary">Connect</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactLinks.map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="group relative bg-card/50 border border-primary/30 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full 
                    bg-secondary group-hover:bg-primary transition-colors duration-300`}
                  >
                    <contact.icon
                      className={`w-7 h-7 ${
                        contact.isWhatsApp
                          ? "text-primary group-hover:text-foreground"
                          : "text-primary group-hover:text-foreground"
                      }`}
                    />
                  </div>

                  <h3 className="font-semibold text-lg text-foreground">{contact.label}</h3>

                  <p
                    onClick={() => handleCopy(contact.value)}
                    className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    {contact.value}
                  </p>

                  <p className="text-xs text-muted-foreground/80">{contact.description}</p>

                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2 border border-primary rounded-lg text-primary font-inter text-sm hover:bg-primary hover:text-foreground transition-all duration-300"
                  >
                    {contact.isWhatsApp ? "Message" : "Visit"}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
