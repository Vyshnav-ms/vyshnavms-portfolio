import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Mail, Github, Linkedin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

const contactLinks = [
  { Icon: Mail, label: "Email", value: "vyshnams1@gmail.com", href: "mailto:vyshnams1@gmail.com" },
  { Icon: Github, label: "GitHub", value: "Vyshnav-ms", href: "https://github.com/Vyshnav-ms" },
  { Icon: Linkedin, label: "LinkedIn", value: "vyshnav-m-s", href: "https://linkedin.com/in/vyshnav-m-s" },
  { Icon: SiWhatsapp, label: "WhatsApp", value: "+91 8547776976", href: "https://wa.me/918547776976" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const copyEmail = () => {
    navigator.clipboard.writeText("vyshnams1@gmail.com");
    toast.success("Email copied!");
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "hsl(var(--background))" }}
    >
      <div className="container-wide mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's work"
          highlight="together"
          subtitle="Open to full-time roles, freelance projects, and interesting collaborations."
        />

        <div ref={ref} className="max-w-2xl">
          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[var(--radius)] border border-[hsl(var(--border))] overflow-hidden mb-6"
            style={{ background: "hsl(var(--card))" }}
            whileHover={{ y: -3, boxShadow: "0 12px 36px rgba(79,70,229,0.08)" }}
          >
            {/* animated shimmer line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="p-8">
              <h3 className="font-dm-sans font-semibold text-xl text-foreground mb-2">
                Ready to collaborate?
              </h3>
              <p className="font-inter text-sm text-muted-foreground mb-6 leading-relaxed">
                Whether you have a project in mind or just want to say hi, my inbox is always open.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="mailto:vyshnams1@gmail.com"
                  className="btn-primary"
                  whileHover={{ scale: 1.04, boxShadow: "0 6px 24px hsl(244 55% 58% / 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send an Email
                </motion.a>
                <motion.button
                  onClick={copyEmail}
                  className="btn-secondary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Copy Email
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-3">
            {contactLinks.map(({ Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 p-4 rounded-[var(--radius)] border border-[hsl(var(--border))] no-underline"
                style={{ background: "hsl(var(--card))" }}
                aria-label={`${label}: ${value}`}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, borderColor: "hsl(244 55% 68% / 0.4)", boxShadow: "0 8px 24px rgba(79,70,229,0.08)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-9 h-9 rounded-lg bg-[hsl(var(--primary-light))] flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className="w-4 h-4 text-primary" />
                </motion.div>
                <div className="min-w-0">
                  <p className="font-inter text-xs text-muted-foreground">{label}</p>
                  <p className="font-inter text-sm font-medium text-foreground truncate">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
