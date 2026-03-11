import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-gray-100 bg-white">
    <div className="container-wide mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-2">
        <span className="font-dm-sans font-bold text-base text-foreground">
          V<span className="text-primary">MS</span>
        </span>
        <span className="text-gray-200 mx-1">·</span>
        <p className="font-inter text-xs text-muted-foreground">
          © 2026 Vyshnav M S
        </p>
      </div>

      <div className="flex items-center gap-4">
        {[
          { Icon: Github, href: "https://github.com/Vyshnav-ms", label: "GitHub" },
          { Icon: Linkedin, href: "https://linkedin.com/in/vyshnav-m-s", label: "LinkedIn" },
          { Icon: Mail, href: "mailto:vyshnams1@gmail.com", label: "Email" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="text-muted-foreground/50 hover:text-primary transition-colors duration-200"
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
