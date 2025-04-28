// Функція для початку гри
function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    const color = document.getElementById("color").value;
    const nickname = document.getElementById("nickname").value;
  
    if (!difficulty || !color || !nickname.trim()) {
      alert("Будь ласка, оберіть складність, колір та введіть нікнейм!");
      return;
    }
  
    // Зберігаємо вибір користувача в localStorage
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("color", color);
    localStorage.setItem("nickname", nickname.trim());
  
    window.location.href = "game.html"; // Переходимо до гри
  }
  
  // Відновлення даних після перезавантаження головної сторінки
  window.onload = () => {
    const difficulty = localStorage.getItem("difficulty");
    const color = localStorage.getItem("color");
    const nickname = localStorage.getItem("nickname");
  
    if (difficulty) {
      document.getElementById("difficulty").value = difficulty;
    }
  
    if (color) {
      document.getElementById("color").value = color;
    }
  
    if (nickname) {
      document.getElementById("nickname").value = nickname;
    }
  
    // Виведення рекордів
    const records = JSON.parse(localStorage.getItem("records") || "[]");
    const tableBody = document.querySelector("#recordsTable tbody");
    records.sort((a, b) => b.score - a.score);
  
    for (let r of records.slice(0, 10)) {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${r.nickname}</td><td>${r.difficulty}</td><td>${r.score}</td>`;
      tableBody.appendChild(row);
    }
  };  