const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScoresList = document.querySelector("#highScoresList");
const goBackBtn = document.getElementById("go-back");
const goHomeBtn = document.getElementById("go-home");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
  console.log(score);
  console.log(username);

  localStorage.setItem("highScores", JSON.stringify(highScores));
};
const clear = () => {
  localStorage.clear();
};

goBackBtn.addEventListener("click", clear);
goHomeBtn.addEventListener("click", clear);
