const quiz = [
  { q: "Pola hidup sehat adalah...", a: ["Kebiasaan makan banyak", "Cara hidup sehat", "Main terus", "Tidur tidak teratur"], correct: 1 },
  { q: "Makanan sehat adalah...", a: ["Junk food", "Sayur dan buah", "Makanan instan", "Makanan berlemak"], correct: 1 },
  { q: "Olahraga membuat tubuh...", a: ["Lemah", "Sakit", "Sehat dan bugar", "Lelah"], correct: 2 },
  { q: "Waktu tidur remaja...", a: ["3-4 jam", "5-6 jam", "7-9 jam", "10-12 jam"], correct: 2 },
  { q: "Minum air bertujuan...", a: ["Menambah lapar", "Menjaga cairan tubuh", "Mengantuk", "Gemuk"], correct: 1 },
  { q: "Yang tidak sehat adalah...", a: ["Olahraga", "Makan bergizi", "Merokok", "Istirahat"], correct: 2 },
  { q: "Cuci tangan untuk...", a: ["Hemat air", "Bunuh kuman", "Segar", "Bau hilang"], correct: 1 },
  { q: "Lingkungan bersih...", a: ["Menambah penyakit", "Mencegah penyakit", "Kotor", "Panas"], correct: 1 },
  { q: "Sarapan penting karena...", a: ["Ngantuk", "Energi", "Malas", "Cepat lapar"], correct: 1 },
  { q: "Sikap sehat adalah...", a: ["Begadang", "Tidak olahraga", "Konsisten hidup sehat", "Makan sembarang"], correct: 2 }
];

let current = 0;
let score = 0;
let lives = 3;
let timer;
let timeLeft = 10;

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  resetTimer();
  const q = quiz[current];
  document.getElementById("question").innerText = q.q;
  document.getElementById("lives").innerText = lives;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.a.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => checkAnswer(btn, index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(button, index) {
  clearInterval(timer);

  if (index === quiz[current].correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    lives--;
  }

  setTimeout(nextStep, 800);
}

function nextStep() {
  current++;

  if (lives <= 0 || current >= quiz.length) {
    endGame();
  } else {
    loadQuestion();
  }
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("timer").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      lives--;
      clearInterval(timer);
      nextStep();
    }
  }, 1000);
}

function endGame() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  document.getElementById("final-score").innerText = `Skor: ${score}/${quiz.length}`;

  if (score >= 7) {
    document.getElementById("final-text").innerText = "🔥 Hebat! Kamu sehat banget!";
  } else {
    document.getElementById("final-text").innerText = "💡 Ayo hidup lebih sehat lagi!";
  }
}

function restartGame() {
  current = 0;
  score = 0;
  lives = 3;

  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}