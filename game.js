// ===========================
// GAME CONSTANTS & CONFIGURATION
// ===========================
const TOTAL_ENCOUNTERS = 10;
const DAVE_TIMER_DURATION = 10; // seconds

const CharacterType = {
    DAVE: 'dave',
    MIMIC: 'mimic',
    STALKER: 'stalker'
};

// ===========================
// GAME STATE
// ===========================
let gameState = {
    currentEncounter: 0,
    isGameActive: false,
    lightOn: false,
    peepholeOpen: false,
    currentVisitor: null,
    daveTimer: null,
    daveTimeRemaining: 0,
    encountersCompleted: 0,
    canOpenPeephole: true,
    doorOpen: false
};

// ===========================
// THREE.JS SETUP
// ===========================
let scene, camera, renderer;
let room, door, peephole, visitor;
let ambientLight, hallwayLight;

function initThreeJS() {
    console.log('Initializing Three.js...');
    console.log('THREE available:', typeof THREE !== 'undefined');

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 30);
    console.log('Scene created');

    // Camera (first-person view) - positioned close to door
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1.6, 0); // Eye level, inside the room
    camera.lookAt(0, 1.6, 7.2); // Look directly at the door

    // Renderer
    const canvas = document.getElementById('game-canvas');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // Lights
    ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Hallway light (controlled by switch) - positioned outside door
    hallwayLight = new THREE.PointLight(0xffffcc, 0, 15);
    hallwayLight.position.set(0, 2.5, 9);
    hallwayLight.castShadow = true;
    scene.add(hallwayLight);

    // Room light
    const roomLight = new THREE.PointLight(0xffddaa, 0.3, 15);
    roomLight.position.set(0, 2.5, -5);
    scene.add(roomLight);

    console.log('Creating room elements...');
    createRoom();
    console.log('Room created');
    createDoor();
    console.log('Door created');
    createPeephole();
    console.log('Peephole created');
    createLightSwitch();
    console.log('Light switch created');
    createHallway();
    console.log('Hallway created');
    console.log('Scene objects:', scene.children.length);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    console.log('Three.js initialization complete!');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===========================
// ROOM CREATION
// ===========================
function createRoom() {
    const roomGroup = new THREE.Group();

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(10, 15);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a2f2f,
        roughness: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Ceiling
    const ceiling = new THREE.Mesh(floorGeometry, floorMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3;
    roomGroup.add(ceiling);

    // Left wall
    const wallGeometry = new THREE.PlaneGeometry(15, 3);
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a3f3f,
        roughness: 0.9
    });
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-5, 1.5, 0);
    roomGroup.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(5, 1.5, 0);
    roomGroup.add(rightWall);

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(10, 3);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 1.5, -7.5);
    roomGroup.add(backWall);

    // Add some sparse furniture
    createFurniture(roomGroup);

    scene.add(roomGroup);
}

function createFurniture(roomGroup) {
    // Simple bed
    const bedGeometry = new THREE.BoxGeometry(2, 0.3, 3);
    const bedMaterial = new THREE.MeshStandardMaterial({ color: 0x5a4a4a });
    const bed = new THREE.Mesh(bedGeometry, bedMaterial);
    bed.position.set(-3, 0.15, -5);
    roomGroup.add(bed);

    // Small table
    const tableGeometry = new THREE.BoxGeometry(1, 0.1, 1);
    const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x4a3a2a });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(3, 0.6, -3);
    roomGroup.add(table);

    // Table leg
    const legGeometry = new THREE.BoxGeometry(0.1, 0.6, 0.1);
    const leg = new THREE.Mesh(legGeometry, tableMaterial);
    leg.position.set(3, 0.3, -3);
    roomGroup.add(leg);
}

// ===========================
// DOOR CREATION
// ===========================
function createDoor() {
    door = new THREE.Group();

    // Door frame
    const frameGeometry = new THREE.BoxGeometry(2.2, 2.4, 0.3);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x2a1a1a });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 1.2, 7.35);
    door.add(frame);

    // Door itself
    const doorGeometry = new THREE.BoxGeometry(2, 2.2, 0.2);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2a2a });
    const doorPanel = new THREE.Mesh(doorGeometry, doorMaterial);
    doorPanel.position.set(0, 1.1, 7.2);
    doorPanel.name = 'doorPanel';
    door.add(doorPanel);

    // Peephole hole on door (dark circle showing the hole)
    const peepholeHoleGeometry = new THREE.CircleGeometry(0.06, 32);
    const peepholeHoleMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000
    });
    const peepholeHole = new THREE.Mesh(peepholeHoleGeometry, peepholeHoleMaterial);
    peepholeHole.position.set(0, 1.6, 7.21);
    peepholeHole.name = 'peepholeHole';
    door.add(peepholeHole);

    // Peephole metal ring around hole
    const peepholeRingGeometry = new THREE.RingGeometry(0.06, 0.09, 32);
    const peepholeRingMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.9,
        roughness: 0.2
    });
    const peepholeRing = new THREE.Mesh(peepholeRingGeometry, peepholeRingMaterial);
    peepholeRing.position.set(0, 1.6, 7.22);
    door.add(peepholeRing);

    scene.add(door);
}

