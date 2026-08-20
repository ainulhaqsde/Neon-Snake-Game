/* =========================================
   ELEMENTS
========================================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const finalScoreEl = document.getElementById("finalScore");

const gameStatus = document.getElementById("gameStatus");
const currentDifficulty = document.getElementById("currentDifficulty");

const startOverlay = document.getElementById("startOverlay");
const pauseOverlay = document.getElementById("pauseOverlay");
const gameOverScreen = document.getElementById("gameOver");

const difficultyCards = document.querySelectorAll(".difficulty-card");


/* =========================================
   GAME SETTINGS
========================================= */

const GRID_SIZE = 20;

const COLS = canvas.width / GRID_SIZE;
const ROWS = canvas.height / GRID_SIZE;

let snake = [];
let food = null;

let dx = GRID_SIZE;
let dy = 0;

let nextDx = GRID_SIZE;
let nextDy = 0;

let score = 0;
let highScore = Number(localStorage.getItem("neonSnakeHighScore")) || 0;

let speed = 12;
let difficultyName = "Medium";

let gameLoop = null;

let isRunning = false;
let isPaused = false;
let isGameOver = false;

let foodPulse = 0;
let animationFrameId = null;


/* =========================================
   INITIAL UI
========================================= */

highScoreEl.textContent = highScore;

drawWelcomeScene();


/* =========================================
   GAME INITIALIZATION
========================================= */

function initGame() {
  snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
  ];

  dx = GRID_SIZE;
  dy = 0;

  nextDx = GRID_SIZE;
  nextDy = 0;

  score = 0;

  scoreEl.textContent = score;

  isRunning = true;
  isPaused = false;
  isGameOver = false;

  hideAllOverlays();

  updateStatus("PLAYING", "playing");

  generateFood();

  updateDifficultyUI();

  drawGame();
}


/* =========================================
   START GAME
========================================= */

function startGame(selectedSpeed, selectedDifficulty = "Medium") {
  speed = selectedSpeed;
  difficultyName = selectedDifficulty;

  clearGameLoop();

  initGame();

  currentDifficulty.textContent = difficultyName;

  gameLoop = setInterval(gameTick, 1000 / speed);

  startAnimationLoop();
}


/* =========================================
   GAME LOOP
========================================= */

function gameTick() {
  if (!isRunning || isPaused || isGameOver) {
    return;
  }

  applyNextDirection();

  moveSnake();

  if (checkCollision()) {
    endGame();
    return;
  }

  drawGame();
}


/* =========================================
   MOVE SNAKE
========================================= */

function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;

    scoreEl.textContent = score;

    createScoreFlash();

    generateFood();
  } else {
    snake.pop();
  }
}


/* =========================================
   COLLISION
========================================= */

function checkCollision() {
  const head = snake[0];

  const hitWall =
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height;

  if (hitWall) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (
      head.x === snake[i].x &&
      head.y === snake[i].y
    ) {
      return true;
    }
  }

  return false;
}


/* =========================================
   FOOD
========================================= */

function generateFood() {
  let newFood;

  do {
    newFood = {
      x: Math.floor(Math.random() * COLS) * GRID_SIZE,
      y: Math.floor(Math.random() * ROWS) * GRID_SIZE
    };
  } while (
    snake.some(
      part =>
        part.x === newFood.x &&
        part.y === newFood.y
    )
  );

  food = newFood;
}


/* =========================================
   DRAW GAME
========================================= */

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackgroundGrid();

  if (food) {
    drawFood();
  }

  drawSnake();

  drawCanvasBorderGlow();
}


/* =========================================
   GRID
========================================= */

function drawBackgroundGrid() {
  ctx.save();

  ctx.strokeStyle = "rgba(0, 247, 255, 0.045)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.restore();
}


/* =========================================
   SNAKE
========================================= */

