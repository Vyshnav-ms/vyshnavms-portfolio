import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleActive = () => {
      const scrollY = window.scrollY;
      const allLinks = [{ href: "#home" }, ...navLinks];
      allLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const top = (section as HTMLElement).offsetTop - 120;
          const height = (section as HTMLElement).offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(link.href.slice(1));
          }
        }
      });
    };
    window.addEventListener("scroll", handleActive);
    return () => window.removeEventListener("scroll", handleActive);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({ top: (target as HTMLElement).offsetTop - 72, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(3,7,18,0.92)"
          : "rgba(3,7,18,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(6,182,212,0.15)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
      role="banner"
    >
      <nav
        className="container-wide mx-auto flex items-center justify-between h-16"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="font-orbitron font-black text-xl tracking-wider transition-all duration-300"
          style={{ color: "#06b6d4", textShadow: "0 0 15px rgba(6,182,212,0.5)" }}
          aria-label="Vyshnav M S — home"
        >
          V<span style={{ color: "#a78bfa" }}>MS</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="relative px-3 py-1.5 font-orbitron text-[10px] font-600 uppercase tracking-[0.12em] transition-all duration-200"
                style={{
                  color: isActive ? "#06b6d4" : "rgba(200,230,255,0.55)",
                  textShadow: isActive ? "0 0 10px rgba(6,182,212,0.5)" : "none",
                }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #06b6d4, #7c3aed)",
                      boxShadow: "0 0 6px rgba(6,182,212,0.7)",
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right side: CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:vyshnams1@gmail.com"
            className="btn-primary text-[10px] py-2 px-5"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md transition-colors"
            style={{ color: "rgba(6,182,212,0.8)" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(3,7,18,0.98)",
              borderBottom: "1px solid rgba(6,182,212,0.15)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="px-3 py-3 rounded-md font-orbitron text-[10px] uppercase tracking-[0.12em] transition-all duration-200"
                    style={{
                      color: isActive ? "#06b6d4" : "rgba(200,230,255,0.5)",
                      background: isActive ? "rgba(6,182,212,0.06)" : "transparent",
                      borderLeft: isActive ? "2px solid #06b6d4" : "2px solid transparent",
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="mailto:vyshnams1@gmail.com"
                className="btn-primary mt-3 justify-center text-[10px] py-3"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
