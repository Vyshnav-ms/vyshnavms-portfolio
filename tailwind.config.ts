import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        grotesk: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "Menlo", "monospace"],
        "dm-sans": ['"Space Grotesk"', "system-ui", "sans-serif"], // alias for legacy usage
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyber palette
        cyber: {
          cyan: "#06b6d4",
          "cyan-dim": "#0891b2",
          violet: "#7c3aed",
          "violet-dim": "#6d28d9",
          emerald: "#10b981",
          dark: "#030712",
          "dark-2": "#050c1a",
          "dark-3": "#0a1628",
          "dark-4": "#0f1f38",
          "dark-card": "#070e1f",
          border: "#0e2040",
          "border-cyan": "rgba(6,182,212,0.3)",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.4)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.6)",
        "cyber-cyan": "0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1)",
        "cyber-cyan-sm": "0 0 10px rgba(6,182,212,0.4)",
        "cyber-violet": "0 0 20px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.1)",
        "inner-cyan": "inset 0 0 20px rgba(6,182,212,0.05)",
      },

      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-right": {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(6,182,212,0.3), 0 0 10px rgba(6,182,212,0.1)" },
          "50%": { boxShadow: "0 0 20px rgba(6,182,212,0.6), 0 0 40px rgba(6,182,212,0.2)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "matrix-fall": {
          "0%": { transform: "translateY(-100%)", opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        "typing": {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        "blink": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#06b6d4" },
        },
      },

      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fade-in 0.4s ease forwards",
        "slide-right": "slide-right 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "scanline": "scanline 3s linear infinite",
        "flicker": "flicker 4s infinite",
        "border-spin": "border-spin 3s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "typing": "typing 2s steps(20,end) forwards",
        "blink": "blink 1s step-end infinite",
      },

      transitionTimingFunction: {
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      backgroundImage: {
        "cyber-grid": "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
        "cyber-grid-sm": "linear-gradient(rgba(6,182,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.06) 1px, transparent 1px)",
        "dot-grid": "radial-gradient(circle, rgba(6,182,212,0.15) 1px, transparent 1px)",
        "glow-radial": "radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
