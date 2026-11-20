# AETHERFALL: The Sunken Tiers - Combat Design

This document details the core combat mechanics for Aetherfall: The Sunken Tiers, focusing on the tactical first-person feel, the Active Stagger System, and integrated mobility.

## Combat Design Pillar: "Tactile Engagement"

Combat in Aetherfall is designed to be physical and immediate. You are not controlling a character on the screen; you are in the world. Every swing, block, and shot originates from your perspective, requiring you to aim, manage physical resources (like steam pressure and stamina), and position yourself correctly within the multi-tiered environment.

## 1. The Core Loop

The combat loop revolves around managing enemy defenses and exploiting openings using both weapons and Aether-tools.

- **Initiate:** Engage enemies using ranged attacks (Waystalker/Arcanist) or gap-closers (Vanguard/Artificer).
- **Pressure:** Use standard attacks and abilities to damage the enemy and, more importantly, build their Stagger Meter.
- **Break:** Once the Stagger Meter is full, the enemy is Breached. They are momentarily stunned, take bonus damage, and may be vulnerable to a specific interaction (e.g., a Vanguard shield-slam that knocks them off a ledge).
- **Execute/Disengage:** Use a high-damage finisher or use the opportunity to reposition using mobility tools (Grapple/Geyser-Flask).

## 2. The Active Stagger System (A.S.S.)

Standard "Holy Trinity" MMO combat (Tank holds aggro, Healer heals, DPS burns) is modified in Aetherfall by the Active Stagger System. Every enemy, from a minor Cinder-Stalker to a raid boss, has a Stagger Meter displayed below their health bar.

### Building Stagger

- All player attacks contribute to stagger.
- **Heavy Attacks (Hold Mouse Click):** Deal minimal health damage but massive stagger damage. These require commitment and leave you vulnerable.
- **Aether-Tools:** Specific tools, like the Resonance Tuning Fork or a Vanguard's Shield Bash, are specialized for stagger damage.

### The Breach State

- When the meter hits 100%, the enemy enters the Breach state. Their health bar flashes gold, and they collapse or recoil.
- Breach duration is short (3-5 seconds).
- During Breach, all incoming damage is increased by 20%.
- **Boss Mechanics:** Bosses often have multiple "stagger points" (e.g., two specific legs or an exposed core). Focusing fire on these points is required to trigger a Breach, which might be the only time the boss is vulnerable to real damage or interrupts a devastating attack.

## 3. First-Person HUD and UI (Heads-Up Display)

The HUD (as seen in the concept art) is designed to be minimal but comprehensive, providing critical information without breaking immersion.

### A. Player Vitals (Top-Left)

A circular portrait of the character with three concentric semi-circles:

- **Green:** Health
- **Blue:** Mana/Aether (Resource for Arcanist/Artificer)
- **Yellow:** Stamina (Resource for dodges, sprinting, and melee blocks)

### B. Target Display (Top-Center)

Appears when you look at an enemy.

- Displays Name, Level, and Rarity (e.g., "Elite").
- **Red Health Bar.**
- **Stagger Meter:** A distinct, segmented bar below the health bar that fills with purple/white energy as you attack it.

### C. Ability Hotbar (Bottom-Center)

This is your primary interface.

- **1-9 Keys:** Standard abilities (e.g., Arcane Bolt, Shield Bash). Show icons, cooldown timers (a sweeping dark overlay), and key bindings.
- **Q/E/R Keys:** Key-bound utility skills.
  - **Q** is universally mapped to Potion/Consumable.
  - **E** is Interact/Execute (contextual, used on Breached enemies).
  - **R** is Ultimate Ability (long cooldown, powerful effect, visually spectacular).

### D. Stance/Resource Meter (Left of Hotbar)

A small, class-specific display. For example, the Arcanist might see "Aether Charges (3/5)" indicating how many empowered bolts they have stored.

### E. Party Window (Below Vitals)

Compact bars for up to 4 other party members, showing Health and Mana.

### F. Combat Log (Bottom-Right)

A scrollable text window displaying real-time damage numbers, buffs/debuffs gained, and critical warnings (e.g., "[Warning] Cinder-Stalker is preparing a Leap!").

## 4. Integrated Mobility and Tools

Mobility is not just about running faster; it's a core combat mechanic, allowing players to interact vertically with the world.

### The Grapple Gauntlet

Activated by a hotkey (e.g., 5).

- **In Combat:** Targets an enemy (shows a white reticle). Firing pulls you to the enemy (melee classes) or pulls a lightweight enemy to you (Vanguard).
- **Out of Combat:** Targets specific grapple-points on ruins/ledges (shows a hook icon) for rapid vertical traversal.

### The Geyser-Flask

Activated by double-tapping a movement key (e.g., Space, Space).

- Vents pressurized steam/Aether beneath you, launching you vertically.
- Essential for dodging ground-based area-of-effect (AoE) attacks and reaching higher ground during boss fights.

### The Glider-Cloak

Activated by holding Space while airborne.

- Converts vertical momentum into horizontal glide. Allows for aerial combat (Waystalker/Arcanist) and rapid retreat from dangerous platforms.

## 5. Action-State Combat (No "Auto-Attack")

There are no passive auto-attacks. You must actively click for every swing of a staff or slash of a blade.

- **Light Attacks (Click):** Fast, low damage, low stagger, low stamina cost. Can be chained.
- **Heavy Attacks (Hold Click):** Slow, high damage, high stagger, high stamina cost. Triggers a "wind-up" animation.
- **Blocking (Hold RMB):** Consumes Stamina over time. Absorbs frontal damage and reduces stagger damage taken. Perfect-blocking (blocking just as an attack lands) negates all damage and deals a small amount of stagger back to the attacker.

This active system ensures that every encounter, from a simple scavenger to a world boss, requires player engagement and decision-making.
