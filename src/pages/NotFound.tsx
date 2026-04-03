import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        background: "#030712",
        backgroundImage:
          "radial-gradient(circle, rgba(6,182,212,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-10 h-10">
        <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: "2px solid rgba(6,182,212,0.4)", borderLeft: "2px solid rgba(6,182,212,0.4)" }} />
      </div>
      <div className="absolute bottom-8 right-8 w-10 h-10">
        <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: "2px solid rgba(6,182,212,0.4)", borderRight: "2px solid rgba(6,182,212,0.4)" }} />
      </div>

      <motion.div
        className="text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "rgba(6,182,212,0.5)" }}>
          // ERROR_404
        </p>
        <h1
          className="font-orbitron font-black mb-4"
          style={{
            fontSize: "clamp(5rem, 20vw, 10rem)",
            color: "#06b6d4",
            textShadow: "0 0 40px rgba(6,182,212,0.4), 0 0 80px rgba(6,182,212,0.15)",
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <p className="font-grotesk text-lg mb-8" style={{ color: "rgba(200,230,255,0.5)" }}>
          Signal lost. Page not found.
        </p>
        <motion.a
          href="/"
          className="btn-primary inline-flex"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Return to Base
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
