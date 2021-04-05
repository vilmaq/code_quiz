const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const timeText = document.querySelector("#time");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is the Difference Between Var and Const in JavaScript",
    choice1:
      "var declarations are globally scoped or function scoped while let and const are block scoped",
    choice2: "Var variables cannot be updated and re-declared within its scope",
    choice3: "Const variables can be updated or re-declared",
    choice4: "Var variables are memory-performant",
    answer: 1,
  },
  {
    question: "What generation language is SQL?",
    choice1: "Fourth-generation language",
    choice2: "Second-generation language",
    choice3: "Fifth-generation language",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question: "What is an object in JavaScript?",
    choice1:
      "Objects in JavaScript may be defined as an unordered collection of related data,in the form of “key: value” pairs",
    choice2: "An optional list of properties",
    choice3: "a Vector",
    choice4: "an Array",
    answer: 1,
  },
  {
    question: "What is the function of fetch() method in JS?",
    choice1:
      "A method used  to return a promise that resolves into a Response object",
    choice2: "A method used to handle a failure request",
    choice3: "An API exit call%",
    choice4: "An API incoming call",
    answer: 1,
  },
  {
    question: "What is the function of push() method in JS?",
    choice1:
      "A method used  to return a promise that resolves into a Response object",
    choice2: "A method used to handle a failure request",
    choice3: "An API exit call%",
    choice4:
      "The push() method adds new items to the end of an array, and returns the new length",
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  let time = countdown();
};

function countdown() {
  let timeLeft = 10;

  const callback = function () {
    if (timeLeft === 0) {
      timeText.textContent = `${timeLeft}`;
      return window.location.assign("highscores.html");
    }
    if (timeLeft > 0) {
      timeText.textContent = `${timeLeft}`;
      timeLeft -= 1;
    }
  };
  const timeInterval = setInterval(callback, 1000);
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("highscores.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();
