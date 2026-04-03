import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, SkipForward, X } from "lucide-react";
import YouTube from "react-youtube";

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
          background: "rgba(3,7,18,0.9)",
          border: "1px solid rgba(6,182,212,0.3)",
          color: "#06b6d4",
          backdropFilter: "blur(12px)",
          boxShadow: playing
            ? "0 0 16px rgba(6,182,212,0.4), 0 0 32px rgba(6,182,212,0.15)"
            : "0 4px 20px rgba(0,0,0,0.5)",
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(6,182,212,0.5)" }}
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
            className="fixed bottom-20 right-6 z-[9997] w-64 rounded-xl overflow-hidden"
            style={{
              background: "rgba(5,12,26,0.95)",
              border: "1px solid rgba(6,182,212,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 30px rgba(6,182,212,0.1), 0 16px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Top bar */}
            <div
              className="h-[2px] w-full"
              style={{ background: "linear-gradient(90deg, #06b6d4, #7c3aed)" }}
            />

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "rgba(6,182,212,0.6)" }}>
                  // Now Playing
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="transition-colors"
                  style={{ color: "rgba(200,230,255,0.3)" }}
                  aria-label="Close player"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="font-grotesk text-sm font-medium truncate mb-4" style={{ color: "rgba(200,230,255,0.85)" }}>
                {songs[trackIdx].title}
              </p>

              {/* Progress indicator */}
              {playing && (
                <div className="flex items-center gap-0.5 mb-4 h-4">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-full"
                      style={{ background: "#06b6d4" }}
                      animate={{ height: ["4px", `${8 + Math.random() * 8}px`, "4px"] }}
                      transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.05 }}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={toggle}
                  className="flex-1 btn-primary justify-center py-2 gap-2 text-[10px]"
                >
                  {playing ? <Pause size={13} /> : <Play size={13} />}
                  {playing ? "Pause" : "Play"}
                </button>
                <button
                  onClick={next}
                  className="btn-cyber p-2"
                  style={{ padding: "0.5rem" }}
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
