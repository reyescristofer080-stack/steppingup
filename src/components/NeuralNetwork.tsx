import { useEffect, useMemo, useRef, useState } from "react";

type NNode = {
  id: number;
  x: number;
  y: number;
  parent: number | null;
  level: number;
  angle: number;
  delay: number;
};

type NEdge = {
  from: number;
  to: number;
  cross?: boolean;
  delay: number;
  duration: number;
  length: number;
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Look B — "river-delta / lightning" variant:
 * - 2 long primary trunks with zig-zag character (deeper recursion, more
 *   grand-children at the tips) → feels like a bolt / mycelium rather than a
 *   symmetric fan.
 * - Depth-first reveal so a single spark carves its way outward, branching as
 *   it goes, then the next trunk fires.
 * - Nodes are hollow rings with a bright core.
 * - Lateral cross-links fade in (dashed) instead of drawing, so the eye
 *   distinguishes them from structural branches.
 */
function buildTree() {
  const rand = mulberry32(90210);
  const nodes: NNode[] = [
    {
      id: 0,
      x: 100,
      y: 100,
      parent: null,
      level: 0,
      angle: Math.PI * 1.25,
      delay: 0,
    },
  ];
  const treeEdges: NEdge[] = [];

  const grow = (parentId: number, level: number, maxLevel: number) => {
    if (level >= maxLevel) return;
    const parent = nodes[parentId];
    let nChildren: number;
    if (level === 0) nChildren = 2;
    else if (level >= 4) nChildren = 2 + Math.floor(rand() * 3); // dense tips 2-4
    else nChildren = 2 + Math.floor(rand() * 2);

    const spread =
      level === 0
        ? Math.PI * 0.35 // narrow split at trunk
        : level === 1
          ? Math.PI * 0.75 // wide fan on primary branches
          : Math.PI * 0.55;
    const baseLen = 42 * Math.pow(0.58, level);

    for (let i = 0; i < nChildren; i++) {
      const t = nChildren === 1 ? 0.5 : i / (nChildren - 1);
      // zig-zag: alternate a bias per level so the path snakes
      const zig = ((level + i) % 2 === 0 ? 1 : -1) * 0.15;
      const a =
        parent.angle - spread / 2 + spread * t + (rand() - 0.5) * 0.5 + zig;
      const L = baseLen * (0.6 + rand() * 0.8);
      const nx = Math.max(1.5, Math.min(100, parent.x + Math.cos(a) * L));
      const ny = Math.max(1.5, Math.min(100, parent.y + Math.sin(a) * L));
      const id = nodes.length;
      nodes.push({
        id,
        x: nx,
        y: ny,
        parent: parentId,
        level: level + 1,
        angle: a,
        delay: 0,
      });
      treeEdges.push({
        from: parentId,
        to: id,
        delay: 0,
        duration: 0,
        length: Math.hypot(nx - parent.x, ny - parent.y),
      });
      grow(id, level + 1, maxLevel);
    }
  };
  grow(0, 0, 6);

  // Lateral cross-links between nearby nodes on adjacent levels.
  const crossEdges: NEdge[] = [];
  for (let i = 1; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      if (a.parent === b.id || b.parent === a.id) continue;
      if (Math.abs(a.level - b.level) > 1) continue;
      if (a.level < 2 || b.level < 2) continue;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 8 && rand() < 0.32) {
        crossEdges.push({
          from: i,
          to: j,
          cross: true,
          delay: 0,
          duration: 0,
          length: d,
        });
      }
    }
  }

  // Depth-first ordering (recursive order already is DFS from `grow`).
  const ordered = treeEdges;
  const allEdges = [...ordered, ...crossEdges];
  const totalDuration = 5.6;
  const step = totalDuration / (allEdges.length + 1);
  allEdges.forEach((e, i) => {
    e.delay = i * step;
    e.duration = step * 2.2;
  });

  nodes[0].delay = 0;
  for (const e of ordered) {
    nodes[e.to].delay = e.delay + e.duration * 0.7;
  }

  return { nodes, edges: allEdges, totalDuration };
}

export function NeuralNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { nodes, edges, totalDuration } = useMemo(() => buildTree(), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0 z-0 h-[80%] w-[70%] max-sm:h-[50%] max-sm:w-[55%]"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
        style={
          visible
            ? {
                animation: `nn-breathe 6.5s ease-in-out ${totalDuration + 0.4}s infinite`,
              }
            : undefined
        }
      >
        {edges.map((e, i) => {
          const a = nodes[e.from];
          const b = nodes[e.to];
          if (e.cross) {
            // Lateral shortcut: dashed, fades in.
            return (
              <line
                key={`e${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#007D90"
                strokeOpacity={0.5}
                strokeWidth={0.6}
                strokeDasharray="1.4 1.6"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: visible ? 0.55 : 0,
                  transition: visible
                    ? `opacity ${e.duration}s ease-out ${e.delay}s`
                    : "none",
                }}
              />
            );
          }
          // Structural branch: drawn root→tip via dashoffset.
          return (
            <line
              key={`e${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#00AAC3"
              strokeOpacity={0.28}
              strokeWidth={0.9}
              vectorEffect="non-scaling-stroke"
              style={{
                strokeDasharray: e.length,
                strokeDashoffset: visible ? 0 : e.length,
                transition: visible
                  ? `stroke-dashoffset ${e.duration}s linear ${e.delay}s`
                  : "none",
              }}
            />
          );
        })}
        {nodes.map((n, i) => (
          <g
            key={`n${i}`}
            style={{
              opacity: visible ? 1 : 0,
              transition: visible
                ? `opacity 0.35s ease-out ${n.delay}s`
                : "none",
            }}
          >
            {/* Hollow ring */}
            <circle
              cx={n.x}
              cy={n.y}
              r={1.1}
              fill="none"
              stroke="#00D6F6"
              strokeOpacity={0.5}
              strokeWidth={0.45}
              vectorEffect="non-scaling-stroke"
            />
            {/* Bright core */}
            <circle
              cx={n.x}
              cy={n.y}
              r={0.35}
              fill="#00D6F6"
              fillOpacity={0.9}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
