# KNOCK - Horror Game

A first-person horror game where you must identify and manage visitors at your door using a peephole and light switch mechanic.

![Game Status](https://img.shields.io/badge/status-MVP-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## 🎮 Game Overview

You are in your sparsely furnished apartment. Someone is knocking at your door. You have a peephole to see who it is, but you must be careful - not everyone is who they appear to be.

## 🎯 Objective

**Survive 10 encounters** by correctly identifying who to let in and who to keep out.

## 👥 Characters

### Dave (Your Neighbor)
- **Appearance**: Normal human with regular dark eyes
- **Behavior**: Lost his keys and needs to come in
- **Rule**: MUST let him in within 10 seconds or you DIE
- **Safety**: Safe to let in

### Mimic
- **Appearance**: Looks exactly like Dave but has RED EYES
- **Behavior**: Pretends to be Dave
- **Rule**: DO NOT let in - will kill you
- **Detection**: Red eyes are ONLY visible when the light is ON

### Stalker
- **Appearance**: Black shadowy figure with red glowing eyes
- **Behavior**: Silent and menacing
- **Rule**: Will kill you if you VIEW it with the light ON
- **Strategy**: Keep light OFF when opening peephole if you suspect Stalker

## 🎮 Controls

| Key | Action |
|-----|--------|
| **L** | Toggle light switch (ON/OFF) |
| **SPACE** | Open/Close peephole |
| **E** | Open door (let visitor in) |
| **ESC** | Close peephole / Skip encounter |

## 🧠 Strategy & Mechanics

### Critical Rules

1. **Light MUST be set BEFORE opening the peephole**
   - You cannot change the light while the peephole is open
   - Plan ahead!

2. **Mimic Detection**
   - Keep light ON to see red eyes
   - If eyes are red = Mimic (DO NOT LET IN)
   - If eyes are normal = Dave (LET IN QUICKLY)

3. **Stalker Survival**
   - Keep light OFF when opening peephole
   - If you see a black figure with red eyes, you're safe (light is off)
   - NEVER view Stalker with light ON or instant death
   - Don't let Stalker in

4. **The Dilemma**
   - Mimic needs light ON to identify (red eyes)
   - Stalker needs light OFF to survive viewing
   - You must guess which one is at the door!

### Winning Strategy

1. **Listen to the knock** (all sound the same currently - future update)
2. **Make your light decision** - Are you betting on Mimic or Stalker?
3. **Open peephole** and identify:
   - Light ON: Can see if Dave has red eyes (Mimic) or normal eyes (Dave)
   - Light OFF: Safe from Stalker, but can't tell Dave from Mimic
4. **Make your choice**:
   - Let Dave in immediately (within 10 seconds)
   - Don't let Mimic or Stalker in (just wait - they'll leave)

### Death Conditions

- ❌ Don't let Dave in within 10 seconds
- ❌ Let Mimic in (opened door to red-eyed Dave)
- ❌ Let Stalker in (opened door to black figure)
- ❌ View Stalker with light ON

## 🚀 How to Run

### Option 1: Simple Local Server (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have npx)
npx http-server -p 8000
```

Then open your browser to: `http://localhost:8000`

### Option 2: Direct File Access

Simply open `index.html` in your web browser (double-click the file).

**Note**: Some browsers may block certain features when running from `file://` protocol. Using a local server is recommended.

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
CarMcB-Knock/
├── index.html          # Main HTML file
├── style.css           # Game styling
├── game.js             # Complete game logic
├── README.md           # This file
└── GAME_PLAN.md        # Development plan and roadmap
```

## 🎨 Features

### Implemented in MVP v1.0

✅ **Core Gameplay**
- First-person 3D perspective using Three.js
- Sparsely furnished apartment room
- Functional door with peephole mechanic
- Light switch system (affects hallway visibility)
- 10 randomized encounters per game

✅ **Characters**
- Dave (safe neighbor with 10-second timer)
- Mimic (dangerous Dave lookalike with red eyes)
- Stalker (shadow figure that kills if viewed with light on)

✅ **Game Systems**
- Win/Loss condition tracking
- Timer system for Dave encounters
- Character identification mechanics
- Sound effects (knock, door, light switch, peephole)
- Game over and victory screens
- Restart functionality

✅ **UI/UX**
- Instructions screen
- HUD with encounter counter
- Light status indicator
- Peephole status indicator
- Timer display (when Dave appears)
- Notification system
- Responsive design

## 🎯 Future Enhancements

See `GAME_PLAN.md` for the complete roadmap. Planned features include:

### Phase 1: Polish & Content
- Enhanced graphics and animations
- Advanced audio (ambient sounds, voice lines)
- Additional characters with unique mechanics
- Better lighting effects

### Phase 2: Gameplay Expansion
- Multiple room layouts
- Night progression system (survive multiple nights)
- New mechanics (phone calls, multiple doors, power management)
- Clues and hints system

### Phase 3: Replayability
- Randomized character variants
- Story mode with narrative
- Challenge modes (endless, speed-run)
- Achievement system

### Phase 4: Meta Features
- Settings menu (graphics, audio, difficulty)
- Tutorial system
- Analytics and balancing
- Potential multiplayer

## 🐛 Known Issues

- Character models are basic geometric shapes (intentional for MVP)
- Sound effects are synthesized (no audio files yet)
- All visitor knocks sound the same
- No difficulty progression

## 🛠️ Technical Details

- **Engine**: Three.js (r128)
- **Language**: Vanilla JavaScript (ES6+)
- **Rendering**: WebGL
- **Audio**: Web Audio API
- **No build tools required** - runs directly in browser

## 📝 Development Notes

### Game Balance
- 10 encounters provides ~5-10 minutes of gameplay
- Dave has a 33% spawn chance (equal to other characters)
- Timer creates urgency and prevents overthinking
- Light mechanic creates risk/reward decisions

### Design Philosophy
- Minimalist MVP approach
- Focus on core mechanics over graphics
- Easy to test and iterate
- Web-based for maximum accessibility

## 🤝 Contributing

This is currently a MVP/prototype. Feedback and suggestions welcome!

## 📄 License

This project is part of a game development learning exercise.

---

**Working Title**: KNOCK
**Version**: 1.0.0 (MVP)
**Last Updated**: December 2024

Enjoy the game, and remember: **Not everyone is who they appear to be.** 👁️
