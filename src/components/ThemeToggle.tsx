import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex items-center gap-1 px-1.5 py-1.5 rounded-full border transition-all duration-500 ${
        isDark
          ? "bg-slate-800 border-slate-700 hover:border-slate-600"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
      style={{ width: 68, height: 34 }}
    >
      {/* Track */}
      <motion.div
        className={`absolute inset-[3px] rounded-full ${
          isDark ? "bg-slate-700" : "bg-gray-100"
        }`}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Sliding knob */}
      <motion.div
        className={`absolute w-[26px] h-[26px] rounded-full flex items-center justify-center z-10 shadow-sm ${
          isDark ? "bg-slate-900" : "bg-white"
        }`}
        animate={{ x: isDark ? 34 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={13} className="text-indigo-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 30, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -30, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={13} className="text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background icons for context */}
      <Sun size={11} className={`relative z-0 ml-1.5 transition-opacity duration-300 ${isDark ? "opacity-30 text-amber-400" : "opacity-0"}`} />
      <Moon size={11} className={`relative z-0 ml-auto mr-1.5 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-30 text-slate-400"}`} />
    </button>
  );
}
