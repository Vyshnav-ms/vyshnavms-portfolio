import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Mail, Github, Linkedin, Copy, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useState } from "react";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";
const PLATINUM = "rgba(228,221,211,0.88)";
const STEEL = "rgba(228,221,211,0.45)";

const contactLinks = [
  { Icon: Mail, label: "Email", value: "vyshnams1@gmail.com", href: "mailto:vyshnams1@gmail.com", color: GOLD },
  { Icon: Github, label: "GitHub", value: "Vyshnav-ms", href: "https://github.com/Vyshnav-ms", color: "rgba(228,221,211,0.7)" },
  { Icon: Linkedin, label: "LinkedIn", value: "vyshnav-m-s", href: "https://linkedin.com/in/vyshnav-m-s", color: GOLD },
  { Icon: SiWhatsapp, label: "WhatsApp", value: "+91 8547776976", href: "https://wa.me/918547776976", color: "#c9a84c" },
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
      style={{ background: "#141414" }}
    >
      <div className="container-wide mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's work"
          highlight="together"
          subtitle="Open to full-time roles, freelance projects, and interesting collaborations."
        />

        <div ref={ref} className="max-w-2xl">
          {/* Main CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="card-metal engraved-corners overflow-hidden mb-5"
          >
            {/* Top gold rule */}
            <div
              style={{
                height: "1px",
                background: `linear-gradient(90deg, ${GOLD}, rgba(201,168,76,0.3), transparent)`,
              }}
            />

            <div className="p-6 sm:p-8">
              {/* Card header — refined */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(201,168,76,0.35)" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(228,221,211,0.1)" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(228,221,211,0.05)" }} />
                </div>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.62rem",
                    marginLeft: "0.5rem",
                    color: GOLD_DIM,
                  }}
                >
                  contact.md
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: PLATINUM,
                  marginBottom: "0.5rem",
                }}
              >
                Ready to collaborate?
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: "1.65",
                  color: STEEL,
                  marginBottom: "1.5rem",
                }}
              >
                Whether you have a project in mind or just want to say hi, my inbox is always open.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="mailto:vyshnams1@gmail.com"
                  className="btn-gold"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send an Email
                </motion.a>
                <motion.button
                  onClick={copyEmail}
                  className="btn-steel flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
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
                className="group flex items-center gap-4 p-4 no-underline transition-all duration-200"
                style={{
                  background: "rgba(14,14,14,0.85)",
                  border: "1px solid rgba(201,168,76,0.08)",
                  borderRadius: "3px",
                }}
                aria-label={`${label}: ${value}`}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -2,
                  borderColor: "rgba(201,168,76,0.28)",
                  boxShadow: "0 0 16px rgba(201,168,76,0.07), 0 8px 24px rgba(0,0,0,0.4)",
                  background: "rgba(18,18,18,0.95)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.14)",
                  }}
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </motion.div>
                <div className="min-w-0">
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', Inter, sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(228,221,211,0.28)",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: PLATINUM,
                      marginTop: "0.15rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
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
