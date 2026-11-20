# AETHERFALL: The Sunken Tiers - Technical Architecture

This technical architecture and prototype roadmap outlines how to build a playable browser-based vertical slice of Aetherfall: The Sunken Tiers using PlayCanvas (or Three.js) on the client and Node.js + SQLite on the server.

## 1. High-Level System Architecture

To support real-time first-person movement, grappling, Active Stagger combat, and seamless open-world events in a web browser, the stack is split into an authoritative real-time simulation server and a client-predicted 3D renderer.

```text
+------------------------------------------------------------------------+
| BROWSER CLIENT                                                         |
| [PlayCanvas / Three.js Engine]                                          |
|  +-- First-Person Rig (Viewmodel Arms, Grapple, Lantern, Staff)           |
|  +-- Client-Side Prediction & Input Buffer (60 Hz)                       |
|  +-- Entity Interpolation & Snapshot Smoothing                          |
|  +-- Diegetic / Minimal HUD (Vitals, Stagger Bar, Hotbar)                 |
+-----------------------------------+------------------------------------+
                                    | WebSockets (Binary / JSON)
                                    v
+------------------------------------------------------------------------+
| AUTHORITATIVE GAME SERVER                                              |
| [Node.js + WebSocket (ws / uWebSockets.js)]                              |
|  +-- Zone Instance Loop (20 Hz Tick Rate)                               |
|  +-- Physics & Raycast Validation (Grapple Anchors, Fall, Hitbox)        |
|  +-- Combat & Active Stagger State Machine (Stagger -> Breach)           |
|  +-- AI Director & Public Event Trigger (Harmonic Convergence)           |
|  +-- Interest Management (Spatial Grid / AOI Filtering)                 |
+-----------------------------------+------------------------------------+
                                    | Async Persistence / Batched Saves
                                    v
+------------------------------------------------------------------------+
| DATA & ASSET LAYER                                                     |
| [SQLite (better-sqlite3)]              [Static CDN / Local Assets]       |
|  +-- Accounts & Auth Tokens            +-- Modular .glb Models          |
|  +-- Character Stats & Mastery         +-- Terrain Heightmaps/Chunks    |
|  +-- Inventory & Socketed Gear         +-- Item/Loot JSON Tables         |
|  +-- Sanctum Housing Layouts                                           |
+------------------------------------------------------------------------+
```

### Core Stack Choices

- **3D Client Engine:** PlayCanvas (recommended if you want built-in scene hierarchy, .glb animation state graphs, physics integration, and UI screens out of the box) or Three.js (ideal for lightweight procedural terrain chunks and custom shaders).
- **Real-Time Transport:** WebSockets running a 20 Hz server tick rate (50 ms per tick) paired with 60 Hz client-side prediction so first-person jumping, grappling, and melee swings feel instantaneous.
- **Backend Runtime:** Node.js using modular ES modules (server/loop.js, server/combat.js, server/world.js, server/db.js).
- **Database:** SQLite via better-sqlite3 (WAL mode enabled) for fast, zero-configuration persistence of characters, inventories, quests, and housing placements.

## 2. Core Technical Subsystems

### A. First-Person Viewmodel & Tactical Rig

- **Dual-Camera / Viewmodel Layer:** Render the player's first-person hands, Grapple Gauntlet, Runic Choir Lantern, and weapons on a dedicated near-clip render pass (or high-priority camera layer) so arms never clip into canyon walls when standing close to cover.
- **Spring-Damper Procedural Sway:** Layer subtle procedural movement (head-bob, jump landing dip, grapple pull tilt, and melee swing recoil) on top of .glb keyframe animations.
- **Raycast Interaction System:** Center-screen raycasts check within 3m for loot/NPCs and up to 35m for tagged Grapple Anchor Nodes (tag: "grapple_point"), dynamically updating the reticle icon.

### B. Authoritative Combat & Active Stagger State Machine

Every enemy entity on the server runs a deterministic state machine:

**States:** IDLE → AGGRO → WINDUP → ATTACK → BREACHED → DEAD.

**Stagger Calculation:**

- Light Attack: 1.0x HP damage, 0.5x Stagger damage.
- Heavy Attack (charged): 0.6x HP damage, 2.5x Stagger damage.
- Resonance Tuning Fork / Shield Bash: 0.3x HP damage, 3.5x Stagger damage.

**Breach Window:** When currentStagger >= maxStagger, the server broadcasts ENTITY_BREACHED (duration: 4000ms), applies a 1.2x incoming damage multiplier, and enables the contextual E Execute prompt for nearby players.

### C. Vertical Terrain & Spatial Interest Management