// ===========================
// LIGHT SWITCH
// ===========================
function createLightSwitch() {
    const switchGroup = new THREE.Group();

    // Switch plate (on the wall next to door)
    const plateGeometry = new THREE.BoxGeometry(0.15, 0.25, 0.02);
    const plateMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        roughness: 0.5
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    switchGroup.add(plate);

    // Switch toggle
    const toggleGeometry = new THREE.BoxGeometry(0.08, 0.12, 0.03);
    const toggleMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.4
    });
    const toggle = new THREE.Mesh(toggleGeometry, toggleMaterial);
    toggle.position.z = 0.025;
    toggle.name = 'lightSwitchToggle';
    switchGroup.add(toggle);

    // Position switch on wall to the right of door
    switchGroup.position.set(1.5, 1.5, 6.8);
    switchGroup.rotation.y = 0;

    scene.add(switchGroup);
}

// ===========================
// HALLWAY (Outside the door)
// ===========================
function createHallway() {
    const hallwayGroup = new THREE.Group();

    // Hallway floor (visible through peephole)
    const hallwayFloorGeometry = new THREE.PlaneGeometry(5, 8);
    const hallwayFloorMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2520,
        roughness: 0.9
    });
    const hallwayFloor = new THREE.Mesh(hallwayFloorGeometry, hallwayFloorMaterial);
    hallwayFloor.rotation.x = -Math.PI / 2;
    hallwayFloor.position.set(0, 0, 10);
    hallwayFloor.receiveShadow = true;
    hallwayGroup.add(hallwayFloor);

    // Hallway ceiling
    const hallwayCeiling = new THREE.Mesh(hallwayFloorGeometry, hallwayFloorMaterial);
    hallwayCeiling.rotation.x = Math.PI / 2;
    hallwayCeiling.position.set(0, 3, 10);
    hallwayGroup.add(hallwayCeiling);

    // Hallway back wall
    const hallwayBackWallGeometry = new THREE.PlaneGeometry(5, 3);
    const hallwayWallMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3530,
        roughness: 0.9
    });
    const hallwayBackWall = new THREE.Mesh(hallwayBackWallGeometry, hallwayWallMaterial);
    hallwayBackWall.position.set(0, 1.5, 14);
    hallwayGroup.add(hallwayBackWall);

    // Hallway left wall
    const hallwaySideWallGeometry = new THREE.PlaneGeometry(8, 3);
    const hallwayLeftWall = new THREE.Mesh(hallwaySideWallGeometry, hallwayWallMaterial);
    hallwayLeftWall.rotation.y = Math.PI / 2;
    hallwayLeftWall.position.set(-2.5, 1.5, 10);
    hallwayGroup.add(hallwayLeftWall);

    // Hallway right wall
    const hallwayRightWall = new THREE.Mesh(hallwaySideWallGeometry, hallwayWallMaterial);
    hallwayRightWall.rotation.y = -Math.PI / 2;
    hallwayRightWall.position.set(2.5, 1.5, 10);
    hallwayGroup.add(hallwayRightWall);

    scene.add(hallwayGroup);
}

// ===========================
// PEEPHOLE SYSTEM
// ===========================
function createPeephole() {
    peephole = new THREE.Group();

    // Peephole "shutter" cover - black circle that blocks view when closed
    const shutterGeometry = new THREE.CircleGeometry(1.5, 32);
    const shutterMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
    });
    const shutter = new THREE.Mesh(shutterGeometry, shutterMaterial);
    shutter.position.set(0, 1.6, 0.5); // Close to camera when in room
    shutter.name = 'peepholeShutter';
    peephole.add(shutter);

    // Vignette effect when peephole is open (circular frame)
    const vignetteGeometry = new THREE.RingGeometry(0.4, 3.0, 64);
    const vignetteMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.98
    });
    const vignette = new THREE.Mesh(vignetteGeometry, vignetteMaterial);
    vignette.position.set(0, 1.6, 7.0); // In front of face when looking through peephole
    vignette.visible = false;
    vignette.name = 'peepholeVignette';
    peephole.add(vignette);

    scene.add(peephole);
}

