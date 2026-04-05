import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, SkipForward, X } from "lucide-react";
import YouTube from "react-youtube";

const GOLD = "#c9a84c";
const GOLD_DIM = "rgba(201,168,76,0.4)";

const songs = [
  { title: "Blinding Lights – The Weeknd", videoId: "fHI8X4OXluQ" },
  { title: "Shape of You – Ed Sheeran", videoId: "JGwWNGJdvx8" },
  { title: "Stay – Justin Bieber", videoId: "kTJczUoc26U" },
  { title: "Levitating – Dua Lipa", videoId: "TUVcZfQe-Kw" },
  { title: "Counting Stars – OneRepublic", videoId: "hT_nvWreIhg" },
  { title: "Believer – Imagine Dragons", videoId: "7wtfhZwyrcc" },
  { title: "Memories – Maroon 5", videoId: "SlPhMPnQ58k" },
];

export default function FloatingMusicButton() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const playerRef = useRef<any>(null);

  const toggle = () => {
    if (playing) {
      playerRef.current?.pauseVideo();
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  const next = () => {
    setTrackIdx((i) => (i + 1) % songs.length);
    setPlaying(true);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[9997] w-11 h-11 flex items-center justify-center rounded-full"
        style={{
          background: "rgba(15,15,15,0.92)",
          border: `1px solid ${playing ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.2)"}`,
          color: playing ? GOLD : GOLD_DIM,
          backdropFilter: "blur(12px)",
          boxShadow: playing
            ? "0 0 14px rgba(201,168,76,0.3), 0 0 28px rgba(201,168,76,0.1)"
            : "0 4px 20px rgba(0,0,0,0.5)",
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 18px rgba(201,168,76,0.35)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle music player"
      >
        {playing ? (
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
            <Music size={16} />
          </motion.div>
        ) : (
          <Music size={16} />
        )}
      </motion.button>

      {/* Player panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-[9997] w-64 overflow-hidden"
            style={{
              background: "rgba(14,14,14,0.96)",
              border: "1px solid rgba(201,168,76,0.16)",
              borderRadius: "4px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 24px rgba(201,168,76,0.07), 0 16px 40px rgba(0,0,0,0.65)",
            }}
          >
            {/* Top gold rule */}
            <div
              style={{
                height: "1px",
                background: `linear-gradient(90deg, ${GOLD}, rgba(201,168,76,0.3), transparent)`,
              }}
            />

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p
                  style={{
                    fontFamily: "'Barlow Condensed', Inter, sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: GOLD_DIM,
                  }}
                >
                  Now Playing
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="transition-colors"
                  style={{ color: "rgba(228,221,211,0.3)" }}
                  aria-label="Close player"
                >
                  <X size={14} />
                </button>
              </div>

              <p
                className="truncate mb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgba(228,221,211,0.85)",
                }}
              >
                {songs[trackIdx].title}
              </p>

              {/* Gold visualizer bars */}
              {playing && (
                <div className="flex items-center gap-0.5 mb-4 h-4">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-full"
                      style={{ background: GOLD }}
                      animate={{ height: ["3px", `${6 + Math.random() * 8}px`, "3px"] }}
                      transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.05 }}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={toggle}
                  className="btn-gold flex-1 justify-center gap-2"
                  style={{ fontSize: "0.65rem", padding: "0.5rem 0.75rem" }}
                >
                  {playing ? <Pause size={13} /> : <Play size={13} />}
                  {playing ? "Pause" : "Play"}
                </button>
                <button
                  onClick={next}
                  className="btn-steel"
                  style={{ padding: "0.5rem 0.6rem" }}
                  aria-label="Next track"
                >
                  <SkipForward size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden YouTube player */}
      {playing && (
        <div style={{ display: "none" }}>
          <YouTube
            videoId={songs[trackIdx].videoId}
            opts={{ height: "0", width: "0", playerVars: { autoplay: 1, controls: 0 } }}
            onReady={(e) => (playerRef.current = e.target)}
            onEnd={next}
          />
        </div>
      )}
    </>
  );
}
