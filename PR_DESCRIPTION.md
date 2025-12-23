# Horror Game MVP - KNOCK

## 🎮 Overview

This PR introduces a complete MVP for the horror game "KNOCK" - a first-person horror experience where players must identify visitors at their door using strategic light management and observation.

## 🎯 Game Features

### Core Gameplay
- **First-person 3D apartment environment** built with Three.js
- **Peephole camera shutter mechanic** (SPACE to open/close)
- **Light switch system** affecting visibility (L key)
- **Door opening mechanic** (E key)
- **10 randomized encounters** per game session

### Characters
1. **Dave** - Your neighbor who lost his keys
   - Safe to let in
   - Must be let in within 10 seconds or you die
   - Has normal dark eyes

2. **Mimic** - Dangerous impostor
   - Looks exactly like Dave but has RED EYES
   - Red eyes only visible when light is ON
   - DO NOT let in - instant death

3. **Stalker** - Shadow creature
   - Black figure with red glowing eyes
   - Kills you if you VIEW it with light ON
   - Must keep light OFF when opening peephole
   - DO NOT let in

### Game Mechanics
- **Strategic Light Management**: Light must be set BEFORE opening peephole
- **The Core Dilemma**:
  - Mimic needs light ON to identify (see red eyes)
  - Stalker requires light OFF to survive viewing
  - You must guess which is at the door!
- **Win Condition**: Survive all 10 encounters
- **Multiple Death Conditions**: Don't let Dave in (timer), let Mimic in, let Stalker in, view Stalker with light ON

## 🚀 Deployment Configurations

### Auto-deployment ready for multiple platforms:

✅ **GitHub Pages**
- GitHub Actions workflow configured
- Auto-deploys on every push
- File: `.github/workflows/deploy.yml`

✅ **Netlify**
- One-click deploy ready
- Configuration with security headers
- File: `netlify.toml`

✅ **Vercel**
- One-click deploy ready
- Configuration included
- File: `vercel.json`

✅ **Any static hosting platform** - No build process required!

## 📦 Files Added/Modified

### Game Files
- `index.html` - Main game page with complete UI (3.5KB)
- `style.css` - Horror-themed styling with red/black theme (3.6KB)
- `game.js` - Complete game logic with Three.js (22KB)
- `README.md` - Comprehensive documentation and gameplay instructions (6.6KB)

### Deployment Files
- `.github/workflows/deploy.yml` - GitHub Actions auto-deployment workflow
- `netlify.toml` - Netlify configuration with security headers
- `vercel.json` - Vercel configuration

### Documentation
- `GAME_PLAN.md` - Complete development roadmap with 4 expansion phases (8.1KB)
- Full gameplay strategy guide in README
- Deployment guides for multiple platforms

## 🎨 Technical Details

- **Engine**: Three.js (r128) via CDN
- **Language**: Vanilla JavaScript (ES6+)
- **Audio**: Web Audio API (synthesized sound effects)
- **No build tools required** - Pure static site
- **Responsive design** - Works on all screen sizes
- **Browser compatibility**: All modern browsers

### Security Features
- X-Frame-Options: DENY (prevents clickjacking)
- X-Content-Type-Options: nosniff (prevents MIME sniffing)
- Referrer-Policy: no-referrer (privacy)

## 🧪 Testing Instructions

### Local Testing
```bash
# Clone the repository
git clone https://github.com/rolandbough/CarMcB-Knock.git
cd CarMcB-Knock

# Start a simple web server (choose one):
python -m http.server 8000
# or
python3 -m http.server 8000

# Open browser to:
http://localhost:8000
```

### Controls
- **L** - Toggle light ON/OFF
- **SPACE** - Open/Close peephole
- **E** - Open door (let visitor in)
- **ESC** - Close peephole / Skip encounter

### Expected Behavior
1. Game starts with instructions screen
2. Click "START GAME" to begin
3. Hear knock sound when visitor arrives
4. Use light switch strategically before opening peephole
5. Identify visitor and decide whether to let them in
6. Survive 10 encounters to win

## 📋 Future Roadmap

See `GAME_PLAN.md` for complete expansion plans:

### Phase 1: Polish & Content
- Enhanced graphics and animations
- Advanced audio (ambient, voice lines)
- Additional characters (5-10 more)
- Improved lighting effects

### Phase 2: Gameplay Expansion
- Multiple room layouts
- Night progression system
- New mechanics (phone, multiple doors, power management)
- Clues and hints system

### Phase 3: Replayability
- Randomized character variants
- Story mode with narrative
- Challenge modes (endless, speed-run)
- Achievement system

### Phase 4: Meta Features
- Settings menu (graphics, audio, controls)
- Tutorial system
- Analytics and balancing
- Potential multiplayer co-op

## ✅ Checklist

- [x] Core game mechanics implemented
- [x] All 3 characters working correctly
- [x] Win/loss conditions functional
- [x] UI/UX complete with instructions
- [x] Sound effects implemented
- [x] Auto-deployment configured
- [x] README documentation complete
- [x] Code tested locally
- [x] No console errors
- [x] Responsive design verified

## 🎯 Post-Merge Actions

After merging this PR:

1. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"
   - Game will auto-deploy at: `https://rolandbough.github.io/CarMcB-Knock/`

2. **Test the live deployment**:
   - Verify all game mechanics work
   - Check sound effects
   - Test on multiple browsers

3. **Share and gather feedback**:
   - Game is ready for playtesting
   - Gather user feedback for future iterations

## 📸 Screenshots

The game features:
- Atmospheric first-person apartment view
- Minimalist 3D character models
- Horror-themed red and black UI
- Clear HUD with timer and status indicators
- Professional instructions screen

---

## 🚀 Ready to Deploy!

This is a complete, playable MVP that demonstrates all core game mechanics. The game is fully functional, documented, and ready for deployment to any static hosting platform.

**Total Development Time**: ~1 day
**Code Quality**: Production-ready
**Documentation**: Comprehensive
**Deployment**: Fully automated

Let's ship it! 🎮👻
