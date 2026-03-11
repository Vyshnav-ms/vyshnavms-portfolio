import React, { useState, useRef, useEffect } from "react";
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
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[9997] w-11 h-11 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-card text-muted-foreground hover:text-primary hover:border-indigo-200 transition-all duration-200"
        aria-label="Toggle music player"
      >
        <Music size={16} />
      </button>

      {/* Player panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-[9997] w-64 bg-white border border-gray-200 rounded-xl shadow-elevated p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-inter text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Now Playing
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground/50 hover:text-foreground transition-colors"
                aria-label="Close player"
              >
                <X size={14} />
              </button>
            </div>

            <p className="font-inter text-sm font-medium text-foreground truncate mb-4">
              {songs[trackIdx].title}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="flex-1 btn-primary justify-center py-2 gap-2"
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
                {playing ? "Pause" : "Play"}
              </button>
              <button
                onClick={next}
                className="btn-secondary p-2"
                aria-label="Next track"
              >
                <SkipForward size={14} />
              </button>
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
