import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const DynamicIslandNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href));
    const handleActive = () => {
      const scrollY = window.scrollY;
      sections.forEach((section, i) => {
        if (section) {
          const top = (section as HTMLElement).offsetTop - 120;
          const height = (section as HTMLElement).offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(navLinks[i].href.slice(1));
          }
        }
      });
    };
    window.addEventListener("scroll", handleActive);
    return () => window.removeEventListener("scroll", handleActive);
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 80,
        behavior: "smooth",
      });
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center"
      role="navigation"
      aria-label="Main navigation"
    >
      <motion.div
        animate={{
          width: scrolled ? 800 : 760,
          height: 60,
          borderRadius: 40,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="flex items-center justify-between px-6 text-white relative"
        style={{
          background: "rgba(8, 9, 13, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(14, 163, 112, 0.08), 0 0 0 1px rgba(14, 163, 112, 0.05)"
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo */}
        <div className="font-poppins font-bold text-xl select-none tracking-wide">
          <span className="text-foreground">V</span>
          <span className="gradient-text">MS</span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index }}
                className={`relative font-inter text-[13px] tracking-wide transition-all duration-300 group ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-[-6px] left-0 h-[1.5px] rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-full bg-gradient-to-r from-primary to-accent"
                      : "w-0 group-hover:w-full bg-white/20"
                  }`}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/60 hover:text-primary transition-all duration-300"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-[72px] py-6 flex flex-col items-center gap-5 w-[90vw] max-w-[380px] rounded-2xl"
            style={{
              background: "rgba(8, 9, 13, 0.92)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index }}
                  className={`text-base font-inter transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default DynamicIslandNavbar;
