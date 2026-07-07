## Problem

On every page load the left timeline briefly highlights **Section 2 ("Más que una página")** instead of Section 1 ("Inicio"), then snaps to Section 1 after ~1s. This also creates the sensation of the page being "yanked up" when you try to scroll immediately, because the scroll listener re-evaluates and repaints the active state as soon as scroll begins.

## Root cause

In `src/components/Sidebar.tsx` the `useActiveSection` hook initializes state with the wrong id:

```ts
const [active, setActive] = useState<string>("mas-que-web"); // ← should be "inicio"
```

So the sidebar renders Section 2 as active on first paint. The scroll handler runs inside `useEffect` after mount and corrects it, which is the delayed "jump" the user sees.

The scroll handler itself has a secondary bug that makes the flicker worse: it only assigns `current` when `top - offset <= 0`, so if the top of Section 1 is below the 35% offset line (which it is on load, since Section 1 fills the viewport), the loop keeps the seeded value. Combined with the wrong seed, Section 2 wins until the user scrolls.

## Fix

Edit `src/components/Sidebar.tsx`:

1. Change the initial state to the first section:
   ```ts
   const [active, setActive] = useState<string>(sections[0].id); // "inicio"
   ```
2. Make the scroll handler resilient when no section has crossed the offset yet — always fall back to the first section whose top is above the viewport bottom, defaulting to `sections[0].id`. Concretely: iterate and pick the *last* section whose `top - offset <= 0`, and if none match, keep `sections[0].id` (already the initializer). This preserves current behavior mid-page and guarantees "Inicio" on top-of-page.
3. Run `handler()` once inside a `requestAnimationFrame` after mount so the first measurement happens after layout settles (Hero's mobile entrance animation shifts layout on load), preventing a second late correction.

No other files need to change. No scroll position is manipulated — the perceived "forced scroll" is the highlight repaint, not an actual scroll, and will disappear once the initial active id is correct.

## Verification

- Reload `/` on desktop and mobile viewports: "Inicio" pill is highlighted from the first frame, no delayed switch.
- Scroll down slowly: highlight advances Section 1 → 2 → 3 … in order with no snap-back.
- Click each sidebar item: still scrolls to the correct section.
