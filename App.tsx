
import React, { useState, useEffect } from 'react';
import { Settings, Maximize2, Minimize2 } from 'lucide-react';
import { GRID_DATA } from './constants';
import { getActivePositions, isCellActive } from './utils';
import Letter from './components/Letter';
import CornerDot from './components/CornerDot';
import { Theme } from './types';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState<Theme>('minimal');
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 50); // High frequency for smooth progress border
    return () => clearInterval(timer);
  }, []);

  const activePositions = getActivePositions(time);
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();
  
  const precisionDots = minutes % 5;
  // Calculate progress for the seconds border (0 to 1)
  const progress = (seconds + milliseconds / 1000) / 60;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Subtle gray colors for the seconds tracker
  const trackerTrackColor = 'stroke-zinc-800/40';
  const trackerProgressColor = 'text-zinc-600';

  // SVG Path for a rounded rectangle perimeter
  // Size 100x100, Radius 10
  // Starts at top center (50, 0)
  const radius = 10;
  const size = 100;
  const rectPath = `
    M 50,0
    L ${size - radius},0
    A ${radius},${radius} 0 0 1 100,${radius}
    L 100,${size - radius}
    A ${radius},${radius} 0 0 1 ${size - radius},100
    L ${radius},100
    A ${radius},${radius} 0 0 1 0,${size - radius}
    L 0,${radius}
    A ${radius},${radius} 0 0 1 ${radius},0
    Z
  `;

  // Perimeter = 4 * side length + 2 * PI * radius
  const perimeter = 382.83;

  return (
    <div className={`
      relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden
      transition-colors duration-1000 bg-black
    `}>
      {/* Background Ambience */}
      <div className={`
        absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-1000
        ${theme === 'warm' ? 'bg-orange-900' : theme === 'cool' ? 'bg-blue-900' : 'bg-transparent'}
      `} />

      {/* Main Clock UI Container */}
      <div className="relative group p-6 w-full max-w-[min(90vw,600px)] aspect-square">
        {/* Real-time Seconds Border Progress - subtle gray */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100">
          {/* Background Path (Track) */}
          <path
            d={rectPath}
            fill="none"
            className={`${trackerTrackColor} transition-colors duration-1000`}
            strokeWidth="0.5"
          />
          {/* Progress Path - Subtle Gray */}
          <path
            d={rectPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter * (1 - progress)}
            className={`transition-all duration-100 ease-linear ${trackerProgressColor}`}
            style={{ 
              strokeLinecap: 'round'
            }}
          />
        </svg>

        <div className="relative w-full h-full bg-[#0a0a0a] rounded-[2.5rem] p-8 border border-neutral-900/50 flex flex-col items-center justify-center shadow-2xl">
          
          {/* Precision Corner Dots - These ensure the clock updates visually every minute */}
          <CornerDot isActive={precisionDots >= 1} position="tl" theme={theme} />
          <CornerDot isActive={precisionDots >= 2} position="tr" theme={theme} />
          <CornerDot isActive={precisionDots >= 3} position="br" theme={theme} />
          <CornerDot isActive={precisionDots >= 4} position="bl" theme={theme} />

          {/* Word Grid */}
          <div className="w-full h-full flex flex-col justify-between">
            {GRID_DATA.map((rowText, rowIndex) => (
              <div key={rowIndex} className="flex flex-row justify-between h-[8%]">
                {rowText.split('').map((char, colIndex) => (
                  <Letter 
                    key={`${rowIndex}-${colIndex}`}
                    char={char}
                    isActive={isCellActive(rowIndex, colIndex, activePositions)}
                    theme={theme}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-8 flex gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 opacity-20 hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Settings"
        >
          <Settings size={20} className="text-white" />
        </button>
        <button 
          onClick={toggleFullscreen}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={20} className="text-white" /> : <Maximize2 size={20} className="text-white" />}
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowSettings(false)}>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-semibold mb-6">Clock Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-zinc-400 text-sm mb-3 block">Color Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['minimal', 'warm', 'cool'] as Theme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`
                        px-4 py-2 rounded-xl border text-sm capitalize transition-all
                        ${theme === t 
                          ? 'bg-white text-black border-white' 
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500'}
                      `}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs italic leading-relaxed">
                  The frame border tracks real-time seconds. Corner dots indicate the minutes (1-4) between the 5-minute word intervals.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowSettings(false)}
              className="mt-8 w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-zinc-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer / Digital Reference */}
      <div className="fixed top-8 right-8 text-white/10 text-[10px] uppercase tracking-widest flex items-center gap-2">
        <span>Sync</span>
        <span className="font-mono text-white/30">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default App;
