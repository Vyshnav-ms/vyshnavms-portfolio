import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { SiWhatsapp } from "react-icons/si";
import SectionHeading from "./SectionHeading";

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
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Let's"
          highlight="Connect"
          subtitle="Got a project in mind? Let's build something amazing together."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {contactLinks.map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
                className="group glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-400">
                    <contact.icon className="w-6 h-6 text-primary group-hover:text-background transition-colors duration-300" />
                  </div>

                  <h3 className="font-medium text-base text-foreground">{contact.label}</h3>

                  <p
                    onClick={() => handleCopy(contact.value)}
                    className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors"
                    role="button"
                    tabIndex={0}
                    aria-label={`Copy ${contact.label} to clipboard`}
                  >
                    {contact.value}
                  </p>

                  <p className="text-xs text-muted-foreground/60">{contact.description}</p>

                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block px-5 py-2 rounded-full font-inter text-xs font-medium tracking-wide uppercase transition-all duration-300
                      border border-primary/30 text-primary
                      hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-background hover:border-transparent hover:shadow-lg hover:shadow-primary/15"
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
