# Horror Game "Not" - Development Plan

## Game Concept Summary
A first-person horror game where the player must identify and manage visitors at their door using a peephole and light switch mechanic.

## Core Mechanics
1. **Peephole** - Opens/closes like a camera shutter to view who's at the door
2. **Light Switch** - Must be set BEFORE opening peephole
3. **Door** - Can be opened to let visitors in (or not)
4. **Time Pressure** - Some decisions must be made quickly

## Characters
1. **Dave** - Human, MUST let in within 10 seconds or die
2. **Mimic** - Looks like Dave but has red eyes (visible only when light ON) - DO NOT let in
3. **Stalker** - Black figure with red eyes, kills you if light is ON when viewing
4. **David** - Neighbor who lost keys, let in only if eyes are not red

---

## CLARIFYING QUESTIONS (Please answer before development)

### 1. Technology Stack
- **Question**: What platform should this be built for?
  - Option A: Web-based (HTML5/JavaScript/Three.js) - Most accessible, runs in browser
  - Option B: Unity (cross-platform, professional engine)
  - Option C: Godot (open-source, good for 2D/3D)
  - Option D: Unreal Engine (high-end graphics)
  - **Recommendation**: Web-based for MVP (fastest to test and share)

### 2. Dave vs David - Character Clarity
- **Question**: Are "Dave" and "David" the same person or different?
  - Current description suggests two separate characters, but both seem friendly
  - Should David also have a 10-second timer?
  - Can both appear in the same game session?

### 3. Character Spawning & Game Flow
- **Question**: How do characters appear?
  - Random order or scripted sequence?
  - How many encounters per game session?
  - Time between encounters?
  - Does the game have rounds/waves or one continuous session?

### 4. Dave's Timer Mechanics
- **Question**: How does the 10-second timer work?
  - Does timer start when Dave knocks/appears?
  - Can player open peephole, close it, and timer keeps running?
  - What happens after successfully letting Dave in? (Game continues? Win condition?)
  - If timer expires: instant game over or does Dave become hostile?

### 5. Light Switch Details
- **Question**: What exactly does the light control?
  - Hallway light outside the door?
  - Room light that affects peephole visibility?
  - Can player toggle it unlimited times or is there a cooldown/limitation?

### 6. Victory & Failure Conditions
- **Question**: How does the player win?
  - Survive X number of encounters?
  - Survive X minutes?
  - Successfully let in all "safe" characters?
  - Just don't die?

- **Question**: What are all the ways to lose?
  - Don't let Dave in within 10 seconds ✓
  - Open door to Mimic ✓
  - View Stalker with light ON ✓
  - Any others?

### 7. Mimic Behavior
- **Question**: What should player do when they identify Mimic?
  - Just don't open the door?
  - Does Mimic leave after some time?
  - Does Mimic try to trick player (knocking, talking)?

### 8. Stalker Behavior
- **Question**: Stalker interaction details:
  - If light is OFF when opening peephole and you see Stalker, are you safe?
  - Should player close peephole immediately and wait for Stalker to leave?
  - How long does Stalker stay at the door?
  - Can Stalker break in if light stays on too long?

### 9. Graphics & Art Style
- **Question**: What visual style for MVP?
  - 3D first-person (more immersive but more work)
  - 2D perspective (faster to develop)
  - Pixel art, low-poly, or realistic?
  - **Recommendation**: Simple 3D first-person for MVP

### 10. Audio
- **Question**: Should MVP include sound?
  - Door knocking sounds
  - Ambient horror atmosphere
  - Character voices/breathing
  - **Recommendation**: Basic sound effects for MVP (knocking, door, light switch)

### 11. MVP Scope
- **Question**: What should be in the MVP?
  - How many encounters/rounds?
  - Should there be a tutorial/instructions screen?
  - Should there be a main menu or jump straight into game?
  - Score/survival time tracking?

---

## PROPOSED MVP FEATURES (pending your answers above)