- **Chunked Heightmap + Hero Landmarks:** Use deterministic seeded noise for rolling Amber Steppe terrain (64m x 64m chunks) combined with hand-placed .glb hero structures (the Cairn-Reach Aqueduct, Warden's Overlook, and Singing Pillars).
- **Spatial Grid (Area of Interest):** Divide each tier into 128m x 128m grid cells. Players only receive state updates for entities and other players within their current cell and the 8 adjacent cells, keeping bandwidth low even with 50+ players in a zone.

### D. Modular Database Schema (SQLite)

| Table | Key Columns | Purpose |
| --- | --- | --- |
| users | id, username, password_hash, created_at | Login & session authentication |
| characters | id, user_id, name, race, class, level, xp, tier_id, x, y, z | Core player state & world coordinates |
| inventory | id, char_id, item_template_id, slot_index, quantity, sockets_json | Equipped gear, tools, and socketed runes |
| quests | char_id, quest_id, stage, progress_json, completed | Tracks Echoes in the Amber progression |
| sanctums | char_id, theme_id, props_json, permissions | Stores placed furniture, workbenches, and lighting |

## 3. Recommended Project Folder Structure

```text
aetherfall-mmo/
|-- client/
|   |-- index.html
|   +-- src/
|       |-- main.js                 # Engine boot, asset preloader, WebSocket init
|       |-- player/
|       |   |-- fpController.js     # WASD, jump, Geyser-Flask, Glider-Cloak
|       |   |-- grappleSystem.js    # Anchor raycast, cable line renderer, pull physics
|       |   +-- viewmodelRig.js     # First-person hands, weapon/lantern animations
|       |-- combat/
|       |   |-- combatClient.js     # Attack inputs, hit markers, Stagger/Breach VFX
|       |   +-- hudManager.js       # Vitals arcs, target Stagger bar, 1-9/Q/E/R hotbar
|       |-- world/
|       |   |-- chunkManager.js     # Terrain streaming & Cairn-Reach static landmarks
|       |   +-- entitySync.js       # Remote player & NPC position interpolation
|       +-- ui/
|           |-- inventoryUI.js      # Drag-and-drop slots & Core Socket tuning
|           +-- sanctumEditor.js    # First-person housing prop placement ghost
|-- server/
|   |-- server.js                   # Express static host + WebSocket server
|   |-- gameLoop.js                 # 20 Hz simulation tick & spatial grid broadcast
|   |-- combatEngine.js             # Hit validation, Stagger math, Breach state machine
|   |-- aiController.js             # Cinder-Stalker pack AI & Amber Sentinel boss logic
|   |-- eventDirector.js            # Harmonic Convergence public event scheduler
|   +-- db.js                       # SQLite initialization & async save queue
|-- shared/
|   |-- constants.js                # Tick rates, physics constants, opcodes
|   +-- items.js                    # Weapons, Aether-tools, tuning cores, loot tables
+-- assets/
    |-- models/                     # Humanoid rigs, Cinder-Stalker, Sentinel, Aqueduct
    +-- audio/                      # Tuning fork chimes, grapple winch, ambient wind
```

## 4. Phased Prototype Roadmap (8-Week Vertical Slice)

The goal of this roadmap is a playable vertical slice covering Cairn-Reach, the Amber Steppe borderlands, and the Singing Pillars Convergence event (Levels 1–10).

### Phase 1: First-Person Movement & Traversal Sandbox (Weeks 1–2)

**Deliverable:** Local 3D scene with greybox Cairn-Reach Overlook and broken aqueduct pillars.

**Key Tasks:**

- Implement first-person WASD movement, mouse-look, sprint, and slope collision.
- Build the Grapple Gauntlet (raycast to anchor points, rendered brass cable, spring-velocity pull) and Glider-Cloak (reduced gravity + forward lift when holding Space mid-air).
- Add the first-person viewmodel hands holding the Runic Choir Lantern and Grapple Gauntlet.

### Phase 2: Multiplayer Sync & Persistence Foundation (Weeks 3–4)

**Deliverable:** Multiple browser tabs connecting to Node.js, seeing each other move and grapple in real time, with persistent accounts.

**Key Tasks:**

- Stand up Node.js WebSocket server with 20 Hz tick rate and client-side prediction/reconciliation.
- Integrate SQLite (users, characters, inventory) with login/character creation (selecting one of the 4 races and 4 classes).
- Load humanoid .glb avatars for remote players so animations (run, jump, grapple, block) sync smoothly.

### Phase 3: Active Stagger Combat & Minimal HUD (Weeks 5–6)

**Deliverable:** Functional combat loop against Cinder-Stalkers and a Training Construct.

**Key Tasks:**

- Build the HUD: top-left concentric vitals, top-center Target Health + Stagger Meter, bottom hotbar (1–9, Q, E, R), and bottom-right combat log.
- Implement Light/Heavy attacks, Right-Click timed blocking, Stagger accumulation, Breach stun state, and contextual E Execute finishers.
- Implement starter class abilities for Vanguard, Arcanist, Waystalker, and Artificer.

### Phase 4: Cairn-Reach Hub, Sanctum Housing & Public Convergence Boss (Weeks 7–8)

**Deliverable:** Complete playable vertical slice from spawning on the cliff trail to fighting The Fractured Colossus with other players.

**Key Tasks:**

- Populate Cairn-Reach with key NPCs (Quartermaster Mira Vance, Archivist Oakhaven), a crafting anvil for socketed gear, and the Echoes in the Amber quest tracker.
- Add a starter Wayfinder Sanctum instance where players can place a hearth, chest, and workbench in first-person.
- Script the Harmonic Convergence public event at the Singing Pillars, spawning The Fractured Colossus (Amber Sentinel boss with breakable glowing leg joints).