function togglePeephole() {
    if (!gameState.isGameActive || gameState.doorOpen) return;

    gameState.peepholeOpen = !gameState.peepholeOpen;

    const shutter = scene.getObjectByName('peepholeShutter');
    const vignette = scene.getObjectByName('peepholeVignette');

    if (shutter) {
        shutter.visible = !gameState.peepholeOpen;
    }

    if (vignette) {
        vignette.visible = gameState.peepholeOpen;
    }

    // Zoom camera significantly when peephole opens for close-up view
    if (gameState.peepholeOpen) {
        camera.position.z = 6.9; // Move very close to peephole
        camera.fov = 50; // Narrow FOV for peephole effect
        camera.lookAt(0, 1.6, 8.5); // Look at character position through peephole
    } else {
        camera.position.z = 0; // Back to room position
        camera.fov = 75; // Normal FOV
        camera.lookAt(0, 1.6, 7.2); // Look at door
    }
    camera.updateProjectionMatrix();

    updatePeepholeUI();
    playSound('peephole');

    if (gameState.peepholeOpen && gameState.currentVisitor) {
        checkStalkerDeath();
    }
}

function checkStalkerDeath() {
    if (gameState.currentVisitor.type === CharacterType.STALKER && gameState.lightOn) {
        gameOver("The Stalker killed you! Never look at it with the light ON!");
    }
}

// ===========================
// LIGHT SYSTEM
// ===========================
function toggleLight() {
    if (!gameState.isGameActive) return;

    gameState.lightOn = !gameState.lightOn;

    // Update hallway light intensity - much brighter when on!
    hallwayLight.intensity = gameState.lightOn ? 3.0 : 0;

    // Visual feedback: move the light switch toggle
    const toggle = scene.getObjectByName('lightSwitchToggle');
    if (toggle) {
        // Rotate toggle up when on, down when off
        toggle.rotation.z = gameState.lightOn ? 0.3 : -0.3;
        // Change toggle color to show state
        toggle.material.color.setHex(gameState.lightOn ? 0xffff99 : 0xcccccc);
    }

    updateLightUI();
    playSound('switch');

    // If peephole is open and stalker is there, check death condition
    if (gameState.peepholeOpen && gameState.currentVisitor) {
        checkStalkerDeath();
    }
}

// ===========================
// CHARACTER SYSTEM
// ===========================
function createVisitor(type) {
    if (visitor) {
        scene.remove(visitor);
    }

    visitor = new THREE.Group();

    if (type === CharacterType.STALKER) {
        // Stalker: Black figure with red eyes (larger and more menacing)
        const bodyGeometry = new THREE.BoxGeometry(1.0, 2.0, 0.4);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x050505,
            roughness: 0.1,
            metalness: 0.1
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 1.0, 0);
        visitor.add(body);

        // Head (more rounded)
        const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const head = new THREE.Mesh(headGeometry, bodyMaterial);
        head.position.set(0, 2.15, 0);
        visitor.add(head);

        // Red glowing eyes (bigger and brighter)
        const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const eyeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            emissive: 0xff0000,
            emissiveIntensity: 3
        });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.12, 2.2, 0.25);
        visitor.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.12, 2.2, 0.25);
        visitor.add(rightEye);

    } else {
        // Dave and Mimic: Human-like figure (bigger and more visible)
        const bodyGeometry = new THREE.BoxGeometry(0.8, 1.8, 0.4);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a6a8a,
            roughness: 0.7
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 0.9, 0);
        visitor.add(body);

        // Head (bigger)
        const headGeometry = new THREE.BoxGeometry(0.45, 0.45, 0.4);
        const headMaterial = new THREE.MeshStandardMaterial({
            color: 0xdaa588,
            roughness: 0.8
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 2.0, 0);
        visitor.add(head);

        // Eyes (much bigger and more visible!)
        const eyeColor = type === CharacterType.MIMIC ? 0xff0000 : 0x2a2a2a;
        const eyeGeometry = new THREE.SphereGeometry(0.07, 16, 16);
        const eyeMaterial = new THREE.MeshBasicMaterial({
            color: eyeColor,
            emissive: type === CharacterType.MIMIC ? 0xff0000 : 0x000000,
            emissiveIntensity: type === CharacterType.MIMIC ? 2.5 : 0
        });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.12, 2.05, 0.2);
        leftEye.name = 'leftEye';
        visitor.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.12, 2.05, 0.2);
        rightEye.name = 'rightEye';
        visitor.add(rightEye);

        // Make eyes only visible with light on (for Mimic)
        if (type === CharacterType.MIMIC) {
            leftEye.visible = gameState.lightOn;
            rightEye.visible = gameState.lightOn;
        }
    }

    // Position visitor OUTSIDE the door in the hallway (visible through peephole)
    visitor.position.set(0, 0, 8.5);
    visitor.userData.type = type;
    scene.add(visitor);

    return visitor;
}

