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
  //disable save button if no username entered
  saveScoreBtn.disabled = !username.value;
});

// create obj score with two keys score and name
saveHighScore = () => {
  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  //push the object created to the Array highscores previously created
  highScores.push(score);

  // store the result in Local Storage

  localStorage.setItem("highScores", JSON.stringify(highScores));
  username.innerText = highScores["name"];
};
const clear = () => {
  localStorage.clear();
};

goBackBtn.addEventListener("click", clear);
goHomeBtn.addEventListener("click", clear);
