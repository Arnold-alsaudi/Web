import { cn } from "@/lib/utils";

const SIZE = 25;

/** Deterministic pseudo-random generator so server and client render the same grid. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function inFinder(x: number, y: number) {
  const zones = [
    [0, 0],
    [SIZE - 7, 0],
    [0, SIZE - 7],
  ];
  return zones.some(([zx, zy]) => x >= zx - 1 && x <= zx + 7 && y >= zy - 1 && y <= zy + 7);
}

/**
 * A QR-style pattern for illustration only. It is not a scannable code
 * and encodes nothing.
 */
export function QrPattern({ seed = 7, className }: { seed?: number; className?: string }) {
  const rand = mulberry32(seed);
  const cells: [number, number][] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const v = rand();
      if (!inFinder(x, y) && v > 0.52) cells.push([x, y]);
    }
  }
  const finders = [
    [0, 0],
    [SIZE - 7, 0],
    [0, SIZE - 7],
  ];
  return (
    <svg viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`} className={cn("block", className)} role="img" aria-label="Sample membership QR code (illustration)">
      <rect x="-1" y="-1" width={SIZE + 2} height={SIZE + 2} rx="1.5" fill="#F5F3EF" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0D0D10" />
      ))}
      {finders.map(([x, y]) => (
        <g key={`f${x}${y}`} fill="#0D0D10">
          <path d={`M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z`} fillRule="evenodd" />
          <rect x={x + 2} y={y + 2} width="3" height="3" />
        </g>
      ))}
    </svg>
  );
}
