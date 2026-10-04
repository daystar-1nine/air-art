<div align="center">
  <img src="https://raw.githubusercontent.com/daystar-1nine/air-art/main/public/logo.png" alt="AirArt Logo" width="140"/>
  <h1>AirArt 🎨✨</h1>
  <p><strong>Paint the Air. Unleash your Creativity.</strong></p>
  <p>A cutting-edge, touchless suite of interactive web applications powered by <b>MediaPipe Hands</b>, <b>HTML5 Canvas</b>, and <b>TypeScript</b>. No mouse or keyboard required—just your hands in the air.</p>

  [![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://air-art-eta.vercel.app/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
</div>

<br/>

## 🚀 Live Demo

Experience AirArt instantly in your browser (Works best in **Google Chrome** on laptop/desktop with a webcam):  
👉 **[Launch AirArt on Vercel](https://air-art-eta.vercel.app/)**

---

## 🌟 Suite of Interactive Applications

AirArt features a modular architecture hosting multiple touchless experiences that you can switch between seamlessly from the in-app selector:

### ✍️ 1. Air Drawing Studio
Our flagship touchless canvas where your index finger becomes a digital paintbrush:
- **Natural Brush Tracking:** Point your index finger to paint smooth, real-time vector paths.
- **Dynamic Brush Types:** Toggle between **Solid**, **Neon Glow**, **Spray Paint**, and **Calligraphy**.
- **Depth-Based Brush Sizing:** Move your hand closer to the camera to naturally thicken the stroke.
- **Pinky Eraser Toggle:** Raise *only* your pinky finger to flip into eraser mode.
- **Gesture Canvas Controls:**
  - Hold an open palm for 1.5s to clear the entire canvas.
  - Quick palm swipe left for **Undo** / right for **Redo**.
- **Zoom & Pan:** Two-finger pinch navigation to navigate around your artwork.
- **Reference Image Overlay:** Upload any reference image directly onto the canvas for tracing.
- **Export Artwork:** Save your high-resolution creation with one click as a `.png`.

### ✋ 2. AI Finger Counter with Voice
An AI-powered recognition tool that provides real-time audio and visual feedback:
- **Precision Detection:** Accurately counts extended fingers (0 through 5) based on normalized palm geometry.
- **Voice Feedback:** Speaks the detected count aloud using the browser's native **Web Speech API**.
- **Real-Time Visuals:** Shows live detection status and confidence indicators.

### 🎮 3. Rock-Paper-Scissors AI Showdown
Challenge the computer to a classic game using pure computer vision:
- **Live Gesture Recognition:** Recognizes ✊ Rock, ✋ Paper, and ✌️ Scissors in real time.
- **Match Countdown:** Hit "Play Match", watch the 3-2-1 countdown, and shoot your gesture on "SHOOT!".
- **Outcome Engine:** Instant round evaluation displaying winner, player move, and AI move.

### ⭕ 4. Air Tic-Tac-Toe (Solo & 2-Player Duo)
The classic strategy game reimagined for air-clicking:
- **Air Click Mechanic:** Move your hand to position the floating cursor, then pinch (index + thumb) to air-click a tile.
- **Two Game Modes:**
  - **Vs AI:** Play against an automated computer opponent.
  - **2-Player Duo:** Pass the cursor back and forth to compete with a friend locally.
- **Anti-Glitch Cooldown:** Intelligent cooldown prevention prevents accidental double clicks.

### 🧮 5. Gesture-Controlled Calculator
A glassmorphic on-screen calculator operated entirely through spatial pinches:
- **High-Speed Input:** Tuned with rapid 400ms air-click response for fluid, fast calculations.
- **Tactile Visual Feedback:** Buttons visibly press and glow as your pinch registers.
- **Full Arithmetic Engine:** Supports multi-digit operations, decimal precision, deletion, and chain computations.

### 🧩 6. Photo Booth Picture Puzzle
A personalized sliding puzzle created directly from your live webcam feed:
- **Gesture Shutter:** Hold up all 5 fingers for 1 second to start a 10-second photo timer.
- **Snapshot & Slice:** Automatically captures a high-resolution snapshot in widescreen landscape (4:3) and slices it into a 3x3 sliding puzzle.
- **True Drag-and-Drop:** Pinch, hold, and physically drag puzzle tiles into the empty space to reconstruct your photo.
- **Victory Screen:** Solved puzzles trigger a celebratory win overlay with your original full-size photo.

---

## ✋ Gestures Quick Reference

| Gesture | Action | Active App |
| :--- | :--- | :--- |
| **Raise Index Finger** | Paint strokes on canvas | Air Drawing |
| **Raise Pinky Finger** | Toggle Eraser on/off | Air Drawing |
| **Open Palm (Hold 1.5s)** | Clear entire canvas | Air Drawing |
| **Open Palm Swipe L / R** | Undo / Redo previous stroke | Air Drawing |
| **Pinch (Thumb + Index)** | Air-click buttons & tiles | Tic-Tac-Toe, Calculator, UI |
| **Pinch, Hold & Drag** | Move sliding puzzle pieces | Picture Puzzle |
| **Hold 5 Fingers (1s)** | Trigger 10s Photo Booth countdown | Picture Puzzle |
| **Rock / Paper / Scissors** | Play hand move on "SHOOT!" | Rock Paper Scissors |
| **Raise 0 to 5 Fingers** | Voice announces counted fingers | AI Finger Counter |

---

## 🛠️ Tech Stack & Architecture

- **Frontend & Bundling:** [Vite](https://vitejs.dev/)
- **Core Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Computer Vision:** [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
- **Audio & Speech:** [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- **Styling:** Custom CSS3 with Modern Glassmorphism & GPU-accelerated transforms
- **Deployment:** [Vercel](https://vercel.com/) CI/CD

```text
AirPencil/
 ├── public/                  # Static assets (logo, team photos, textures)
 ├── src/
 │    ├── apps/               # Modular application controllers
 │    │    ├── DrawingApp.ts           # Canvas drawing engine
 │    │    ├── FingerCounterApp.ts     # Speech synthesis counter
 │    │    ├── RockPaperScissorsApp.ts # Gesture combat game
 │    │    ├── TicTacToeApp.ts         # Solo & Duo Tic-Tac-Toe
 │    │    ├── CalculatorApp.ts        # Touchless calculator
 │    │    └── PuzzleApp.ts            # Photo booth drag & drop puzzle
 │    ├── core/               # Shared foundation
 │    │    ├── BaseApp.ts              # Pluggable app lifecycle interface
 │    │    ├── HandTrackingEngine.ts   # Singleton camera & MediaPipe bus
 │    │    ├── CanvasRenderer.ts       # Rendering pipeline & brush dynamics
 │    │    └── UIManager.ts            # Palette, swatches & modal controls
 │    ├── styles/             # Application styles & responsive themes
 │    ├── landing.ts          # Landing page hero experience
 │    └── main.ts             # Global router & app switching registry
 ├── index.html               # Landing page
 ├── app.html                 # Main touchless workspace
 └── package.json
```

---

## 💻 Local Development Setup

To run AirArt locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/daystar-1nine/air-art.git
cd air-art

# 2. Install dependencies
npm install

# 3. Start the local Vite development server
npm run dev
```

Open `http://localhost:5173` in **Google Chrome** and allow webcam permissions when prompted.

To create a production build:
```bash
npm run build
```

---

## 👥 Meet the Team

<div align="center">
<table>
  <tr>
    <td align="center" width="220px">
      <a href="https://github.com/daystar-1nine">
        <img src="https://github.com/daystar-1nine.png" width="100px" style="border-radius: 50%;" alt="Suraj"/><br />
        <sub><b>Suraj</b></sub>
      </a><br/>
      <a href="https://github.com/daystar-1nine">GitHub</a> • <a href="https://www.linkedin.com/in/surajsawant19062005/">LinkedIn</a>
    </td>
    <td align="center" width="220px">
      <a href="https://github.com/shubhrashinde">
        <img src="https://github.com/shubhrashinde.png" width="100px" style="border-radius: 50%;" alt="Shubhra"/><br />
        <sub><b>Shubhra</b></sub>
      </a><br/>
      <a href="https://github.com/shubhrashinde">GitHub</a> • <a href="https://www.linkedin.com/in/shubhra-shinde-aab746403/">LinkedIn</a>
    </td>
    <td align="center" width="220px">
      <a href="https://github.com/shrawani3007">
        <img src="https://raw.githubusercontent.com/daystar-1nine/air-art/main/public/shrawani.png" width="100px" height="100px" style="border-radius: 50%; object-fit: cover;" alt="Shrawani"/><br />
        <sub><b>Shrawani</b></sub>
      </a><br/>
      <a href="https://github.com/shrawani3007">GitHub</a> • <a href="https://www.linkedin.com/in/shrawani-kudu-212767393/">LinkedIn</a>
    </td>
  </tr>
</table>
</div>

---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Crafted with passion by the AirArt Team.</sub>
</div>
