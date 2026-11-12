================================================================================
  ZNAKE · SNAKE FIBONACCI ECOLOGY · COMPREHENSIVE GUIDE & HOW-TO TUTORIAL
================================================================================
Coordinator: RC-Znk-01 [uncle of RC03-Wisly]
Engine: Pure Vanilla Canvas 2D + Signed Infinite Coordinate Topology
Deployment: https://eloqven.github.io/
Status: 100% Standalone Offline-Ready Single File Build

--------------------------------------------------------------------------------
1. INTRODUCTION & CORE CONCEPTS
--------------------------------------------------------------------------------
Znake is an artificial life simulation that couples the classic snake archetype
with genetic inheritance, local plant ecology, celestial rhythms, infinite signed
coordinate topology, and a faux-3D three-plane wireframe perspective engine.

Key Principles:
- Single Authoritative Simulation: Exactly one world simulation runs. The upper
  planes and wireframe perspective connectors are strictly visual projections;
  they do not spawn duplicate births, berries, collisions, or mutations.
- Deterministic Procedural Universe: Free Roam uses a 32-bit seeded PRNG to ensure
  that panned-away and revisited chunks generate identical vine placements and
  reference emoji lattices.
- Infinite Signed Space: Coordinates span all negative and positive integers
  without clipping, wrapping, or bounds errors.
- Three-Tier Fractal Grid (Mode 3X): Macro (1.0), Subpixel (1/S), and Nano (1/(3S))
  planes running in harmonic nested synchrony.

--------------------------------------------------------------------------------
2. MODES OF OPERATION & PRESETS
--------------------------------------------------------------------------------
You can select presets at the top of the configuration panel:
1. ① Fibonacci: Classic Fibonacci reverse-direction splitting at lengths 5, 8, 13...
2. ② Auto-mușcare: Self-cutting bites segment the tail and spawn independent children.
3. ③ Familie: Family bonds, parental escort, and child tracking.
4. ④ Subpixel: Children navigate fine fractional subcells within grid tiles.
5. ⑤ Mod 3X (Nano): Three-tier fractal plane with nano-grid, clan hierarchy,
   older brother authority, square-level clan collisions, and food-as-a-vine.

Additional Top-Level Simulation Modes:
- Finite Ecology: Closed board bounded by cols x rows with toroidal wrapping.
- Free Roam Sandbox: Infinite unbounded plane spanning negative/positive integers.
- Mod P (Community Maps): Press [P] to open the custom map browser and play maps.
- Mod Supraviețuire: Choose between 5 specialized starters with frozen settings.

--------------------------------------------------------------------------------
3. IN-PLACE SEGMENTATION & REVERSE SPLITTING
--------------------------------------------------------------------------------
When a snake segments (via self-cut or pressing the opposite movement key):
- In-Place Splitting: The body segments detach without displacement or jumping.
- The parent retains the front segments up to the split point and continues in
  its head direction.
- The newly spawned snake's head appears exactly where the faded tail tip was,
  and moves outward in reverse along the tail's curvature.
- Coordinates are snapped to the active grid scale in-place without generating
  synthetic straight lines.

--------------------------------------------------------------------------------
4. MATERNAL BOND & CHILD INSTINCT MECHANICS
--------------------------------------------------------------------------------
- Lifelong Parental Bond (opts.eternalBond):
  When checked, small snake children remain permanently attached to their parent
  (dependent: true, familySafe: true) for the entire duration of the parent's life,
  bypassing standard length-based independence. Only parental death grants independence.
- Primary Approach Instinct (hasReachedMother):
  Upon birth or segmentation, the child's single-minded priority is rushing towards
  the mother's head until reaching its genetically determined proximity:
      targetDist = effectiveAdventureRadius(child, opts.radius)
  While on its journey to the mother, if food is directly adjacent (<= 1.5 cells),
  it opportunistically feeds. Once within targetDist, full genetic autonomy unlocks.
- Child Adventure Gene (adventureGene):
  A signed gene [-100, +100] controlling how far the child explores.
  The UI slider "Raza hranei pentru pui" acts as a scaling amplifier:
      effectiveRadius = max(1, round(opts.radius * max(0.2, min(2.0, 1 + gene/100))))
- Environmental Propagation:
  Dying snakes fertilize covering vine nodes with their adventureGene. Feeding snakes
  nudge their adventureGene toward the local vine pool. Offspring inherit the gene
  with Gaussian mutation at birth.