function spawnRandomVisitor() {
    const types = [CharacterType.DAVE, CharacterType.MIMIC, CharacterType.STALKER];
    const randomType = types[Math.floor(Math.random() * types.length)];

    gameState.currentVisitor = {
        type: randomType,
        model: createVisitor(randomType)
    };

    playSound('knock');
    showNotification('Someone is knocking...');

    // Start Dave timer if it's Dave
    if (randomType === CharacterType.DAVE) {
        startDaveTimer();
    }
}

function removeVisitor() {
    if (visitor) {
        scene.remove(visitor);
        visitor = null;
    }
    gameState.currentVisitor = null;
    stopDaveTimer();
}

// ===========================
// DAVE TIMER SYSTEM
// ===========================
function startDaveTimer() {
    gameState.daveTimeRemaining = DAVE_TIMER_DURATION;
    document.getElementById('timer-display').classList.remove('hidden');
    updateTimerUI();

    gameState.daveTimer = setInterval(() => {
        gameState.daveTimeRemaining--;
        updateTimerUI();

        if (gameState.daveTimeRemaining <= 0) {
            stopDaveTimer();
            gameOver("You didn't let Dave in within 10 seconds! He was your neighbor and needed help!");
        }
    }, 1000);
}

function stopDaveTimer() {
    if (gameState.daveTimer) {
        clearInterval(gameState.daveTimer);
        gameState.daveTimer = null;
        document.getElementById('timer-display').classList.add('hidden');
    }
}

function updateTimerUI() {
    document.getElementById('timer-value').textContent = gameState.daveTimeRemaining;
}

// ===========================
// DOOR MECHANICS
// ===========================
function openDoor() {
    if (!gameState.isGameActive || !gameState.currentVisitor || gameState.doorOpen) {
        return;
    }

    gameState.doorOpen = true;
    playSound('door');

    const visitorType = gameState.currentVisitor.type;

    if (visitorType === CharacterType.DAVE) {
        // Success - let Dave in
        stopDaveTimer();
        showNotification('Dave thanks you and goes to his apartment.');
        setTimeout(() => {
            completeEncounter();
        }, 2000);
    } else if (visitorType === CharacterType.MIMIC) {
        // Death - let Mimic in
        gameOver("You let the Mimic in! It wasn't Dave - the red eyes gave it away!");
    } else if (visitorType === CharacterType.STALKER) {
        // Death - let Stalker in
        gameOver("You let the Stalker in! Never open the door to the black figure!");
    }
}

// ===========================
// ENCOUNTER MANAGEMENT
// ===========================
function completeEncounter() {
    removeVisitor();
    gameState.encountersCompleted++;
    gameState.peepholeOpen = false;
    gameState.doorOpen = false;

    const shutter = scene.getObjectByName('peepholeShutter');
    if (shutter) shutter.visible = true;

    updatePeepholeUI();
    showNotification('');

    if (gameState.encountersCompleted >= TOTAL_ENCOUNTERS) {
        victory();
    } else {
        gameState.currentEncounter++;
        updateEncounterUI();

        // Spawn next visitor after a delay
        setTimeout(() => {
            if (gameState.isGameActive) {
                spawnRandomVisitor();
            }
        }, 3000);
    }
}

function skipEncounter() {
    // If visitor leaves without being let in
    if (!gameState.currentVisitor) return;

    const visitorType = gameState.currentVisitor.type;

    if (visitorType === CharacterType.DAVE) {
        // Dave timer will handle this - already triggers game over
        return;
    } else {
        // Mimic or Stalker - they leave, encounter is successful
        showNotification('The visitor left...');
        setTimeout(() => {
            completeEncounter();
        }, 2000);
    }
}

