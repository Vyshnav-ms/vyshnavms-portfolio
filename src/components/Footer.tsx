import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Vyshnav-ms", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/vyshnav-m-s", label: "LinkedIn" },
    { icon: Mail, href: "mailto:vyshnams1@gmail.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-white/5">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-poppins font-bold text-lg">
              <span className="text-foreground">V</span>
              <span className="gradient-text">MS</span>
            </span>
            <span className="text-white/10">·</span>
            <p className="font-inter text-xs text-muted-foreground tracking-wide">
              © 2026 Vyshnav M S · Built with React + Vite
            </p>
          </div>

          <div className="flex gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 hover:text-primary transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
