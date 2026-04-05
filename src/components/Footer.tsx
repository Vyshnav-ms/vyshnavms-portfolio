import { Github, Linkedin, Mail } from "lucide-react";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";

const Footer = () => (
  <footer
    style={{
      background: "#0a0a0a",
      borderTop: "1px solid rgba(201,168,76,0.08)",
    }}
  >
    {/* Top gold hairline */}
    <div
      style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.28), rgba(201,168,76,0.1), transparent)",
      }}
    />

    <div className="container-wide mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 py-7">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: "1.4rem",
            letterSpacing: "0.04em",
            color: GOLD,
          }}
        >
          V<span style={{ color: "rgba(228,221,211,0.5)", fontStyle: "italic" }}>MS</span>
        </span>
        <div style={{ width: "1px", height: "16px", background: "rgba(201,168,76,0.15)" }} />
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.72rem",
            color: "rgba(228,221,211,0.3)",
          }}
        >
          © 2026 Vyshnav M S
        </p>
        <span
          style={{
            fontFamily: "'Barlow Condensed', Inter, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: GOLD_DIM,
            background: "rgba(201,168,76,0.07)",
            border: "1px solid rgba(201,168,76,0.14)",
            padding: "0.15rem 0.5rem",
            borderRadius: "2px",
          }}
          className="hidden sm:block"
        >
          Online
        </span>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3">
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
            className="w-8 h-8 rounded flex items-center justify-center transition-all duration-200"
            style={{
              color: "rgba(228,221,211,0.28)",
              background: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = GOLD;
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 10px rgba(201,168,76,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(228,221,211,0.28)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.08)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Icon size={14} />
          </a>
        ))}
      </div>

      {/* Right side */}
      <p
        className="text-center sm:text-right"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.65rem",
          color: "rgba(228,221,211,0.18)",
        }}
      >
      <span style={{ color: GOLD_DIM }}>  React · Vite · TypeScript · Three.js</span>
      </p>
    </div>
  </footer>
);

export default Footer;
