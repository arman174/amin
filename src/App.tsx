import { useState } from "react";
import SolarSystem from "./components/SolarSystem";
import PlanetInfo from "./components/PlanetInfo";
import Controls from "./components/Controls";
import { Planet, planets } from "./data/planets";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div className="w-screen h-screen bg-[#0a0a1a] overflow-hidden relative">
      {/* Solar System Canvas */}
      <div className="absolute inset-0">
        <SolarSystem
          isPlaying={isPlaying}
          speed={speed}
          selectedPlanet={selectedPlanet}
          onSelectPlanet={setSelectedPlanet}
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 pointer-events-none">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">☀️</span>
              Solar System Explorer
            </h1>
            <p className="text-white/40 text-xs sm:text-sm mt-1">
              Click on any planet to learn about it
            </p>
          </div>
        </div>
      </div>

      {/* Planet Quick Nav */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden lg:block">
        <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-3">
          <div className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 px-1">
            Planets
          </div>
          <div className="space-y-1">
            {planets.map((planet) => (
              <button
                key={planet.name}
                onClick={() => setSelectedPlanet(planet)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all duration-200 ${
                  selectedPlanet?.name === planet.name
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white/90"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${planet.gradient[0]}, ${planet.gradient[1]})`,
                  }}
                />
                <span className="text-xs font-medium">{planet.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Panel - Controls and Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
          {/* Controls */}
          <div className="flex-1 min-w-0">
            <Controls
              isPlaying={isPlaying}
              speed={speed}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              onSpeedChange={setSpeed}
            />
          </div>

          {/* Planet Info */}
          <div className="flex-1 min-w-0 max-w-md">
            <PlanetInfo
              planet={selectedPlanet}
              onClose={() => setSelectedPlanet(null)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Planet Selector */}
      <div className="absolute bottom-36 sm:bottom-40 left-0 right-0 px-4 lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {planets.map((planet) => (
            <button
              key={planet.name}
              onClick={() => setSelectedPlanet(planet)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedPlanet?.name === planet.name
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-gray-900/60 text-white/60 border border-white/10 hover:bg-white/10"
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${planet.gradient[0]}, ${planet.gradient[1]})`,
                }}
              />
              {planet.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
