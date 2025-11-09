import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import YouTube from "react-youtube";

// 🎵 Famous English songs list
const songs = [
  { title: "Blinding Lights – The Weeknd", videoId: "fHI8X4OXluQ" },
  { title: "Shape of You – Ed Sheeran", videoId: "JGwWNGJdvx8" },
  { title: "Stay – Justin Bieber & The Kid LAROI", videoId: "kTJczUoc26U" },
  { title: "Someone You Loved – Lewis Capaldi", videoId: "zABLecsR5UE" },
  { title: "Levitating – Dua Lipa ft. DaBaby", videoId: "TUVcZfQe-Kw" },
  { title: "Counting Stars – OneRepublic", videoId: "hT_nvWreIhg" },
  { title: "Believer – Imagine Dragons", videoId: "7wtfhZwyrcc" },
  { title: "Perfect – Ed Sheeran", videoId: "2Vv-BfVoq4g" },
  { title: "Let Me Love You – DJ Snake ft. Justin Bieber", videoId: "euCqAq6BRa4" },
  { title: "Memories – Maroon 5", videoId: "SlPhMPnQ58k" },
];

export default function FloatingYouTubeMusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const playerRef = useRef<any>(null);
  const collapseTimer = useRef<NodeJS.Timeout | null>(null);

  // 🎲 Pick a random track index
  const getRandomTrack = () => Math.floor(Math.random() * songs.length);

  // ▶️ Handle play toggle
  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
    } else {
      // first play or random pick
      const newTrack = getRandomTrack();
      setCurrentTrack(newTrack);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrack(getRandomTrack());
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack(getRandomTrack());
    setIsPlaying(true);
  };

  // 🕓 Auto-collapse after hover
  const resetCollapseTimer = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setExpanded(false), 4000);
  };

  useEffect(() => {
    if (expanded) resetCollapseTimer();
    return () => collapseTimer.current && clearTimeout(collapseTimer.current);
  }, [expanded]);

  return (
    <>
      {/* Floating Music Player */}
      <motion.div
        className="fixed bottom-6 right-6 z-[9998] flex items-center"
        animate={{
          width: expanded ? 260 : 56,
          height: 56,
          borderRadius: 50,
          background: "linear-gradient(135deg, #ff1b1b, #7a0000)",
          boxShadow: isPlaying
            ? "0 0 25px 5px rgba(255, 0, 0, 0.6)"
            : "0 0 10px 2px rgba(255, 0, 0, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Play / Pause Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          whileTap={{ scale: 0.9 }}
          className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm border border-red-400/40"
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </motion.button>

        {/* Expanded Info */}
        <AnimatePresence>
          {expanded && currentTrack !== null && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden flex items-center justify-between ml-2 pr-3 text-white"
            >
              <div className="flex flex-col leading-tight select-none">
                <span className="text-xs text-gray-300">Now Playing</span>
                <span className="text-sm font-medium text-white truncate max-w-[130px]">
                  {songs[currentTrack].title}
                </span>
              </div>

              <div className="flex items-center ml-3 gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevTrack();
                  }}
                  className="p-1 hover:text-red-300 transition"
                >
                  <SkipBack size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextTrack();
                  }}
                  className="p-1 hover:text-red-300 transition"
                >
                  <SkipForward size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hidden YouTube Player (loads only when playing) */}
      {isPlaying && currentTrack !== null && (
        <div style={{ display: "none" }}>
          <YouTube
            videoId={songs[currentTrack].videoId}
            opts={{
              height: "0",
              width: "0",
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
                controls: 0,
              },
            }}
            onReady={(e) => (playerRef.current = e.target)}
            onEnd={() => nextTrack()}
          />
        </div>
      )}
    </>
  );
}