// ===========================
// GAME STATE MANAGEMENT
// ===========================
function startGame() {
    // Hide instructions
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');

    // Reset game state
    gameState = {
        currentEncounter: 1,
        isGameActive: true,
        lightOn: false,
        peepholeOpen: false,
        currentVisitor: null,
        daveTimer: null,
        daveTimeRemaining: 0,
        encountersCompleted: 0,
        canOpenPeephole: true,
        doorOpen: false
    };

    updateEncounterUI();
    updateLightUI();
    updatePeepholeUI();

    // Spawn first visitor
    setTimeout(() => {
        spawnRandomVisitor();
    }, 2000);
}

function gameOver(message) {
    gameState.isGameActive = false;
    stopDaveTimer();

    document.getElementById('game-over-title').textContent = 'YOU DIED';
    document.getElementById('game-over-message').textContent = message;
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('hud').classList.add('hidden');

    playSound('death');
}

function victory() {
    gameState.isGameActive = false;
    document.getElementById('victory').classList.remove('hidden');
    document.getElementById('hud').classList.add('hidden');
    playSound('victory');
}

function restartGame() {
    // Hide all UI panels
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('victory').classList.add('hidden');
    document.getElementById('instructions').classList.add('hidden');

    // Remove current visitor
    removeVisitor();

    // Reset light
    gameState.lightOn = false;
    hallwayLight.intensity = 0;

    // Start new game
    startGame();
}

// ===========================
// UI UPDATES
// ===========================
function updateEncounterUI() {
    document.getElementById('encounter-num').textContent = gameState.currentEncounter;
}

function updateLightUI() {
    const lightState = document.getElementById('light-state');
    lightState.textContent = gameState.lightOn ? 'ON' : 'OFF';
    lightState.className = gameState.lightOn ? 'on' : 'off';

    // Update eye visibility for Mimic
    if (visitor && gameState.currentVisitor && gameState.currentVisitor.type === CharacterType.MIMIC) {
        const leftEye = visitor.getObjectByName('leftEye');
        const rightEye = visitor.getObjectByName('rightEye');
        if (leftEye) leftEye.visible = gameState.lightOn;
        if (rightEye) rightEye.visible = gameState.lightOn;
    }
}

function updatePeepholeUI() {
    document.getElementById('peephole-state').textContent = gameState.peepholeOpen ? 'OPEN' : 'CLOSED';
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    if (message) {
        setTimeout(() => {
            notification.textContent = '';
        }, 4000);
    }
}

// ===========================
// SOUND SYSTEM
// ===========================
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch(type) {
        case 'knock':
            oscillator.frequency.value = 100;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);

            // Double knock
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.value = 100;
                osc2.type = 'sine';
                gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                osc2.start(audioContext.currentTime);
                osc2.stop(audioContext.currentTime + 0.1);
            }, 200);
            break;

        case 'door':
            oscillator.frequency.value = 200;
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;

        case 'switch':
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;

        case 'peephole':
            oscillator.frequency.value = 400;
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;

        case 'death':
            oscillator.frequency.value = 60;
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 2);
            break;

        case 'victory':
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
            break;
    }
}

// ===========================
// INPUT HANDLING
// ===========================
document.addEventListener('keydown', (event) => {
    if (!gameState.isGameActive) return;

    switch(event.key.toLowerCase()) {
        case 'l':
            toggleLight();
            break;
        case ' ':
            event.preventDefault();
            togglePeephole();
            break;
        case 'e':
            openDoor();
            break;
        case 'escape':
            // Allow closing peephole or skipping encounter
            if (gameState.peepholeOpen) {
                togglePeephole();
            } else if (gameState.currentVisitor && !gameState.doorOpen) {
                skipEncounter();
            }
            break;
    }
});

// ===========================
// UI EVENT LISTENERS
// ===========================
document.getElementById('start-button').addEventListener('click', () => {
    startGame();
});

document.getElementById('restart-button').addEventListener('click', () => {
    restartGame();
});

document.getElementById('victory-restart-button').addEventListener('click', () => {
    restartGame();
});

// ===========================
// ANIMATION LOOP
// ===========================
function animate() {
    requestAnimationFrame(animate);

    // Subtle visitor breathing animation
    if (visitor && gameState.currentVisitor) {
        visitor.position.y = Math.sin(Date.now() * 0.001) * 0.02;
    }

    renderer.render(scene, camera);
}

// ===========================
// INITIALIZATION
// ===========================
console.log('Starting game initialization...');
initThreeJS();
console.log('Starting animation loop...');
animate();
console.log('Game fully initialized and running!');
