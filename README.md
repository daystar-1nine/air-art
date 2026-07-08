<div align="center">
  <img src="https://raw.githubusercontent.com/daystar-1nine/air-art/main/public/logo.png" alt="AirArt Logo" width="150"/>
  <h1>AirArt 🎨✨</h1>
  <p><strong>Paint the Air. Unleash your Creativity.</strong></p>
  <p>A cutting-edge, browser-based suite of interactive applications powered by <b>MediaPipe Hands</b>. No mouse, no keyboard—just your bare hands.</p>
  
  [![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://air-art-eta.vercel.app/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](#)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](#)
</div>

<br>

## 🚀 Experience the Magic

Try the live demo right in your browser (Works best in **Google Chrome**):  
👉 **[Play Live on Vercel](https://air-art-eta.vercel.app/)**

---

## 🌟 Key Features & Applications

AirArt isn't just a drawing tool—it's a collection of magical, touchless web experiences!

### ✍️ 1. Air Drawing Studio
Our flagship application. Draw directly in the air!
- **Index Finger Tracking:** Use your index finger as a digital brush.
- **Pinky Eraser Toggle:** Raise your pinky to instantly switch to the eraser.
- **Advanced Brushes:** Includes Solid, Neon Glow, Spray Paint, and Calligraphy.
- **Dynamic Color Palettes:** Real-time color picking and vibrant UI overlays.
- **Export Artwork:** Save your masterpiece instantly as a high-quality `.png`.

### 🧩 2. Interactive Picture Puzzle
A completely touchless drag-and-drop puzzle game.
- **Webcam Integration:** Captures a snapshot of your face to use as the puzzle image!
- **Pinch to Grab:** Seamless drag-and-drop mechanism using pinch gestures.
- **Timer & Auto-solve:** Beat the clock or watch the puzzle solve itself!

### 🕹️ 3. Games & Utilities
- **Rock-Paper-Scissors:** Challenge an AI opponent using real-life hand gestures!
- **Air Tic-Tac-Toe:** Play a classic game of tic-tac-toe by air-clicking the tiles.
- **Air Calculator:** Punch in numbers from a distance like a sci-fi interface.

---

## 🛠️ Technology Stack

- **Frontend Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Computer Vision:** [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
- **Styling:** Custom CSS with Glassmorphism aesthetics

---

## 💻 Running Locally

To run the project on your own machine, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/daystar-1nine/air-art.git
cd air-art

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser. 
> **Note:** Camera permissions are required for the hand-tracking engine to initialize.

---

## 📂 Project Architecture

```text
src/
 ├─ apps/                # Individual interactive modules (Drawing, Puzzle, TicTacToe, etc.)
 ├─ core/                # Core AI Engine (HandTrackingEngine, UIManager, BaseApp)
 ├─ styles/              # Global aesthetic system (Glassmorphism, animations)
 ├─ landing.ts           # Interactivity for the hero landing page
 ├─ main.ts              # System router and app registry
 └─ app.html             # Main application viewport
public/                  # Static assets (Logos, Team profile pictures, etc.)
```

---

## 👨‍💻 Meet the Developers

This project is proudly built and maintained by our incredible team:

- **[Suraj](https://github.com/daystar-1nine)**
- **[Shubhra](https://github.com/shubhrashinde)**
- **[Shrawani](https://github.com/shrawani3007)**

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it!

<div align="center">
  <p>Made with ❤️ by the AirArt Team</p>
</div>
