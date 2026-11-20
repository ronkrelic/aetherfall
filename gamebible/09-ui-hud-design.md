# AETHERFALL: The Sunken Tiers - UI & HUD Design

This specification defines the complete First-Person UI/HUD Design for Aetherfall: The Sunken Tiers, built around diegetic clarity, zero-clutter peripheral awareness, and instantaneous combat feedback during high-verticality first-person play.

## UI/HUD Design Pillar: "Diegetic Anchors, Tactical Clarity"

Because Aetherfall blends vertical platforming (grappling, gliding, steam-venting) with real-time Active Stagger System (A.S.S.) combat, the interface splits information into two layers:

- **Diegetic In-World Cues:** Information built directly onto your first-person hands, tools, and wrist-mounted Resonance Band so your eyes stay on the horizon.
- **Contextual Screen-Edge HUD:** Clean, high-contrast brass-and-slate UI elements anchored to screen corners that fade smoothly out of combat and sharpen immediately when weapons are drawn.

## 1. Screen Layout & Spatial Map

```text
+----------------------------------------------------------------------------------+
| [TOP-LEFT: Player Vitals]   [TOP-CENTER: Target & Stagger]   [TOP-RIGHT:             |
|  (Portrait + 3 Arcs)         (Enemy Name + HP + Stagger)      Compass/Minimap       |
|  [Party Frames Below]                                       + Quest Tracker]      |
|                                                                                  |
|                              [CENTER RETICLE]                                    |
|                         (Dynamic Crosshair, Grapple                              |
|                          Hook, & Breach/Execute Ring)                            |
|                                                                                  |
| [LEFT VIEWMODEL]                                            [RIGHT VIEWMODEL]     |
|  Resonance Band / Lantern                                    Weapon / Grapple     |
|  (Diegetic Charge & Rift Glow)                               (Pressure Gauge)     |
|                                                                                  |
| [BOTTOM-LEFT: Zone/Chat]    [BOTTOM-CENTER: Tactical Bar]   [BOTTOM-RIGHT:          |
|  (Collapsible)               [Class Meter] [1-9] [Q E R]     Combat & Loot Log]     |
+----------------------------------------------------------------------------------+
```

## 2. Core HUD Modules (Detailed Breakdown)

### A. Center Reticle & Contextual World Prompts (Eye-Line Priority)

The center reticle dynamically morphs based on what you are aiming at, eliminating the need to look down at cooldowns mid-jump:

- **Neutral / Exploration State:** A subtle 4px dot that expands slightly while sprinting or gliding.
- **Grapple Anchor Lock (<= 35m):** When looking at a grappleable ledge, ruin strut, or pullable enemy, two brass brackets snap inward around the reticle with a crisp mechanical click. Out-of-range anchors show a faint greyed hook icon.
- **Combat & Hit Confirmation:**
  - **Light / Heavy Hit:** Crisp white tick marks (X) on standard hits; gold ticks on weak-point/headshot crits.
  - **Stagger Pulse:** A thin violet arc wraps around the bottom of the crosshair, filling in real time as you build Stagger on your current target.
  - **Breach / Execute Prompt ([E]):** When an enemy hits 100% Stagger and enters Breach, a golden [E] EXECUTE ring pulses directly beside the target's core for 3–5 seconds.
- **Charge & Draw Arcs:** Holding Left-Click (Heavy Attack windup or Bow draw) fills a curved brass tension bar along the right side of the crosshair, flashing white at the Perfect Release sweet spot.

### B. Player Vitals & Party Frame (Top-Left)

**Character Medallion & Three Concentric Arcs:**

- **Outer Arc (Emerald Green):** Health Points (HP), flashing crimson below 25% with a subtle screen-edge vignette.
- **Middle Arc (Azure Blue):** Aether / Mana pool (used by Arcanist spells and Artificer gadgets).
- **Inner Arc (Amber Gold):** Stamina pool (consumed by sprinting, dodging, and Right-Click blocking).

**Active Buffs / Debuffs:** Compact square icons docked directly beneath the medallion with radial cooldown sweeps and stack counters (e.g., Rested Resonance, Updraft Lift, Blight Spores).

**Party Window (4 Teammates):** Stacked vertically below your vitals, displaying each ally's Class icon, HP bar, Aether bar, and a small Breach Assist indicator when an ally staggers an enemy.

### C. Target & Boss Stagger Display (Top-Center)

Appears smoothly when locking onto or damaging an enemy:

