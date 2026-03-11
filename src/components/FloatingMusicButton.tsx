import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import YouTube from "react-youtube";

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

  const getRandomTrack = () => Math.floor(Math.random() * songs.length);

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
    } else {
      const newTrack = getRandomTrack();
      setCurrentTrack(newTrack);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => { setCurrentTrack(getRandomTrack()); setIsPlaying(true); };
  const prevTrack = () => { setCurrentTrack(getRandomTrack()); setIsPlaying(true); };

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
      <motion.div
        className="fixed bottom-6 right-6 z-[9998] flex items-center"
        animate={{
          width: expanded ? 260 : 52,
          height: 52,
          borderRadius: 30,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{
          background: "linear-gradient(135deg, #0ea370, #0d9488)",
          boxShadow: isPlaying
            ? "0 0 20px rgba(14, 163, 112, 0.35)"
            : "0 0 8px rgba(14, 163, 112, 0.12)",
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <motion.button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          whileTap={{ scale: 0.9 }}
          className="ml-1.5 w-9 h-9 flex items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm border border-white/10"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </motion.button>

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
                <span className="text-[10px] text-white/50 uppercase tracking-wider">Playing</span>
                <span className="text-xs font-medium text-white truncate max-w-[120px]">
                  {songs[currentTrack].title}
                </span>
              </div>

              <div className="flex items-center ml-3 gap-1.5">
                <button onClick={(e) => { e.stopPropagation(); prevTrack(); }}
                  className="p-1 hover:text-accent transition" aria-label="Previous track">
                  <SkipBack size={16} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextTrack(); }}
                  className="p-1 hover:text-accent transition" aria-label="Next track">
                  <SkipForward size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isPlaying && currentTrack !== null && (
        <div style={{ display: "none" }}>
          <YouTube
            videoId={songs[currentTrack].videoId}
            opts={{ height: "0", width: "0", playerVars: { autoplay: 1, modestbranding: 1, controls: 0 } }}
            onReady={(e) => (playerRef.current = e.target)}
            onEnd={() => nextTrack()}
          />
        </div>
      )}
    </>
  );
}