### Included in MVP:
- [ ] Single room environment (sparsely furnished)
- [ ] Door with functional peephole (open/close mechanic)
- [ ] Light switch (toggle on/off)
- [ ] All 4 characters (Dave, Mimic, Stalker, David)
- [ ] Basic character identification (red eyes visible when light is on)
- [ ] Timer for Dave (10 seconds)
- [ ] Win/Loss conditions
- [ ] Simple UI (timer display, instructions)
- [ ] Basic sound effects (knocking, door, light switch)
- [ ] Restart capability

### NOT Included in MVP (for full version):
- Advanced graphics/animations
- Multiple rooms/environments
- Difficulty levels
- Scoring/leaderboard system
- Story/narrative elements
- Additional characters
- Voice acting
- Advanced AI behaviors
- Save system

---

## PROPOSED FULL GAME EXPANSION PLAN (from MVP)

### Phase 1: Polish & Content (Post-MVP)
1. **Enhanced Graphics**
   - Better character models and animations
   - Improved room details and atmosphere
   - Particle effects (dust, shadows)
   - Post-processing (film grain, vignette)

2. **Advanced Audio**
   - Ambient soundscapes
   - Character voice lines
   - Dynamic music system
   - 3D positional audio

3. **Additional Characters** (5-10 more)
   - "The Twins" - Two identical figures, only one is safe
   - "The Whisperer" - Can only be identified by sound
   - "The Child" - Appears innocent but is dangerous
   - "The Postman" - Sometimes safe, sometimes Mimic
   - Variable character behaviors

### Phase 2: Gameplay Expansion
4. **Multiple Rooms/Environments**
   - Different apartment layouts
   - Hotel variations
   - Each with unique challenges

5. **Progression System**
   - Night system (survive multiple nights)
   - Increasing difficulty
   - Unlock new challenges

6. **New Mechanics**
   - Phone system (characters can call)
   - Multiple doors to monitor
   - Power management (light has limited power)
   - Clues system (notes, messages)
   - Security camera feeds

### Phase 3: Replayability & Content
7. **Randomization**
   - Random character appearance order
   - Random character variants
   - Random room layouts

8. **Story Mode**
   - Narrative progression
   - Character backstories
   - Multiple endings based on choices
   - Unlockable lore documents

9. **Challenge Modes**
   - Endless mode
   - Speed-run mode
   - Specific character challenges
   - Custom difficulty modifiers

### Phase 4: Meta Features
10. **UI/UX Polish**
    - Main menu with options
    - Settings (graphics, audio, controls)
    - Tutorial system
    - Achievement system

11. **Analytics & Balance**
    - Track player performance
    - Balance difficulty based on data
    - Add hints/help for struggling players

12. **Multiplayer (Optional Future)**
    - Co-op: Players take turns at door
    - Competitive: Who survives longest

---

## TECHNICAL ARCHITECTURE (Proposed)

### For Web-Based MVP:
```
/src
  /game
    - main.js (game loop, initialization)
    - scene.js (3D scene setup)
    - characters.js (character definitions and behavior)
    - gameState.js (state management)
  /ui
    - hud.js (timer, instructions)
    - menu.js (start/restart)
  /audio
    - soundManager.js
  /assets
    /models (3D models)
    /textures
    /sounds
/public
  - index.html
  - styles.css
```

### Key Technologies (if web-based):
- Three.js (3D rendering)
- Vanilla JavaScript or lightweight framework
- Web Audio API
- HTML5 Canvas

---

## ESTIMATED DEVELOPMENT TIMELINE

### MVP (Minimum Viable Product):
- Core mechanics: 2-3 days
- Character implementation: 1-2 days
- UI/UX basic: 1 day
- Testing & bug fixes: 1-2 days
- **Total MVP: ~5-8 days of development**

### Full Game (from MVP):
- Phase 1 (Polish): 2-3 weeks
- Phase 2 (Gameplay): 3-4 weeks
- Phase 3 (Content): 2-3 weeks
- Phase 4 (Meta): 1-2 weeks
- **Total Full Development: ~8-12 weeks from MVP**

---

## QUESTIONS FOR APPROVAL

Please answer the numbered questions (1-11) above so I can:
1. Choose the right technology stack
2. Implement correct game mechanics
3. Build the MVP according to your vision
4. Plan the full game expansion properly

Once you approve the approach and answer the questions, I'll begin development immediately!
