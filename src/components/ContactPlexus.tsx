import { useEffect, useRef, useState, useMemo } from "react";

// Deterministic PRNG so the tree shape is stable across renders.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { id: number; x: number; y: number; depth: number; parent: number | null };
type Edge = { a: number; b: number; length: number };

const VB_W = 460;
const VB_H = 560;

function buildTree() {
  const rnd = mulberry32(20260707);
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const root: Node = { id: 0, x: VB_W - 4, y: VB_H - 4, depth: 0, parent: null };
  nodes.push(root);

  // Base direction: up-left (screen coords, y grows down).
  // Angle in radians measured standard (0 = +x). Up-left ≈ 3π/4 ≈ 2.356.
  const grow = (parentId: number, parentAngle: number, depth: number, length: number) => {
    if (depth > 5) return;
    const childrenCount = depth === 1 ? 3 : 2 + (rnd() > 0.55 ? 1 : 0);
    const spread = depth === 1 ? 0.9 : 0.7;
    for (let i = 0; i < childrenCount; i++) {
      const t = childrenCount === 1 ? 0 : i / (childrenCount - 1) - 0.5;
      const angle = parentAngle + t * spread + (rnd() - 0.5) * 0.35;
      const len = length * (0.72 + rnd() * 0.25);
      const parent = nodes[parentId];
      let nx = parent.x + Math.cos(angle) * len;
      let ny = parent.y + Math.sin(angle) * len;
      // Keep within viewBox (with slight margin).
      nx = Math.max(6, Math.min(VB_W - 4, nx));
      ny = Math.max(6, Math.min(VB_H - 4, ny));
      const node: Node = { id: nodes.length, x: nx, y: ny, depth, parent: parentId };
      nodes.push(node);
      edges.push({ a: parentId, b: node.id, length: Math.hypot(nx - parent.x, ny - parent.y) });
      grow(node.id, angle, depth + 1, len * 0.78);
    }
  };

  // Level 1: 3 primary branches from root, base direction up-left.
  const baseAngle = Math.PI + Math.PI / 4 + 0.15; // ~ 3.4 rad = up-left leaning up
  grow(0, -Math.PI * 0.75, 1, 120); // -3π/4 points up-left in screen coords

  // Cross-connections between nearby nodes at similar depth, not sharing parent.
  for (let i = 1; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      if (a.parent === b.id || b.parent === a.id) continue;
      if (Math.abs(a.depth - b.depth) > 1) continue;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 55 && rnd() < 0.35) {
        edges.push({ a: i, b: j, length: d });
      }
    }
  }

  // Suppress unused-var warning for baseAngle (kept for reference).
  void baseAngle;

  return { nodes, edges };
}

export function ContactPlexus() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [started, setStarted] = useState(false);
  const { nodes, edges } = useMemo(buildTree, []);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Timing: total 5.5s across all edges, sequenced by cumulative length so it
  // feels like current traveling through the network.
  const totalDuration = 5500; // ms
  const totalLength = edges.reduce((s, e) => s + e.length, 0);
  let cum = 0;
  const edgeTiming = edges.map((e) => {
    const startFrac = cum / totalLength;
    cum += e.length;
    const endFrac = cum / totalLength;
    return {
      delay: startFrac * totalDuration,
      duration: (endFrac - startFrac) * totalDuration,
    };
  });

  // Node timing: appears as soon as any incident edge finishes reaching it.
  // For simplicity, use its parent edge's end time; root at t=0.
  const nodeDelay = new Array<number>(nodes.length).fill(0);
  edges.forEach((e, i) => {
    // Only tree edges (parent chain) determine node reveal — first tree edge to a node.
    const child = nodes[e.b];
    if (child.parent === e.a) {
      nodeDelay[e.b] = edgeTiming[i].delay + edgeTiming[i].duration;
    }
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0 z-0 origin-bottom-right"
      style={{
        width: "min(560px, 62%)",
        // Scale down on mobile via CSS custom prop below.
      }}
    >
      <div className="w-full plexus-scale">
        <svg
          ref={ref}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMaxYMax meet"
          className="w-full h-auto block"
        >
          <g className={started ? "plexus-run" : "plexus-idle"}>
            {edges.map((e, i) => {
              const a = nodes[e.a];
              const b = nodes[e.b];
              const len = Math.hypot(b.x - a.x, b.y - a.y);
              return (
                <line
                  key={`e${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#00AAC3"
                  strokeOpacity={0.22}
                  strokeWidth={0.8}
                  strokeLinecap="round"
                  style={
                    started
                      ? {
                          strokeDasharray: len,
                          strokeDashoffset: len,
                          animation: `plexus-draw ${edgeTiming[i].duration}ms linear ${edgeTiming[i].delay}ms forwards`,
                        }
                      : { strokeDasharray: len, strokeDashoffset: len }
                  }
                />
              );
            })}
            {nodes.map((n, i) => (
              <g
                key={`n${i}`}
                style={
                  started
                    ? {
                        opacity: 0,
                        animation: `plexus-node 400ms ease-out ${nodeDelay[i]}ms forwards`,
                      }
                    : { opacity: 0 }
                }
              >
                <circle cx={n.x} cy={n.y} r={n.depth === 0 ? 3.2 : 2.2} fill="#00D6F6" fillOpacity={0.55} />
                <circle cx={n.x} cy={n.y} r={n.depth === 0 ? 1.6 : 1} fill="#00D6F6" fillOpacity={0.95} />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