function drawSnake() {
  snake.forEach((part, index) => {
    const centerX = part.x + GRID_SIZE / 2;
    const centerY = part.y + GRID_SIZE / 2;

    const radius =
      index === 0
        ? GRID_SIZE * 0.47
        : GRID_SIZE * 0.42;

    ctx.save();

    const gradient = ctx.createRadialGradient(
      centerX - 4,
      centerY - 4,
      2,
      centerX,
      centerY,
      radius
    );

    if (index === 0) {
      gradient.addColorStop(0, "#eaffff");
      gradient.addColorStop(0.25, "#5ffcff");
      gradient.addColorStop(0.65, "#00e6a0");
      gradient.addColorStop(1, "#008c65");
    } else {
      const fade = Math.max(0.25, 1 - index * 0.025);

      gradient.addColorStop(
        0,
        `rgba(95, 252, 255, ${fade})`
      );

      gradient.addColorStop(
        0.45,
        `rgba(53, 255, 154, ${fade})`
      );

      gradient.addColorStop(
        1,
        `rgba(0, 110, 80, ${fade})`
      );
    }

    ctx.fillStyle = gradient;

    ctx.shadowColor =
      index === 0
        ? "#00f7ff"
        : "#35ff9a";

    ctx.shadowBlur =
      index === 0
        ? 20
        : 12;

    ctx.beginPath();

    ctx.arc(
      centerX,
      centerY,
      radius,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();


    if (index === 0) {
      drawSnakeEyes(centerX, centerY);
    }
  });
}


/* =========================================
   SNAKE EYES
========================================= */

function drawSnakeEyes(centerX, centerY) {
  ctx.save();

  ctx.fillStyle = "#020304";

  let eyeOffsetX1 = -4;
  let eyeOffsetY1 = -4;

  let eyeOffsetX2 = 4;
  let eyeOffsetY2 = -4;

  if (dx > 0) {
    eyeOffsetX1 = 4;
    eyeOffsetY1 = -4;

    eyeOffsetX2 = 4;
    eyeOffsetY2 = 4;
  }

  if (dx < 0) {
    eyeOffsetX1 = -4;
    eyeOffsetY1 = -4;

    eyeOffsetX2 = -4;
    eyeOffsetY2 = 4;
  }

  if (dy > 0) {
    eyeOffsetX1 = -4;
    eyeOffsetY1 = 4;

    eyeOffsetX2 = 4;
    eyeOffsetY2 = 4;
  }

  if (dy < 0) {
    eyeOffsetX1 = -4;
    eyeOffsetY1 = -4;

    eyeOffsetX2 = 4;
    eyeOffsetY2 = -4;
  }

  ctx.beginPath();

  ctx.arc(
    centerX + eyeOffsetX1,
    centerY + eyeOffsetY1,
    2.2,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.beginPath();

  ctx.arc(
    centerX + eyeOffsetX2,
    centerY + eyeOffsetY2,
    2.2,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}


/* =========================================
   FOOD
========================================= */

function drawFood() {
  const centerX = food.x + GRID_SIZE / 2;
  const centerY = food.y + GRID_SIZE / 2;

  const pulse =
    Math.sin(foodPulse) * 1.7;

  const radius =
    GRID_SIZE * 0.38 + pulse;

  ctx.save();

  ctx.shadowColor = "#ff335f";
  ctx.shadowBlur = 24;

  const gradient = ctx.createRadialGradient(
    centerX - 3,
    centerY - 3,
    1,
    centerX,
    centerY,
    radius
  );

  gradient.addColorStop(0, "#fff0b5");
  gradient.addColorStop(0.2, "#ffbf65");
  gradient.addColorStop(0.5, "#ff3b5c");
  gradient.addColorStop(1, "#9a001f");

  ctx.fillStyle = gradient;

  ctx.beginPath();

  ctx.arc(
    centerX,
    centerY,
    radius,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.strokeStyle = "rgba(244, 214, 143, 0.9)";
  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.arc(
    centerX,
    centerY,
    radius + 4,
    0,
    Math.PI * 2
  );

  ctx.stroke();

  ctx.restore();
}


/* =========================================
   CANVAS BORDER GLOW
========================================= */

function drawCanvasBorderGlow() {
  const gradient = ctx.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height
  );

  gradient.addColorStop(
    0,
    "rgba(0, 247, 255, 0.45)"
  );

  gradient.addColorStop(
    0.5,
    "rgba(215, 177, 93, 0.22)"
  );

  gradient.addColorStop(
    1,
    "rgba(53, 255, 154, 0.35)"
  );

  ctx.save();

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1;

  ctx.strokeRect(
    0.5,
    0.5,
    canvas.width - 1,
    canvas.height - 1
  );

  ctx.restore();
}


/* =========================================
   VISUAL ANIMATION LOOP
========================================= */

function startAnimationLoop() {
  cancelAnimationFrame(animationFrameId);

  function animate() {
    foodPulse += 0.07;

    if (
      isRunning &&
      !isPaused &&
      !isGameOver
    ) {
      drawGame();
    }

    animationFrameId =
      requestAnimationFrame(animate);
  }

  animate();
}


/* =========================================
   PAUSE GAME
========================================= */

function pauseGame() {
  if (!isRunning || isGameOver || isPaused) {
    return;
  }

  isPaused = true;

  updateStatus("PAUSED", "paused");

  hideAllOverlays();

  pauseOverlay.classList.add("active");
}


/* =========================================
   RESUME GAME
========================================= */

function resumeGame() {
  if (!isRunning || isGameOver || !isPaused) {
    return;
  }

  isPaused = false;

  hideAllOverlays();

  updateStatus("PLAYING", "playing");

  drawGame();
}


/* =========================================
   END GAME
========================================= */

function endGame() {
  isRunning = false;
  isGameOver = true;
  isPaused = false;

  clearGameLoop();

  updateStatus("GAME OVER", "game-over");

  finalScoreEl.textContent = score;

  if (score > highScore) {
    highScore = score;

    localStorage.setItem(
      "neonSnakeHighScore",
      highScore
    );

    highScoreEl.textContent = highScore;
  }

  hideAllOverlays();

  gameOverScreen.classList.add("active");

  createGameOverFlash();
}


/* =========================================
   RESTART
========================================= */

function restartGame() {
  if (!speed) {
    speed = 12;
  }

  startGame(
    speed,
    difficultyName || "Medium"
  );
}


/* =========================================
   GAME STATUS
========================================= */

function updateStatus(text, type) {
  const dot = gameStatus.querySelector(".status-dot");

  gameStatus.childNodes[
    gameStatus.childNodes.length - 1
  ].textContent = ` ${text}`;

  if (!dot) {
    return;
  }

  if (type === "playing") {
    dot.style.background = "#35ff9a";
    dot.style.boxShadow =
      "0 0 12px #35ff9a";

    gameStatus.style.color = "#7affb7";
  }

  if (type === "paused") {
    dot.style.background = "#d7b15d";
    dot.style.boxShadow =
      "0 0 12px #d7b15d";

    gameStatus.style.color = "#f4d68f";
  }

  if (type === "game-over") {
    dot.style.background = "#ff3b5c";
    dot.style.boxShadow =
      "0 0 12px #ff3b5c";

    gameStatus.style.color = "#ff8097";
  }

  if (type === "ready") {
    dot.style.background = "#d7b15d";
    dot.style.boxShadow =
      "0 0 12px #d7b15d";

    gameStatus.style.color = "#f4d68f";
  }
}


/* =========================================
   DIFFICULTY UI
========================================= */

function updateDifficultyUI() {
  difficultyCards.forEach(card => {
    card.classList.remove("active");
  });

  const difficulty =
    difficultyName.toLowerCase();

  const activeCard =
    document.querySelector(
      `[data-level="${difficulty}"]`
    );

  if (activeCard) {
    activeCard.classList.add("active");
  }

  currentDifficulty.textContent =
    difficultyName;
}


/* =========================================
   OVERLAYS
========================================= */

function hideAllOverlays() {
  startOverlay.classList.remove("active");
  pauseOverlay.classList.remove("active");
  gameOverScreen.classList.remove("active");
}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", event => {
  const key = event.key;

  if (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "ArrowLeft" ||
    key === "ArrowRight"
  ) {
    event.preventDefault();
  }

  if (
    !isRunning ||
    isPaused ||
    isGameOver
  ) {
    return;
  }


  if (
    key === "ArrowUp" &&
    dy === 0
  ) {
    nextDx = 0;
    nextDy = -GRID_SIZE;
  }


  if (
    key === "ArrowDown" &&
    dy === 0
  ) {
    nextDx = 0;
    nextDy = GRID_SIZE;
  }


  if (
    key === "ArrowLeft" &&
    dx === 0
  ) {
    nextDx = -GRID_SIZE;
    nextDy = 0;
  }


  if (
    key === "ArrowRight" &&
    dx === 0
  ) {
    nextDx = GRID_SIZE;
    nextDy = 0;
  }
});


/* =========================================
   EXTRA KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown", event => {
  if (
    event.code === "Space" &&
    isRunning &&
    !isGameOver
  ) {
    event.preventDefault();

    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }

  if (
    event.key.toLowerCase() === "r" &&
    isGameOver
  ) {
    restartGame();
  }
});


/* =========================================
   APPLY NEXT DIRECTION
========================================= */

function applyNextDirection() {
  dx = nextDx;
  dy = nextDy;
}


/* =========================================
   SCORE FLASH
========================================= */

function createScoreFlash() {
  scoreEl.animate(
    [
      {
        transform: "scale(1)",
        textShadow:
          "0 0 10px rgba(0,247,255,0.45)"
      },

      {
        transform: "scale(1.3)",
        textShadow:
          "0 0 24px rgba(244,214,143,1)"
      },

      {
        transform: "scale(1)",
        textShadow:
          "0 0 10px rgba(0,247,255,0.45)"
      }
    ],
    {
      duration: 300,
      easing: "ease-out"
    }
  );
}


/* =========================================
   GAME OVER FLASH
========================================= */

function createGameOverFlash() {
  canvas.animate(
    [
      {
        filter: "brightness(1)"
      },

      {
        filter:
          "brightness(1.7) saturate(1.4)"
      },

      {
        filter: "brightness(1)"
      }
    ],
    {
      duration: 420,
      easing: "ease-out"
    }
  );
}


/* =========================================
   CLEAR INTERVAL
========================================= */

function clearGameLoop() {
  if (gameLoop) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
}


/* =========================================
   WELCOME SCENE
========================================= */

function drawWelcomeScene() {
  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  drawBackgroundGrid();

  const gradient =
    ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      10,
      canvas.width / 2,
      canvas.height / 2,
      280
    );

  gradient.addColorStop(
    0,
    "rgba(0,247,255,0.05)"
  );

  gradient.addColorStop(
    0.5,
    "rgba(215,177,93,0.015)"
  );

  gradient.addColorStop(
    1,
    "rgba(0,0,0,0)"
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  drawCanvasBorderGlow();

  updateStatus(
    "READY",
    "ready"
  );
}