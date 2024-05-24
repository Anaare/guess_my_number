'use strict';
/* Select DOM Elements  */
const message = document.querySelector('.message');
const userNumber = document.querySelector('.number');
const score = document.querySelector('.score');
const guess = document.querySelector('.guess');
const checkScoreBtn = document.querySelector('button.btn.check');
const highscore = document.querySelector('.highscore');
const restartBtn = document.querySelector('button.btn.again');

/* Create a Random Number For Guess */
function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  return randomNumber;
}

/* Game Logic */
let tries = 20;
let randomNumber = generateRandomNumber();
function numberOfTries() {
  if (tries > 0) {
    tries -= 1;
    score.textContent = tries;
  }
}

function restrictTrying() {
  if (tries === 0) {
    score.textContent = 'You are out of tries 😓';
    document.body.style.backgroundColor = '#ff0000';
    guess.disabled = true;
    checkScoreBtn.disabled = true;
  }
}

function checkGuess() {
  if (guess.value > 0 && guess.value <= 20) {
    userNumber.textContent = guess.value;
    // Losing
    if (randomNumber < Number(guess.value)) {
      message.textContent = 'pick a lower number..';
      guess.value = '';
      numberOfTries();
      restrictTrying();
    } else if (randomNumber > Number(guess.value)) {
      message.textContent = 'pick a higher number..';
      guess.value = '';
      numberOfTries();
      restrictTrying();
    }

    // Winning
    if (randomNumber === Number(guess.value)) {
      message.textContent = '🎉Correct Guess!';
      document.body.style.backgroundColor = '#32CD32';
      guess.value = '';
      if (Number(score.textContent) > Number(highscore.textContent)) {
        highscore.textContent = score.textContent;
      }
      restrictTrying();
    }
  } else {
    alert('Please, type a number between 1 and 20!');
  }
}

checkScoreBtn.addEventListener('click', checkGuess);
guess.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    checkGuess();
  }
});

// Restart game
restartBtn.addEventListener('click', () => {
  message.textContent = 'Start guessing...';
  guess.textContent = '';
  score.textContent = '20';
  userNumber.textContent = '?';
  document.body.style.backgroundColor = '#222';
  guess.disabled = false;
  checkScoreBtn.disabled = false;
  tries = 20;
  randomNumber = generateRandomNumber();
});
