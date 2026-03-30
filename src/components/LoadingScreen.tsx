import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      // easeOutQuart for smooth deceleration
      const easeOutProgress = 100 - 100 * Math.pow(1 - currentProgress / 100, 4);
      
      setProgress(Math.floor(easeOutProgress));

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#090c10] overflow-hidden"
    >
      {/* Background Grain */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.65\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\"/></svg>")' }} 
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-8">
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.9 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="brand-logo-styled text-5xl md:text-7xl mb-20"
        >
          Libera
        </motion.h1>

        {/* Circular Progress Bar */}
        <div className="relative flex flex-col items-center justify-center mb-16">
          <div className="relative flex items-center justify-center w-24 h-24 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="1"
                fill="transparent"
                className="text-white/10"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={2 * Math.PI * 48 - (progress / 100) * (2 * Math.PI * 48)}
                className="text-white/80 transition-all duration-75 ease-out"
              />
            </svg>
            {/* Percentage Inside */}
            <div className="absolute flex items-center justify-center text-[11px] tracking-[0.2em] text-white/60 font-mono pl-1">
              {progress.toString().padStart(3, '0')}
            </div>
          </div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[9px] tracking-[0.4em] text-white/40 font-mono uppercase"
          >
            {progress < 100 ? 'Loading Archive...' : 'Ready'}
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-[11px] text-white/30 tracking-[0.3em] font-light text-center leading-loose"
        >
          孤独とは、<br />誰にも邪魔されない自由のこと。
        </motion.div>
      </div>
    </motion.div>
  );
}
