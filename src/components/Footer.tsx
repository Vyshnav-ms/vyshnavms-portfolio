import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer
    style={{
      background: "#030712",
      borderTop: "1px solid rgba(6,182,212,0.08)",
    }}
  >
    {/* Top divider glow */}
    <div
      className="h-[1px] w-full"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), rgba(124,58,237,0.15), transparent)",
      }}
    />

    <div className="container-wide mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 py-7">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span
          className="font-orbitron font-black text-lg tracking-wider"
          style={{ color: "#06b6d4", textShadow: "0 0 12px rgba(6,182,212,0.4)" }}
        >
          V<span style={{ color: "#a78bfa" }}>MS</span>
        </span>
        <div className="w-px h-4" style={{ background: "rgba(6,182,212,0.15)" }} />
        <p className="font-mono text-xs" style={{ color: "rgba(200,230,255,0.3)" }}>
          © 2026 Vyshnav M S
        </p>
        <span className="hidden sm:block font-mono text-[10px] px-2 py-0.5 rounded"
              style={{
                color: "#10b981",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.15)",
              }}>
          ONLINE
        </span>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3">
        {[
          { Icon: Github, href: "https://github.com/Vyshnav-ms", label: "GitHub", color: "#a78bfa" },
          { Icon: Linkedin, href: "https://linkedin.com/in/vyshnav-m-s", label: "LinkedIn", color: "#06b6d4" },
          { Icon: Mail, href: "mailto:vyshnams1@gmail.com", label: "Email", color: "#10b981" },
        ].map(({ Icon, href, label, color }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="w-8 h-8 rounded flex items-center justify-center transition-all duration-200"
            style={{
              color: "rgba(200,230,255,0.3)",
              background: "rgba(6,182,212,0.04)",
              border: "1px solid rgba(6,182,212,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = color;
              (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${color}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(200,230,255,0.3)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.08)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Icon size={14} />
          </a>
        ))}
      </div>

      {/* Right side signal */}
      <p className="font-mono text-[10px] text-center sm:text-right" style={{ color: "rgba(200,230,255,0.2)" }}>
        Built with React · Vite · TypeScript
      </p>
    </div>
  </footer>
);

export default Footer;
