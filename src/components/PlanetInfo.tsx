import { Planet } from "../data/planets";

interface PlanetInfoProps {
  planet: Planet | null;
  onClose: () => void;
}

export default function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  if (!planet) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🪐</div>
        <h3 className="text-white/80 text-lg font-medium mb-2">Click a Planet</h3>
        <p className="text-white/50 text-sm">
          Click on any planet in the solar system to learn more about it!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full shadow-lg"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${planet.gradient[0]}, ${planet.gradient[1]})`,
              boxShadow: `0 0 15px ${planet.color}40`,
            }}
          />
          <h2 className="text-white text-2xl font-bold">{planet.name}</h2>
        </div>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white/90 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      <p className="text-white/70 text-sm mb-5 leading-relaxed">{planet.description}</p>

      <div className="space-y-3">
        <InfoRow
          icon="📏"
          label="Diameter"
          value={planet.size}
        />
        <InfoRow
          icon="☀️"
          label="Distance from Sun"
          value={planet.distanceFromSun}
        />
        <InfoRow
          icon="🔄"
          label="Orbital Period"
          value={planet.orbitalPeriod}
        />
      </div>

      <div className="mt-5 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <span>Orbit Speed:</span>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(5, (1 - planet.orbitalPeriodDays / 60190) * 100)}%`,
                background: `linear-gradient(90deg, ${planet.gradient[0]}, ${planet.gradient[1]})`,
              }}
            />
          </div>
          <span className="text-white/60">
            {planet.orbitalPeriodDays < 365
              ? "Fast"
              : planet.orbitalPeriodDays < 5000
              ? "Medium"
              : "Slow"}
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <div className="text-white/50 text-xs uppercase tracking-wider">{label}</div>
        <div className="text-white font-medium text-sm">{value}</div>
      </div>
    </div>
  );
}
