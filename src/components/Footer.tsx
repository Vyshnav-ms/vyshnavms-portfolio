import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Vyshnav-ms", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/vyshnav-m-s", label: "LinkedIn" },
    { icon: Mail, href: "mailto:vyshnams1@gmail.com", label: "Email" },
  ];

  return (
    <footer className="border-t-2 border-primary/30 bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-sm text-muted-foreground">
           © 2025 Vyshnav M S · All rights reserved · Built with React + Vite
          </p>

          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
