# 🐍 Neon Snake Game

![HTML5](https://img.shields.io/badge/HTML5-orange?logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-blue?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript\&logoColor=black)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)

A premium, luxury-inspired **Neon Snake Game** built using **HTML, CSS, and JavaScript**.

This project transforms the classic Snake experience into a modern neon arcade game with glowing animations, royal gold accents, high-score tracking, difficulty levels, pause/resume controls, responsive design, and enhanced visual effects.

> **Chase the glow. Rule the grid.**

---

## 🎮 Live Demo

Play the game here:

[🎮 Play Neon Snake Game](https://neon-snake-game-ainul.vercel.app/)

---

## ✨ Features

* 🐍 Classic Snake gameplay
* 💎 Premium luxury neon interface
* 🌌 Animated futuristic background
* ✨ Cyan, emerald, and royal gold glow effects
* 🎮 Three difficulty levels
* ⏸️ Pause and Resume controls
* 🔄 Restart functionality
* 🏆 High Score tracking using `localStorage`
* 📊 Real-time score display
* 🔥 Animated glowing food orb
* 👀 Direction-aware snake eyes
* 💫 Score animation effects
* ☠️ Premium Game Over screen
* ⌨️ Keyboard shortcuts
* 📱 Responsive layout
* 🎨 Glassmorphism interface
* 💻 Runs directly in the browser
* 🚀 Easy deployment on Vercel

---

## 🖼️ Preview

![Neon Snake Game Preview](./screenshot.png)

---

## 🕹️ How to Play

Use the keyboard arrow keys to control the snake.

| Key            | Action                  |
| -------------- | ----------------------- |
| ⬆️ Arrow Up    | Move Up                 |
| ⬇️ Arrow Down  | Move Down               |
| ⬅️ Arrow Left  | Move Left               |
| ➡️ Arrow Right | Move Right              |
| Space          | Pause / Resume          |
| R              | Restart after Game Over |

### Objective

Eat the glowing neon food orbs to increase your score and grow the snake.

Avoid:

* Hitting the walls
* Hitting your own snake body

The longer you survive and the more food you collect, the higher your score becomes.

---

## ⚡ Difficulty Levels

### 🟢 Easy

A relaxed pace designed for beginners.

**Speed:** `8`

### 🟡 Medium

Balanced gameplay with a moderate challenge.

**Speed:** `12`

### 🔴 Hard

Fast gameplay designed for experienced players.

**Speed:** `18`

---

## 🛠️ Technologies Used

This project is built using:

* HTML5
* CSS3
* JavaScript
* HTML Canvas API
* Browser Local Storage
* Google Fonts
* Vercel

No frameworks or external JavaScript libraries are required.

---

## 📂 Project Structure

```text
Neon-Snake-Game/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── screenshot.png
└── LICENSE
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/iamainul/Neon-Snake-Game.git
```

### 2. Open the Project Folder

```bash
cd Neon-Snake-Game
```

### 3. Run the Game

Open:

```text
index.html
```

in your browser.

You can also run the project using a local development server such as **Live Server** in Visual Studio Code.

---

## 💻 Run with Visual Studio Code

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Open `index.html`.
4. Right-click inside the file.
5. Select **Open with Live Server**.
6. The game will open automatically in your browser.

---

## 🚀 Deploy on Vercel

This project can be deployed easily using Vercel.

### Step 1

Push your project to GitHub.

### Step 2

Sign in to Vercel.

### Step 3

Select:

```text
Add New → Project
```

### Step 4

Import your GitHub repository:

```text
Neon-Snake-Game
```

### Step 5

Click:

```text
Deploy
```

No build command or special configuration is required because the project uses plain HTML, CSS, and JavaScript.

---

## 🎨 Design Theme

The redesigned Neon Snake Game combines a futuristic neon arcade style with premium luxury elements.

The visual design includes:

* Deep black backgrounds
* Cyan neon lighting
* Emerald green snake effects
* Royal gold accents
* Luxury border details
* Glassmorphism panels
* Futuristic grid effects
* Ambient glowing particles
* Animated background lighting
* Premium arcade-style HUD
* Smooth hover effects
* Smooth transition animations
* Elegant typography

The goal is to make the game feel more like a premium arcade experience instead of a basic browser Snake project.

---

## 🐍 Snake Design

The snake has been visually improved with:

* Gradient neon coloring
* Emerald and cyan glow
* Rounded snake segments
* Brighter snake head
* Direction-aware eyes
* Dynamic shadow effects
* Smooth neon styling

The snake head automatically changes its eye direction depending on the direction of movement.

---

## 🔴 Neon Food Orb

Instead of a simple red circle, the food is designed as a glowing neon orb.

It includes:

* Animated pulsing
* Red neon glow
* Gold highlights
* Radial gradient
* Outer glowing ring
* Dynamic visual animation

Collecting the orb increases the player's score and grows the snake.

---

## 🏆 High Score System

The highest score is automatically stored in the browser using:

```javascript
localStorage
```

This means your best score remains saved even after:

* Refreshing the page
* Closing the browser tab
* Reopening the game later

The saved score remains available as long as the browser's local storage is not cleared.

---

## 📊 Game Status System

The premium HUD displays the current state of the game.

Possible statuses include:

```text
READY
PLAYING
PAUSED
GAME OVER
```

Each status uses its own visual indicator and glow style.

---

## 🎮 Game Controls

The game includes both interface buttons and keyboard shortcuts.

### Interface Controls

* Easy
* Medium
* Hard
* Pause
* Resume
* Restart
* Play Again

### Keyboard Controls

```text
Arrow Up       → Move Up
Arrow Down     → Move Down
Arrow Left     → Move Left
Arrow Right    → Move Right
Space          → Pause / Resume
R              → Restart after Game Over
```

---

## ⏸️ Pause & Resume

The game can be paused at any time while playing.

You can pause using:

```text
Pause Button
```

or:

```text
Space Key
```

While paused, the snake stops moving and a premium pause overlay appears.

Press **Resume** or **Space** again to continue the game.

---

## 💀 Game Over System

The game ends when the snake:

* Hits a wall
* Hits its own body

When the game ends, a premium Game Over interface appears showing:

* Final Score
* Game Over status
* Restart option
* Play Again button

If the final score is higher than the previous best score, the high score is automatically updated.

---

## 💫 Animations

The game includes several visual animations.

Examples include:

* Floating neon particles
* Ambient background movement
* Glowing title animation
* Snake icon floating effect
* Pulsing neon indicators
* Animated food orb
* Score increase animation
* Game Over flash effect
* Difficulty button hover animation
* Smooth overlay transitions
* Premium lighting effects

---

## 📱 Responsive Design

The interface automatically adjusts to different screen sizes.

Supported layouts include:

* Desktop
* Laptop
* Tablet
* Mobile

The main game canvas maintains its game ratio while the surrounding interface adapts to the available screen width.

---

## 🌐 Browser Compatibility

The game works in most modern browsers, including:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari
* Opera

For the best experience, use the latest version of your browser.

---

## 🔒 Local Data

The game does not require:

* User accounts
* Login
* Database
* Server
* Personal information

Only the high score is stored locally in the user's browser.

---

## 🔮 Future Improvements

Possible future upgrades include:

* 🔊 Background music
* 🎵 Sound effects
* 📱 Mobile swipe controls
* 📲 On-screen mobile controls
* 🏅 Achievement system
* 🎯 Level progression
* ⚡ Power-ups
* 🛡️ Shields
* 🧲 Magnet power-ups
* ✖️ Score multipliers
* 🧱 Special obstacles
* 🎨 Multiple themes
* 🐍 Multiple snake skins
* 🌈 Unlockable effects
* 🏆 Global leaderboard
* 👤 Player profiles
* 🌐 Online multiplayer
* 🎮 Gamepad support
* 🌀 Special game modes
* ⏱️ Time Attack mode
* ♾️ Endless mode
* 🏁 Challenge mode

---

## 👨‍💻 Developer

**Developed & Created by Ainul Haq**

Neon Snake Game is a modern reinterpretation of the classic Snake Game, designed with a premium neon arcade interface and enhanced browser-based gameplay.

---

## 📜 Copyright

```text
© 2026 Neon Snake Game. All Rights Reserved.
```

---

## 📜 License

This project is available under the license included in this repository.

See:

```text
LICENSE
```

for complete licensing information.

---

## ⭐ Support

If you like this project, consider giving the GitHub repository a ⭐.

It helps support the project and future improvements.

---

## 🐍 Neon Snake Game

### Chase the glow. Rule the grid.

**Developed & Created by Ainul Haq**