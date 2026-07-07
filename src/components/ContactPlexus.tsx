import { useEffect, useRef, useState } from "react";

/**
 * Animated plexus network anchored to the bottom-right corner of the section.
 * - Root node at (1000, 800) — bottom-right of the viewBox.
 * - Branches extend upward and to the left, tree/lightning-bolt fractal style.
 * - Draws sequentially from root to tips over ~3s.
 * - Fully transparent background.
 */

// Node coordinates in a 1000x800 viewBox. Node 0 is the root (bottom-right).
const NODES: Array<[number, number]> = [
  [980, 780], // 0 root
  [900, 720], // 1
  [860, 650], // 2
  [930, 620], // 3
  [820, 590], // 4
  [760, 540], // 5
  [880, 520], // 6
  [700, 500], // 7
  [820, 460], // 8
  [640, 440], // 9
  [780, 400], // 10
  [720, 360], // 11
  [580, 380], // 12
  [520, 330], // 13
  [660, 300], // 14
  [750, 280], // 15
  [600, 240], // 16
  [460, 280], // 17
  [400, 220], // 18
  [540, 180], // 19
  [680, 200], // 20
  [820, 220], // 21
  [340, 260], // 22
  [280, 200], // 23
  [480, 130], // 24
  [620, 110], // 25
  [760, 150], // 26
  [880, 180], // 27
];

// Edges as pairs of node indices, ordered so each edge's "from" node has
// already been reached by an earlier edge — this gives a clean sequential
// root-to-tips reveal.
const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 6],
  [2, 5],
  [4, 5],
  [5, 7],
  [6, 8],
  [4, 8],
  [7, 9],
  [8, 10],
  [8, 11],
  [10, 11],
  [9, 12],
  [11, 14],
  [12, 13],
  [10, 15],
  [14, 15],
  [13, 16],
  [14, 16],
  [15, 21],
  [13, 17],
  [16, 19],
  [17, 18],
  [17, 22],
  [16, 20],
  [20, 26],
  [21, 27],
  [22, 23],
  [19, 24],
  [19, 25],
  [24, 25],
  [25, 26],
  [26, 27],
  [18, 24],
];

const TOTAL_DURATION = 3000; // ms
const NODE_FADE = 220; // ms

function segLen(a: [number, number], b: [number, number]) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// Precompute per-edge delay/duration proportional to length so the "traveling
// electricity" speed feels constant across segments.
const totalLen = EDGES.reduce((s, [a, b]) => s + segLen(NODES[a], NODES[b]), 0);
let acc = 0;
const EDGE_TIMING = EDGES.map(([a, b]) => {
  const l = segLen(NODES[a], NODES[b]);
  const delay = (acc / totalLen) * TOTAL_DURATION;
  const duration = (l / totalLen) * TOTAL_DURATION;
  acc += l;
  return { delay, duration, length: l };
});

// Earliest time each node becomes "reached" (root at t=0, other nodes when
// the first incoming edge finishes drawing).
const NODE_REVEAL: number[] = NODES.map(() => Infinity);
NODE_REVEAL[0] = 0;
EDGES.forEach(([a, b], i) => {
  const t = EDGE_TIMING[i].delay + EDGE_TIMING[i].duration;
  if (t < NODE_REVEAL[b]) NODE_REVEAL[b] = t;
  if (t < NODE_REVEAL[a]) NODE_REVEAL[a] = t;
});

export function ContactPlexus() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPlay(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMaxYMax meet"
      style={{ zIndex: 0 }}
    >
      <g
        style={{
          // Mobile: scale down to ~50% around the bottom-right anchor.
          transformOrigin: "1000px 800px",
        }}
        className="origin-bottom-right [transform:scale(0.5)] md:[transform:scale(1)]"
      >
        {EDGES.map(([a, b], i) => {
          const { delay, duration, length } = EDGE_TIMING[i];
          const [x1, y1] = NODES[a];
          const [x2, y2] = NODES[b];
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#00AAC3"
              strokeOpacity={0.22}
              strokeWidth={1}
              strokeLinecap="round"
              style={{
                strokeDasharray: length,
                strokeDashoffset: play ? 0 : length,
                transition: play
                  ? `stroke-dashoffset ${duration}ms linear ${delay}ms`
                  : "none",
              }}
            />
          );
        })}
        {NODES.map(([cx, cy], i) => {
          const reveal = NODE_REVEAL[i];
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={1.8}
              fill="#00D6F6"
              style={{
                opacity: play ? 0.55 : 0,
                transition: play
                  ? `opacity ${NODE_FADE}ms ease-out ${reveal}ms`
                  : "none",
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}
