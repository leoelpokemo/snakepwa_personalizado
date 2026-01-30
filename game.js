const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const pauseBtn = document.getElementById("pauseBtn");

let snake = [{ x: 150, y: 150 }];
let food = { x: 60, y: 60 };
let dx = 10;
let dy = 0;
let score = 0;
let isPaused = false;

// 🖼️ Imagen de fondo
const bgImage = new Image();
bgImage.src = "assets/gato.jpg"; // <-- cambia por la ruta de tu imagen

function draw() {
  if (isPaused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  // Comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);

  // Serpiente
  ctx.fillStyle = "lime";
  snake.forEach(p => ctx.fillRect(p.x, p.y, 10, 10));

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    food = {
      x: Math.floor(Math.random() * 30) * 10,
      y: Math.floor(Math.random() * 30) * 10
    };
  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.slice(1).some(p => p.x === head.x && p.y === head.y)
  ) {
    alert("Game Over");
    resetGame();
  }
}

function resetGame() {
  snake = [{ x: 150, y: 150 }];
  dx = 10;
  dy = 0;
  score = 0;
  scoreEl.textContent = score;
  isPaused = false;
  pauseBtn.textContent = "⏸️ Pausa";
}

// Control de dirección
function changeDirection(dir) {
  if (dir === "up" && dy === 0) { dx = 0; dy = -10; }
  if (dir === "down" && dy === 0) { dx = 0; dy = 10; }
  if (dir === "left" && dx === 0) { dx = -10; dy = 0; }
  if (dir === "right" && dx === 0) { dx = 10; dy = 0; }
}

//  Teclado
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") changeDirection("up");
  if (e.key === "ArrowDown") changeDirection("down");
  if (e.key === "ArrowLeft") changeDirection("left");
  if (e.key === "ArrowRight") changeDirection("right");
  if (e.key === " ") togglePause(); // barra espaciadora
});

//  Botón pausa
pauseBtn.addEventListener("click", togglePause);

function togglePause() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "▶️ Reanudar" : "⏸️ Pausa";
}

setInterval(draw, 100);

