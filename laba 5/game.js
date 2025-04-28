const gameArea = document.getElementById("gameArea");
const square = document.getElementById("square");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const pauseBtn = document.getElementById("pauseBtn");

let difficultyValue = localStorage.getItem("difficulty");
let color = localStorage.getItem("color");

let initialTime;
if (difficultyValue === "easy") initialTime = 10;
else if (difficultyValue === "medium") initialTime = 5;
else if (difficultyValue === "hard") initialTime = 2;
else initialTime = 10;

let time = initialTime;
let score = 0;
let timerInterval;
let isGameStarted = false;
let isPaused = false;

const endGameBanner = document.createElement("div");
endGameBanner.style.position = "absolute";
endGameBanner.style.top = "50%";
endGameBanner.style.left = "50%";
endGameBanner.style.transform = "translate(-50%, -50%)";
endGameBanner.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
endGameBanner.style.color = "white";
endGameBanner.style.padding = "20px";
endGameBanner.style.borderRadius = "10px";
endGameBanner.style.display = "none";
endGameBanner.style.fontSize = "24px";
endGameBanner.textContent = "Гру завершено! Нажміть, щоб повернутися на головне меню";

document.body.appendChild(endGameBanner);

// Стилізація квадрату
square.style.backgroundColor = color || "red";

// Центруємо квадрат
function centerSquare() {
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;
  const squareSize = square.offsetWidth;

  square.style.left = `${(areaWidth - squareSize) / 2}px`;
  square.style.top = `${(areaHeight - squareSize) / 2}px`;
}

// Рух квадрата
function moveSquare() {
  if (isPaused) return;

  const maxX = gameArea.clientWidth - square.offsetWidth;
  const maxY = gameArea.clientHeight - square.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  square.style.left = `${x}px`;
  square.style.top = `${y}px`;
}

// Таймер
function updateTimer() {
  if (!isPaused) {
    time--;
    timerDisplay.textContent = time;
    if (time <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }
}

// Завершення гри
function endGame() {
  const nickname = localStorage.getItem("nickname") || "Гравець";
  const difficulty = localStorage.getItem("difficulty") || "easy";

  saveResult(nickname, difficulty, score);

  endGameBanner.style.display = "block"; // Показуємо банер

  // Додаємо обробник події на банер для переходу на головну сторінку
  endGameBanner.addEventListener("click", () => {
    window.location.href = "index.html"; // Переходимо на головне меню
  });
}

// Клік по квадрату
square.addEventListener("click", () => {
  if (isPaused) return;

  if (!isGameStarted) {
    isGameStarted = true;
    timerInterval = setInterval(updateTimer, 1000);
  }

  score++;
  scoreDisplay.textContent = score;

  time = initialTime;
  timerDisplay.textContent = time;

  moveSquare();
});

// Кнопка Пауза / Продовжити
pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "▶️ Продовжити" : "⏸️ Пауза";
});

window.onload = centerSquare;

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === " ") {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "▶️ Продовжити" : "⏸️ Пауза";
  }
});

function saveResult(nickname, difficulty, score) {
  const records = JSON.parse(localStorage.getItem("records") || "[]");
  records.push({ nickname, difficulty, score });
  localStorage.setItem("records", JSON.stringify(records));
}