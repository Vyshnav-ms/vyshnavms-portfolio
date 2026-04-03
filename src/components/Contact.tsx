import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Mail, Github, Linkedin, Copy, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useState } from "react";

const contactLinks = [
  { Icon: Mail, label: "Email", value: "vyshnams1@gmail.com", href: "mailto:vyshnams1@gmail.com", color: "#06b6d4" },
  { Icon: Github, label: "GitHub", value: "Vyshnav-ms", href: "https://github.com/Vyshnav-ms", color: "#a78bfa" },
  { Icon: Linkedin, label: "LinkedIn", value: "vyshnav-m-s", href: "https://linkedin.com/in/vyshnav-m-s", color: "#06b6d4" },
  { Icon: SiWhatsapp, label: "WhatsApp", value: "+91 8547776976", href: "https://wa.me/918547776976", color: "#10b981" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("vyshnams1@gmail.com");
    toast.success("Email copied to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "#030712" }}
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
            className="card-holo bracket-corners overflow-hidden mb-5"
          >
            {/* Top shimmer line */}
            <div
              className="h-[2px] w-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.6), rgba(124,58,237,0.4), transparent)",
              }}
            />

            <div className="p-6 sm:p-8">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(6,182,212,0.3)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(124,58,237,0.3)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(16,185,129,0.3)" }} />
                </div>
                <span className="font-mono text-[10px] ml-2" style={{ color: "rgba(6,182,212,0.4)" }}>
                  CONTACT_TERMINAL.exe
                </span>
              </div>

              <h3 className="font-orbitron font-bold text-lg mb-2" style={{ color: "rgba(200,230,255,0.9)" }}>
                Ready to collaborate?
              </h3>
              <p className="font-inter text-sm mb-6 leading-relaxed" style={{ color: "rgba(200,230,255,0.45)" }}>
                Whether you have a project in mind or just want to say hi, my inbox is always open.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="mailto:vyshnams1@gmail.com"
                  className="btn-primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send an Email
                </motion.a>
                <motion.button
                  onClick={copyEmail}
                  className="btn-cyber flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied!" : "Copy Email"}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contact links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactLinks.map(({ Icon, label, value, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 p-4 rounded-lg no-underline transition-all duration-200"
                style={{
                  background: "rgba(7,14,31,0.8)",
                  border: "1px solid rgba(6,182,212,0.08)",
                }}
                aria-label={`${label}: ${value}`}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -3,
                  borderColor: `${color}40`,
                  boxShadow: `0 0 15px ${color}15, 0 8px 24px rgba(0,0,0,0.4)`,
                  background: `rgba(7,14,31,0.95)`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${color}0D`,
                    border: `1px solid ${color}25`,
                  }}
                  whileHover={{ rotate: -8, scale: 1.1, boxShadow: `0 0 10px ${color}30` }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </motion.div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: "rgba(200,230,255,0.3)" }}>
                    {label}
                  </p>
                  <p className="font-inter text-sm font-medium truncate mt-0.5" style={{ color: "rgba(200,230,255,0.8)" }}>
                    {value}
                  </p>
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
