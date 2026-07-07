import { useMemo } from "react";

type Node = {
  id: number;
  x: number;
  y: number;
  depth: number;
  parent: number | null;
};

type Edge = {
  from: number;
  to: number;
  order: number; // sequence for animation
  cross?: boolean;
};

// Deterministic pseudo-random
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTree() {
  const rand = mulberry32(7);
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Root at bottom-right corner of a 1000x1000 viewBox
  const root: Node = { id: 0, x: 990, y: 990, depth: 0, parent: null };
  nodes.push(root);

  // Overall growth direction: up-left (angle ~ 180°..270° in screen coords => -x,-y).
  // We define angle in radians measured from +x axis; growth toward upper-left = angles around 3π/4 to π (i.e. 135°–200°).
  const grow = (parent: Node, depth: number, baseAngle: number, length: number) => {
    if (depth > 4) return;
    const childCount = 2 + Math.floor(rand() * 2); // 2 or 3
    for (let i = 0; i < childCount; i++) {
      // Spread angles around baseAngle
      const spread = 0.9; // radians
      const a = baseAngle + (rand() - 0.5) * spread;
      const len = length * (0.7 + rand() * 0.35);
      const nx = parent.x + Math.cos(a) * len;
      const ny = parent.y + Math.sin(a) * len;
      // Clamp within viewBox
      const cx = Math.max(20, Math.min(1000, nx));
      const cy = Math.max(20, Math.min(1000, ny));
      const node: Node = {
        id: nodes.length,
        x: cx,
        y: cy,
        depth,
        parent: parent.id,
      };
      nodes.push(node);
      edges.push({ from: parent.id, to: node.id, order: 0 });
      grow(node, depth + 1, a, len * 0.75);
    }
  };

  // Two primary trunks from root, both aiming up-left
  const primaries = 2 + Math.floor(rand() * 2); // 2 or 3
  for (let i = 0; i < primaries; i++) {
    // angles between ~200° (up-slightly-left) and ~260° (up-mostly)
    // In screen coords Y grows downward, "up-left" = negative x, negative y => angle in [π, 3π/2]
    const baseAngle = Math.PI + (i + 0.5) * (Math.PI / 2 / primaries);
    const len = 260 + rand() * 60;
    const nx = root.x + Math.cos(baseAngle) * len;
    const ny = root.y + Math.sin(baseAngle) * len;
    const node: Node = { id: nodes.length, x: nx, y: ny, depth: 1, parent: 0 };
    nodes.push(node);
    edges.push({ from: 0, to: node.id, order: 0 });
    grow(node, 2, baseAngle, len * 0.75);
  }

  // Assign BFS order for main edges
  const childrenOf = new Map<number, number[]>();
  for (const e of edges) {
    if (!childrenOf.has(e.from)) childrenOf.set(e.from, []);
    childrenOf.get(e.from)!.push(e.to);
  }
  let orderCounter = 0;
  const queue: number[] = [0];
  const visited = new Set<number>([0]);
  const edgeMap = new Map<string, Edge>();
  for (const e of edges) edgeMap.set(`${e.from}-${e.to}`, e);
  while (queue.length) {
    const cur = queue.shift()!;
    const kids = childrenOf.get(cur) || [];
    for (const k of kids) {
      const e = edgeMap.get(`${cur}-${k}`)!;
      e.order = orderCounter++;
      if (!visited.has(k)) {
        visited.add(k);
        queue.push(k);
      }
    }
  }

  // Cross-connections: for each node, connect to a few nearby non-ancestor nodes
  const maxOrder = orderCounter;
  const crossEdges: Edge[] = [];
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i];
    // Find nearest 2 nodes (skip parent/self)
    const candidates = nodes
      .filter((b) => b.id !== a.id && b.id !== a.parent && a.parent !== b.id)
      .map((b) => ({ b, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .sort((p, q) => p.d - q.d)
      .slice(0, 3);
    for (const c of candidates) {
      if (c.d > 140) continue;
      const key1 = `${a.id}-${c.b.id}`;
      const key2 = `${c.b.id}-${a.id}`;
      if (edgeMap.has(key1) || edgeMap.has(key2)) continue;
      if (rand() < 0.45) {
        const e: Edge = { from: a.id, to: c.b.id, order: maxOrder, cross: true };
        edgeMap.set(key1, e);
        crossEdges.push(e);
      }
    }
  }
  // Assign cross-edge orders after main reveal, ordered by max endpoint order
  const nodeFirstOrder = new Map<number, number>();
  nodeFirstOrder.set(0, 0);
  for (const e of edges) {
    if (!nodeFirstOrder.has(e.to)) nodeFirstOrder.set(e.to, e.order);
  }
  crossEdges.sort((p, q) => {
    const pm = Math.max(nodeFirstOrder.get(p.from) ?? 0, nodeFirstOrder.get(p.to) ?? 0);
    const qm = Math.max(nodeFirstOrder.get(q.from) ?? 0, nodeFirstOrder.get(q.to) ?? 0);
    return pm - qm;
  });
  crossEdges.forEach((e, idx) => {
    e.order = maxOrder + idx;
  });

  const allEdges = [...edges, ...crossEdges];
  return { nodes, edges: allEdges, nodeFirstOrder, totalSteps: maxOrder + crossEdges.length };
}

export function ContactPlexus() {
  const { nodes, edges, nodeFirstOrder, totalSteps } = useMemo(buildTree, []);

  const TOTAL_DURATION = 5.2; // seconds
  const perStep = TOTAL_DURATION / Math.max(1, totalSteps);
  const segmentDuration = Math.max(perStep * 1.6, 0.12);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMaxYMax meet"
        className="absolute bottom-0 right-0 h-full w-[80%] sm:w-[55%] md:w-[42%] lg:w-[38%]"
        style={{ maxWidth: "900px" }}
      >
        <style>{`
          @keyframes plexus-draw {
            from { stroke-dashoffset: var(--len); }
            to { stroke-dashoffset: 0; }
          }
          @keyframes plexus-node-in {
            from { opacity: 0; transform: scale(0.4); }
            to { opacity: var(--node-op, 0.55); transform: scale(1); }
          }
          @keyframes plexus-flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.95; }
          }
          .plexus-root {
            animation: plexus-flicker 5.5s ease-in-out infinite;
            animation-delay: ${TOTAL_DURATION + 0.5}s;
          }
        `}</style>
        <g className="plexus-root">
          {edges.map((e, i) => {
            const a = nodes[e.from];
            const b = nodes[e.to];
            const len = Math.hypot(b.x - a.x, b.y - a.y);
            const delay = e.order * perStep;
            const isCross = !!e.cross;
            return (
              <line
                key={`e-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isCross ? "#007D90" : "#00AAC3"}
                strokeWidth={isCross ? 0.8 : 1.1}
                strokeOpacity={isCross ? 0.18 : 0.22}
                strokeLinecap="round"
                style={
                  {
                    ["--len" as string]: len,
                    strokeDasharray: len,
                    strokeDashoffset: len,
                    animation: `plexus-draw ${segmentDuration}s linear ${delay}s forwards`,
                  } as React.CSSProperties
                }
              />
            );
          })}
          {nodes.map((n, i) => {
            const order = nodeFirstOrder.get(n.id) ?? 0;
            const delay = order * perStep + segmentDuration * 0.7;
            const isRoot = n.id === 0;
            const r = isRoot ? 3.2 : n.depth <= 2 ? 2.4 : 1.8;
            const op = isRoot ? 0.65 : 0.5;
            return (
              <circle
                key={`n-${i}`}
                cx={n.x}
                cy={n.y}
                r={r}
                fill="#00D6F6"
                style={
                  {
                    ["--node-op" as string]: op,
                    opacity: 0,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: `plexus-node-in 0.5s ease-out ${delay}s forwards`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
