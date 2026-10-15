import { useRef, useEffect, useCallback } from "react";
import { planets, Planet } from "../data/planets";

interface SolarSystemProps {
  isPlaying: boolean;
  speed: number;
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet | null) => void;
}

export default function SolarSystem({
  isPlaying,
  speed,
  selectedPlanet,
  onSelectPlanet,
}: SolarSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const planetPositionsRef = useRef<{ x: number; y: number; planet: Planet; radius: number }[]>([]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) / 960;

      // Clear canvas
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      drawStars(ctx, width, height);

      // Draw orbit paths
      planets.forEach((planet) => {
        const orbitRadius = planet.orbitRadius * scale;
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle =
          selectedPlanet?.name === planet.name
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = selectedPlanet?.name === planet.name ? 1.5 : 0.5;
        ctx.stroke();
      });

      // Draw Sun
      const sunRadius = 28 * scale;
      const sunGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        sunRadius * 1.5
      );
      sunGradient.addColorStop(0, "#fff7e0");
      sunGradient.addColorStop(0.3, "#ffcc00");
      sunGradient.addColorStop(0.7, "#ff8800");
      sunGradient.addColorStop(1, "rgba(255, 100, 0, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = sunGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      const sunCoreGradient = ctx.createRadialGradient(
        centerX - sunRadius * 0.2,
        centerY - sunRadius * 0.2,
        0,
        centerX,
        centerY,
        sunRadius
      );
      sunCoreGradient.addColorStop(0, "#ffffff");
      sunCoreGradient.addColorStop(0.4, "#ffee55");
      sunCoreGradient.addColorStop(1, "#ff9900");
      ctx.fillStyle = sunCoreGradient;
      ctx.fill();

      // Sun glow
      ctx.shadowColor = "#ff8800";
      ctx.shadowBlur = 30 * scale;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 200, 0, 0.3)";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw planets
      const positions: { x: number; y: number; planet: Planet; radius: number }[] = [];

      planets.forEach((planet) => {
        const orbitRadius = planet.orbitRadius * scale;
        // Angular speed based on orbital period (faster = shorter period)
        const angularSpeed = (2 * Math.PI) / (planet.orbitalPeriodDays * 0.5);
        const angle = timeRef.current * angularSpeed;

        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;
        const planetRadius = Math.max(planet.radius * scale, 3);

        positions.push({ x, y, planet, radius: planetRadius });

        // Planet glow
        if (selectedPlanet?.name === planet.name) {
          ctx.shadowColor = planet.color;
          ctx.shadowBlur = 15 * scale;
        }

        // Draw planet
        const planetGradient = ctx.createRadialGradient(
          x - planetRadius * 0.3,
          y - planetRadius * 0.3,
          0,
          x,
          y,
          planetRadius
        );
        planetGradient.addColorStop(0, planet.gradient[0]);
        planetGradient.addColorStop(1, planet.gradient[1]);

        ctx.beginPath();
        ctx.arc(x, y, planetRadius, 0, Math.PI * 2);
        ctx.fillStyle = planetGradient;
        ctx.fill();

        // Saturn rings
        if (planet.name === "Saturn") {
          ctx.beginPath();
          ctx.ellipse(x, y, planetRadius * 2, planetRadius * 0.5, 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(232, 208, 136, 0.6)";
          ctx.lineWidth = 2 * scale;
          ctx.stroke();
        }

        // Selection ring
        if (selectedPlanet?.name === planet.name) {
          ctx.beginPath();
          ctx.arc(x, y, planetRadius + 4 * scale, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.shadowBlur = 0;

        // Planet label
        ctx.fillStyle =
          selectedPlanet?.name === planet.name
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.6)";
        ctx.font = `${Math.max(10 * scale, 9)}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(planet.name, x, y + planetRadius + 14 * scale);
      });

      planetPositionsRef.current = positions;
    },
    [selectedPlanet]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (isPlaying) {
        timeRef.current += delta * 0.001 * speed;
      }

      const rect = canvas.getBoundingClientRect();
      draw(ctx, rect.width, rect.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, speed, draw]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let clickedPlanet: Planet | null = null;

    for (const pos of planetPositionsRef.current) {
      const dx = x - pos.x;
      const dy = y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= pos.radius + 8) {
        clickedPlanet = pos.planet;
        break;
      }
    }

    onSelectPlanet(clickedPlanet);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let hovering = false;
    for (const pos of planetPositionsRef.current) {
      const dx = x - pos.x;
      const dy = y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= pos.radius + 8) {
        hovering = true;
        break;
      }
    }

    canvas.style.cursor = hovering ? "pointer" : "default";
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    />
  );
}

// Simple star field (static, drawn once per frame for simplicity)
const starCache: { x: number; y: number; size: number; brightness: number }[] = [];
function drawStars(ctx: CanvasRenderingContext2D, width: number, height: number) {
  if (starCache.length === 0) {
    for (let i = 0; i < 200; i++) {
      starCache.push({
        x: Math.random() * 2000,
        y: Math.random() * 2000,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.3,
      });
    }
  }

  starCache.forEach((star) => {
    const x = (star.x / 2000) * width;
    const y = (star.y / 2000) * height;
    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
    ctx.fill();
  });
}
