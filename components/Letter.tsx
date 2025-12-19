
import React from 'react';

interface LetterProps {
  char: string;
  isActive: boolean;
  theme: 'warm' | 'cool' | 'minimal';
}

const Letter: React.FC<LetterProps> = ({ char, isActive, theme }) => {
  const activeColors = {
    warm: 'text-orange-100',
    cool: 'text-blue-50',
    minimal: 'text-white'
  };

  const inactiveColors = {
    warm: 'text-neutral-800',
    cool: 'text-slate-800',
    minimal: 'text-zinc-800'
  };

  // Define dynamic text shadows based on theme
  const getGlowStyle = () => {
    if (!isActive) return { textShadow: 'none' };
    
    const glows = {
      warm: '0 0 10px rgba(255,237,213,0.7), 0 0 20px rgba(255,237,213,0.3)',
      cool: '0 0 10px rgba(239,246,255,0.7), 0 0 20px rgba(239,246,255,0.3)',
      minimal: '0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.2)'
    };
    
    return { 
      textShadow: glows[theme],
      animation: 'breathe 4s ease-in-out infinite'
    };
  };

  return (
    <div 
      className={`
        flex items-center justify-center 
        w-full h-full 
        transition-all duration-1000 ease-in-out
        select-none
        text-[min(4vw,28px)] font-semibold tracking-widest
        ${isActive ? activeColors[theme] : inactiveColors[theme]}
      `}
      style={getGlowStyle()}
    >
      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.02); }
        }
      `}</style>
      {char}
    </div>
  );
};

export default Letter;
