
import React from 'react';

interface CornerDotProps {
  isActive: boolean;
  position: 'tl' | 'tr' | 'br' | 'bl';
  theme: 'warm' | 'cool' | 'minimal';
}

const CornerDot: React.FC<CornerDotProps> = ({ isActive, position, theme }) => {
  const activeColors = {
    warm: 'bg-orange-200 shadow-[0_0_10px_rgba(254,215,170,0.9)]',
    cool: 'bg-blue-200 shadow-[0_0_10px_rgba(191,219,254,0.9)]',
    minimal: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
  };

  const inactiveColors = {
    warm: 'bg-neutral-900',
    cool: 'bg-slate-900',
    minimal: 'bg-zinc-900'
  };

  const positionClasses = {
    tl: 'top-4 left-4',
    tr: 'top-4 right-4',
    br: 'bottom-4 right-4',
    bl: 'bottom-4 left-4'
  };

  return (
    <div className={`
      absolute w-2 h-2 rounded-full transition-all duration-500
      ${positionClasses[position]}
      ${isActive ? activeColors[theme] : inactiveColors[theme]}
    `} />
  );
};

export default CornerDot;
