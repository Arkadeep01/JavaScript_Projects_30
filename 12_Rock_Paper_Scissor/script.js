const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const result_p = document.querySelector(".current-status p");
const finalResult_p = document.getElementById("final-message");
const movesLeft_span = document.getElementById("moves-left");
const choices = document.querySelectorAll(".choice");
const popup = document.getElementById("popup");
const reloadBtn = document.getElementById("popup-reload");

let userScore = 0;
let computerScore = 0;
let moves = 10;
let isGameOver = false;

// Get Computer's Choice
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissor'];
  const randomIdx = Math.floor(Math.random() * 3);
  return choices[randomIdx];
}

// Convert id to readable format
function convertToWord(choice) {
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

// Game Logic
function game(userChoice) {
  if (isGameOver) return;

  const computerChoice = getComputerChoice();
  const combo = userChoice + computerChoice;

  switch (combo) {
    case 'rockscissor':
    case 'paperrock':
    case 'scissorpaper':
      win(userChoice, computerChoice);
      break;

    case 'rockpaper':
    case 'paperscissor':
    case 'scissorrock':
      lose(userChoice, computerChoice);
      break;
    
    default:
      draw(userChoice, computerChoice);
      break;
  }

  moves--;
  movesLeft_span.textContent = moves;

  if (moves === 0) {
    endGame();
  }
}

function win(user, comp) {
  userScore++;
  userScore_span.textContent = userScore;
  result_p.textContent = `${convertToWord(user)} beats ${convertToWord(comp)}. You WIN !!`;
}

function lose(user, comp) {
  computerScore++;
  computerScore_span.textContent = computerScore;
  result_p.textContent = `${convertToWord(comp)} beats ${convertToWord(user)}. You LOSE !!`;
}

function draw(user, comp) {
  result_p.textContent = `Both chose ${convertToWord(user)}. It's a DRAW !`;
}

function endGame() {
  isGameOver = true;
  let finalMsg = '';

  if (userScore > computerScore) {
    finalMsg = "Congratulations! You won the game!";
  } else if (userScore < computerScore) {
    finalMsg = "Oops! Computer won the game!";
  } else {
    finalMsg = "It's a Tie!";
  }

  finalResult_p.textContent = finalMsg;
  popup.classList.add("active");
}

// Event Listeners
choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const userChoice = choice.id;
    game(userChoice);
  });
});

// Restart the game
reloadBtn.addEventListener('click', () => {
  userScore = 0;
  computerScore = 0;
  moves = 10;
  isGameOver = false;

  userScore_span.textContent = "0";
  computerScore_span.textContent = "0";
  result_p.textContent = "Make Your Move";
  finalResult_p.textContent = "";
  movesLeft_span.textContent = "10";

  popup.classList.remove("active");

  choices.forEach(choice => {
    choice.style.opacity = 1;
    choice.style.pointerEvents = "auto";
  });
});