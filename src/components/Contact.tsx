import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import SectionHeading from "./SectionHeading";

const contactLinks = [
  {
    Icon: Mail,
    label: "Email",
    value: "vyshnams1@gmail.com",
    href: "mailto:vyshnams1@gmail.com",
    action: "Send email",
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "Vyshnav-ms",
    href: "https://github.com/Vyshnav-ms",
    action: "View profile",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "vyshnav-m-s",
    href: "https://linkedin.com/in/vyshnav-m-s",
    action: "Connect",
  },
  {
    Icon: SiWhatsapp,
    label: "WhatsApp",
    value: "+91 8547776976",
    href: "https://wa.me/918547776976",
    action: "Message",
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const copyEmail = () => {
    navigator.clipboard.writeText("vyshnams1@gmail.com");
    toast.success("Email copied!");
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's work"
          highlight="together"
          subtitle="Open to full-time roles, freelance projects, and interesting collaborations."
        />

        <div ref={ref} className="max-w-2xl">
          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="card-minimal bg-white p-8 mb-8"
          >
            <h3 className="font-dm-sans font-semibold text-xl text-foreground mb-2">
              Ready to collaborate?
            </h3>
            <p className="font-inter text-sm text-muted-foreground mb-6 leading-relaxed">
              Whether you have a project in mind or just want to say hi, my inbox is always open.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:vyshnams1@gmail.com" className="btn-primary">
                Send an Email
              </a>
              <button onClick={copyEmail} className="btn-secondary">
                Copy Email
              </button>
            </div>
          </motion.div>

          {/* Links grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="grid grid-cols-2 gap-3"
          >
            {contactLinks.map(({ Icon, label, value, href, action }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="card-minimal group flex items-center gap-4 p-4 bg-white no-underline hover:border-indigo-200"
                aria-label={`${label}: ${value}`}
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-200">
                  <Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="font-inter text-xs text-muted-foreground">{label}</p>
                  <p className="font-inter text-sm font-medium text-foreground truncate">{value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
