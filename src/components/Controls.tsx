interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

const speedOptions = [
  { label: "0.5×", value: 0.5 },
  { label: "1×", value: 1 },
  { label: "2×", value: 2 },
  { label: "5×", value: 5 },
  { label: "10×", value: 10 },
];

export default function Controls({
  isPlaying,
  speed,
  onTogglePlay,
  onSpeedChange,
}: ControlsProps) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Speed Controls */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
              Speed
            </span>
            <span className="text-white/80 text-xs font-mono">{speed}×</span>
          </div>
          <div className="flex gap-1.5">
            {speedOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSpeedChange(option.value)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  speed === option.value
                    ? "bg-blue-500/30 text-blue-300 border border-blue-400/40"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
