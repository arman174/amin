export interface Planet {
  name: string;
  radius: number; // visual radius in pixels
  orbitRadius: number; // visual orbit radius in pixels
  color: string;
  size: string; // real diameter
  distanceFromSun: string;
  orbitalPeriod: string;
  orbitalPeriodDays: number;
  description: string;
  emoji: string;
  gradient: [string, string];
}

export const planets: Planet[] = [
  {
    name: "Mercury",
    radius: 4,
    orbitRadius: 60,
    color: "#b5b5b5",
    size: "4,879 km",
    distanceFromSun: "57.9 million km",
    orbitalPeriod: "88 days",
    orbitalPeriodDays: 88,
    description: "The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.",
    emoji: "☿",
    gradient: ["#b5b5b5", "#8a8a8a"],
  },
  {
    name: "Venus",
    radius: 7,
    orbitRadius: 95,
    color: "#e8cda0",
    size: "12,104 km",
    distanceFromSun: "108.2 million km",
    orbitalPeriod: "225 days",
    orbitalPeriodDays: 225,
    description: "The hottest planet with a thick toxic atmosphere. It rotates backwards compared to most planets.",
    emoji: "♀",
    gradient: ["#e8cda0", "#c4944a"],
  },
  {
    name: "Earth",
    radius: 8,
    orbitRadius: 135,
    color: "#4da6ff",
    size: "12,756 km",
    distanceFromSun: "149.6 million km",
    orbitalPeriod: "365.25 days",
    orbitalPeriodDays: 365,
    description: "Our home planet! The only known planet with liquid water on its surface and life.",
    emoji: "🌍",
    gradient: ["#4da6ff", "#2d7abf"],
  },
  {
    name: "Mars",
    radius: 6,
    orbitRadius: 175,
    color: "#e07040",
    size: "6,792 km",
    distanceFromSun: "227.9 million km",
    orbitalPeriod: "687 days",
    orbitalPeriodDays: 687,
    description: "The Red Planet, named for its rusty color. It has the tallest volcano in the solar system — Olympus Mons.",
    emoji: "♂",
    gradient: ["#e07040", "#a04020"],
  },
  {
    name: "Jupiter",
    radius: 18,
    orbitRadius: 240,
    color: "#d4a574",
    size: "142,984 km",
    distanceFromSun: "778.6 million km",
    orbitalPeriod: "11.86 years",
    orbitalPeriodDays: 4333,
    description: "The largest planet with a Great Red Spot storm larger than Earth. It has at least 95 known moons.",
    emoji: "♃",
    gradient: ["#d4a574", "#a07040"],
  },
  {
    name: "Saturn",
    radius: 15,
    orbitRadius: 310,
    color: "#e8d088",
    size: "120,536 km",
    distanceFromSun: "1.43 billion km",
    orbitalPeriod: "29.46 years",
    orbitalPeriodDays: 10759,
    description: "Famous for its stunning ring system made of ice and rock. It's the least dense planet — it could float on water!",
    emoji: "♄",
    gradient: ["#e8d088", "#b89848"],
  },
  {
    name: "Uranus",
    radius: 11,
    orbitRadius: 375,
    color: "#7de0e8",
    size: "51,118 km",
    distanceFromSun: "2.87 billion km",
    orbitalPeriod: "84.01 years",
    orbitalPeriodDays: 30687,
    description: "An ice giant that rotates on its side. It has a blue-green color from methane in its atmosphere.",
    emoji: "♅",
    gradient: ["#7de0e8", "#4ab0b8"],
  },
  {
    name: "Neptune",
    radius: 10,
    orbitRadius: 430,
    color: "#4070e0",
    size: "49,528 km",
    distanceFromSun: "4.50 billion km",
    orbitalPeriod: "164.8 years",
    orbitalPeriodDays: 60190,
    description: "The windiest planet with speeds up to 2,100 km/h. It's the farthest planet from the Sun.",
    emoji: "♆",
    gradient: ["#4070e0", "#2050a0"],
  },
];
