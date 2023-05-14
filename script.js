const questions = [
    {
        question: "Why must the script.js file go at the bottom of the html?",
        answers: [
        { text: "because it won't work otherwise", correct: false},
        { text: "it would cause compatibility issues if not", correct: false},
        { text: "it helps the page load faster", correct: true},
        { text: "it helps different devices recognize it better", correct: false}
        ]        
    },
    {
        question: "The condition in an if/ else statement is enclosed with _________",
        answers: [
        { text: "quotes", correct: false},
        { text: "curly brackets", correct: false},
        { text: "parenthesis", correct: true},
        { text: "square brackets", correct: false}
        ]
    },
    {
        question: "A very useful tool for publicly storing code",
        answers: [
        { text: "Github/Bash", correct: true},
        { text: "Git", correct: false},
        { text: "Devconsole", correct: false},
        { text: "intellij", correct: false}
        ]
    },
    {
        question: "What is a Variable?",
        answers: [
        { text: "a string", correct: false},
        { text: "a value", correct: true},
        { text: "a boolean", correct: false},
        { text: "a stored loop that can change depending on the function and parameters", correct: false}
        ]
    },
    {
        question: "what does DOM stand for?",
        answers: [
        { text: "Document Operation Manipulator", correct: false},
        { text: "Developer Operation Model", correct: false},
        { text: "Document Object Mover", correct: false},
        { text: "Document Object Model", correct: true}
        ]
    }
];

const scoreboard = [];

const scoreboardSection = document.querySelector(".score-board");
const scoreboardBody = document.getElementById("scoreboard-body");

const startQuizBtn = document.querySelector('#startqz-btn');
const questionHeader = document.querySelector('#question');
const answerSection = document.querySelector('#answer-buttons');
const answerButtons = document.querySelectorAll('#answer-buttons .btn');

var questionIndex = 0;
let timerInterval;
let timeRemaining = 50; // 60 seconds for example
scoreboardSection.style.display = 'none';
answerSection.style.display = 'none';

function addScore(initials, score) {
  const newRow = document.createElement("tr");
  const initialsCell = document.createElement("td");
  const scoreCell = document.createElement("td");

  initialsCell.textContent = initials;
  scoreCell.textContent = score;

  newRow.appendChild(initialsCell);
  newRow.appendChild(scoreCell);

  scoreboardBody.appendChild(newRow);
}

function endChallenge() {
  questionHeader.style.display = 'none';
  answerSection.style.display = 'none';
  scoreboardSection.style.display = '';
  let playerInitials = prompt("Your time is up! Enter your initials to save your score:"); // prompt for initials
  addScore(playerInitials, timeRemaining); 

  questionIndex = 0; //reset index to 0?
}

function updateTimer() {
  timeRemaining--;
  if (timeRemaining <= 0) {
    timeRemaining = 0;
    clearInterval(timerInterval); // stop the timer
    endChallenge();
  }

  document.getElementById("time").textContent = timeRemaining;
}

function handleAnswerClick() {
  // Check if the answer is correct  
  if (this.dataset.correct == 'true') {
    console.log('Correct!');
  } else {
    console.log('Wrong!');
    timeRemaining -= 10;
  }
  this.removeEventListener('click', handleAnswerClick);
  quizButtonPressed();
}

function resetAnswerButtons(activeQuestion) {
  // Update the text of the answer buttons with the answer options of the selected question
  activeQuestion.answers.forEach((answer, index) => {
    var answerBtn = answerButtons[index];

    answerBtn.textContent = answer.text;
    answerBtn.dataset.correct = answer.correct;
    
    // Add an event listener to the answer button
    answerBtn.addEventListener('click', handleAnswerClick);
  });
}

function quizButtonPressed() {
  if (questionIndex == 0) {
    timerInterval = setInterval(updateTimer, 1000); // start the timer
    answerSection.style.display = '';
  }
  if (questionIndex >= questions.length) {
    console.log("Index is too large!");
    return;
  }

  var currentQuestion = questions[questionIndex];
  
  // Changing the text of the question
  questionHeader.textContent = currentQuestion.question;
  
  resetAnswerButtons(currentQuestion);
  
  questionIndex += 1;
}

startQuizBtn.addEventListener('click', quizButtonPressed);