- **Header:** Enemy Name, Level, and Tier Emblem (e.g., Corrupted Cinder-Stalker – Level 35 Elite or Orrery Warden Vaelis – Delve Boss).
- **Primary Bar (Crimson):** Health Points with exact numeric/percentage readout.
- **Secondary Bar (Segmented Violet-Gold):** The Active Stagger Meter.
  - Divided into 25% notch thresholds so groups can track progress toward a break.
  - When full, the bar shatters visually and turns bright gold with a shrinking Breach Timer (4.0s).
- **Cast & Telegraph Bar:** Drops below the Stagger Meter during major enemy windups (e.g., Celestial Collapse), glowing bright orange if interruptible by a Resonance Tuning Fork or Heavy Attack.

### D. Tactical Hotbar & Class Gauge (Bottom-Center)

**Class-Specific Stance / Resource Widget (Left of Hotbar):**

- **Vanguard:** Bulwark Guard Meter (shows remaining shield poise and Perfect-Block readiness).
- **Arcanist:** Aether Charges (0/5) represented as five glowing crystal pips.
- **Waystalker:** Wind-Draw & Quiver Stance (shows active arrow coating and airborne crit buff).
- **Artificer:** Steam Pressure Gauge (0–100 PSI) with a green Overpressure sweet spot.

**Primary Ability Slots (1 – 6):** Core class attacks, weapon skills, and deployables with radial cooldown timers and keybind labels.

**Dedicated Mobility & Utility Keys (7 – 9 / Q / E / R):**

- **Q:** Geyser-Flask / Healing Draught (displays charge pips and steam pressure cooldown).
- **E:** Contextual Interact / Breach Execute (lights up dynamically near doors, mirrors, or Breached foes).
- **R:** Ultimate Ability (ornate circular brass frame that fills with swirling Aether energy when ready).

### E. Navigation, Quest Tracker & Combat Log (Right Side)

**Top-Right Circular Minimap & Horizon Compass:**

- Displays local terrain elevation contours, nearby Grapple Anchors, Waystones, party member arrows, and sky-beam alerts for active Harmonic Convergences.
- A subtle top-edge Horizon Compass ribbon marks cardinal directions (N / E / S / W) and vertical elevation arrows (↑ above / ↓ below) for tracked objectives.

**Active Quest Tracker (Mid-Right):** Lists up to 3 tracked objectives with clean diamond checkmarks (e.g., 1. Stabilize the Ruin Beacon (65%)).

**Combat & Loot Feed (Bottom-Right):** Semi-transparent, auto-fading log showing incoming/outgoing damage, Stagger breaks, telegraphed boss warnings, and gathered materials.

## 3. Diegetic First-Person Viewmodel Feedback

To keep immersion high in first-person, your equipped hands and tools mirror key HUD states physically on screen:

- **Wrist-Mounted Resonance Band (Left Forearm):** Glows calm turquoise in safe zones, pulses amber near hidden caches or lore glyphs, and flashes violet during an incoming Harmonic Convergence surge.
- **Runic Choir Lantern (Left Hand):** Its glass core brightens and chimes softly when facing a secret passage, tuning obelisk, or cloaked predator.
- **Geyser-Flask & Carbine Pressure Dial (Right Hand / Belt):** Vents thin wisps of steam when charges are full; sputtering sparks indicate an empty canister recharging.
- **Glider-Cloak Peripheral Edge:** Deploying your cloak mid-air adds subtle wind-stream ribbons along the upper corners of the screen that shift angle as you catch rising thermal updrafts.

## 4. HUD States & Accessibility Options

| HUD State | Trigger Condition | Visual Behavior |
| --- | --- | --- |
| Exploration Mode | Weapons sheathed; out of combat for 6s | Hotbar and Vitals fade to 35% opacity; Target frame hides; Compass & Reticle remain crisp. |
| Combat / Engaged | Weapon drawn, damage dealt/taken, or enemy aggro | All combat widgets snap to 100% opacity; Stagger & Class meters expand slightly. |
| Aerial / Traversal | Grappling, Geyser-boosting, or Glider-Cloak active | Vertical altitude/updraft indicator appears beside the reticle; ground clutter fades. |
| Sanctum / Build Mode | Inside your Wayfinder Sanctum (B key) | Combat hotbar swaps to Placement Palette (Snap Grid, Rotation, Lighting Color, Room Budget). |

### Accessibility & Customization Settings

- **Colorblind Presets:** Adjustable palettes for Health / Aether / Stamina and Stagger / Breach bars (including High-Contrast Gold/Cyan mode).
- **Motion & Viewmodel Comfort:** Independent sliders for Field of View (75°–110°), Viewmodel Bob Intensity (0%–100%), and Glider Edge-Vignette to prevent motion sickness during rapid grappling.
- **Modular Scale & Opacity:** Every HUD cluster (Vitals, Target Bar, Hotbar, Minimap, Combat Log) can be resized (70%–130%) or toggled independently.