--------------------------------------------------------------------------------
5. MODE 3X & CLAN HIERARCHY
--------------------------------------------------------------------------------
- Three-Tier Hierarchy:
  - Tier 0 (Macro): 1.0 cell size (Adults).
  - Tier 1 (Subpixel): 1/S cell size (Children).
  - Tier 2 (Micro 3X): 1/(3S) cell size (Grandchildren/Nano-snakes).
- Nano-Babies: Move at slow cadence (speedFactor = 0.35 - 0.50), imposing their
  ancestral mutated color onto the visual canvas.
- Food-as-a-Vine: Macro berries cannot be swallowed directly by L2 nano-snakes.
  Instead, each berry behaves as a micro-vine, emitting a halo of micro-pellets.
  Consuming micro-pellets grows nano-snakes until they graduate into Tier 1!
- Clan Hierarchy & Older Brother:
  - Matriarch: Living root ancestor of the clan.
  - Older Brother: Longest direct surviving child, acting as a secondary
    protective escort focus ("lightning rod") alongside the mother.
  - Succession: Upon mother's death, the older brother ascends to Clan Authority.
    If no authority survives, the orphan ascends to Head of Clan (clanHead).
- Superposition Overlap Resistance:
  When connected clan members occupy the same square, resistance halves per layer:
      effectiveResistance = baseResistance * 2^(-(k-1))
- Square-Level Clan Collision Resolution:
  Instead of O(N^2) pairwise tests, contested cells are evaluated once between
  opposing clan branches. The winning clan is spared individual collision checks.
  The losing clan divides damage proportionately among its present snakes.
- Full Moon Genetic Wander & Rebellion:
  Full moon amplifies adventure radius proportionally to genetic disparity. If disparity
  exceeds 140, a rare 0.2% roll allows the child to break away from the clan.
- Level of Detail (LOD) Pixel Averaging:
  When camera zoom is below 1.35x, nano-snakes collapse into an averaged color footprint
  per cell, guaranteeing 60 FPS performance without WebGL overhead.

--------------------------------------------------------------------------------
6. ZOOM & INTERACTIVE MOUSE PAN
--------------------------------------------------------------------------------
- Zoom Slider: Regulate magnification smoothly from 0.3x (panoramic) to 5.0x / 10.0x.
- Interactive Mouse Pan: Click and drag with the left mouse button across the canvas
  to pan smoothly across the entire board or infinite free-roam plane.
- Quick clicks (< 5px drag) still inspect snakes or place food.

--------------------------------------------------------------------------------
7. HEATMAP & RESTART LIFECYCLE
--------------------------------------------------------------------------------
- Clean Restart: Clicking the "Restart" button or triggering a reset event now
  completely clears and refreshes the death heatmap (clearHeatmap()), giving each
  new evolutionary generation a pristine, fresh canvas.

--------------------------------------------------------------------------------
8. SHORTCUTS & SPECIAL CONTROLS
--------------------------------------------------------------------------------
- [T]: Cycle Themes (Cyber Slate, Solar Luxe, Midnight OLED, Arcade CRT).
- [L]: Cycle Layouts (Cockpit, Mobile Bottom Sheet, Zen Overlay, Arcade Deck).
- [P]: Open / Close Mode P (Community & GitHub Maps Hub).
- [O]: Escort Mode (Parent) OR Lay Egg (Lone Elder snake L>=8, 2+ moon cycles).
       Step on Egg + [O]: Eat egg for +2, +3, or +5 segments.
- [E x 3]: Secret Menu (press 'E' 3 times within 1200ms) for Entity Customizer,
           Special Vine Editor, and Interactive Map Editor.
- [Shift + M]: Fullscreen Mode.
- [Space]: Pause / Resume simulation.
- [WASD]: Steer Snake #1.
- [IJKL]: Steer Snake #2.
- [Arrows]: Steer all currently selected snakes.

--------------------------------------------------------------------------------
9. PRODUCTION BUILD & DEPLOYMENT
--------------------------------------------------------------------------------
- The production build is compiled as a single zero-dependency standalone HTML file:
  `snake_fibonacci_subpixel_tail_fusion_fixed.html`
- Deployed directly to GitHub Pages at: https://eloqven.github.io/
- All mechanics run offline in any modern standard browser.

================================================================================
Signed: RC-Znk-01 [uncle of RC03-Wisly]
================================================================================
