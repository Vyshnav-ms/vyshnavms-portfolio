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
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // 🔥 Detect scroll for glow + expansion
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎯 Active section detection
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

  // Smooth scroll
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
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center"
    >
      {/* 🌈 Dynamic Island Capsule (centered in flex) */}
      <motion.div
        animate={{
          width: scrolled ? 740 : 700, // expands equally from both sides
          height: 64,
          borderRadius: 40,
          background:
            "linear-gradient(135deg, rgba(10,10,10,0.9), rgba(0,0,0,0.7))",
          boxShadow: scrolled
            ? "0 0 35px rgba(255,0,0,0.4)"
            : "0 0 12px rgba(255,0,0,0.25)",
        }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
        className="flex items-center justify-between px-6 backdrop-blur-xl border border-white/10 text-white relative"
      >
        {/* 🪩 Logo */}
        <div className="font-poppins font-bold text-xl select-none tracking-wide">
          <span className="text-white">V</span>
          <span className="text-red-500">MS</span>
        </div>

        {/* 🌐 Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className={`relative font-inter text-[15px] tracking-wide transition-colors duration-300 group ${
                  isActive
                    ? "text-red-400 font-semibold"
                    : "text-gray-300 hover:text-red-300"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-[-4px] left-0 h-[2px] bg-red-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.a>
            );
          })}
        </div>

        {/* 📱 Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 hover:text-red-400 transition-all duration-300"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.div>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-20 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl py-6 flex flex-col items-center gap-6 w-[90vw] max-w-[400px] shadow-[0_0_25px_rgba(255,0,0,0.3)]"
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
                  transition={{ delay: 0.05 * index }}
                  className={`text-lg font-poppins transition-colors duration-300 ${
                    isActive
                      ? "text-red-400"
                      : "text-gray-300 hover:text-red-300"
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
