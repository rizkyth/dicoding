const localTotalVictories = document.getElementById("local-total-victory-field");
const localMaximumAttempts = document.getElementById("local-maximum-attempt-field");
const destroyDataButton = document.getElementById("destroy-data-button");
const playButton = document.getElementById("play-button");
const beforeGameDisplay = document.getElementById("before-game-display");
const duringGameDisplay = document.getElementById("during-game-display");
const afterGameDisplay = document.getElementById("after-game-display");
const answerButton1 = document.getElementById("answer-1-button");
const answerButton2 = document.getElementById("answer-2-button");
const answerButton3 = document.getElementById("answer-3-button");
const sessionUserAnswerField = document.getElementById("session-user-answer-field");
const sessionUserWrongAnswerField = document.getElementById("session-user-wrong-answer-field");
const sessionUserTrueAnswerField = document.getElementById("session-true-answer-field");
const sessionUserAttemptsField = document.getElementById("session-user-attempts-amount-field");

function getAnswer() {
  let answer = "123".split("");
  for (let i = 0; i < answer.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = answer[i];
    answer[i] = answer[j];
    answer[j] = temp;
  }
  return answer.join("");
}

const sessionAnswerKey = "SESSION_ANSWER";
const sessionUserAttemptsKey = "SESSION_USER_ATTEMPTS";
const sessionUserIsPlayingKey = "SESSION_USER_IS_PLAYING";
const localTotalVictoriesKey = "LOCAL_TOTAL_VICTORIES";
const localMaximumAttemptsKey = "LOCAL_MAXIMUM_ATTEMPTS";

window.addEventListener("load", () => {
  if (typeof Storage !== "undefined") {
    if (sessionStorage.getItem(sessionAnswerKey) === null) {
      sessionStorage.setItem(sessionAnswerKey, "");
    }
    if (sessionStorage.getItem(sessionUserAttemptsKey) === null) {
      sessionStorage.setItem(sessionUserAttemptsKey, 0);
    }
    if (sessionStorage.getItem(sessionUserIsPlayingKey) === null) {
      sessionStorage.setItem(sessionUserIsPlayingKey, false);
    }
    if (localStorage.getItem(localMaximumAttemptsKey) === null) {
      localStorage.setItem(localMaximumAttemptsKey, 0);
    }
    if (localStorage.getItem(localTotalVictoriesKey) === null) {
      localStorage.setItem(localTotalVictoriesKey, 0);
    }
  } else {
    alert("Your browser does not support local storage.");
  }

  sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
  localTotalVictories.innerText = localStorage.getItem(localTotalVictoriesKey);
  localMaximumAttempts.innerText = localStorage.getItem(localMaximumAttemptsKey);
});

playButton.addEventListener("click", () => {
  sessionStorage.setItem(sessionAnswerKey, getAnswer());
  sessionStorage.setItem(sessionUserIsPlayingKey, true);
  beforeGameDisplay.setAttribute("hidden", true);
  duringGameDisplay.removeAttribute("hidden");
});

answerButton1.addEventListener("click", () => {
  sessionUserAnswerField.innerText += 1;
  if (sessionUserAnswerField.innerText.length === 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});

answerButton2.addEventListener("click", () => {
  sessionUserAnswerField.innerText += 2;
  if (sessionUserAnswerField.innerText.length === 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});
answerButton3.addEventListener("click", () => {
  sessionUserAnswerField.innerText += 3;
  if (sessionUserAnswerField.innerText.length === 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});

function checkAnswer(userAnswer) {
  const answer = sessionStorage.getItem(sessionAnswerKey);
  if (userAnswer == answer) {
    duringGameDisplay.setAttribute("hidden", true);
    afterGameDisplay.removeAttribute("hidden");
    sessionUserTrueAnswerField.innerText = answer;
    updateScore();
  } else {
    const previousAttempts = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
    sessionStorage.setItem(sessionUserAttemptsKey, previousAttempts + 1);
    sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
    sessionUserAnswerField.innerText = "";
    sessionUserWrongAnswerField.innerText = userAnswer;
  }
}

function updateScore() {
  const sessionAttemptsValue = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
  const localAttemptsValue = parseInt(localStorage.getItem(localMaximumAttemptsKey));
  if (sessionAttemptsValue > localAttemptsValue) {
    localStorage.setItem(localMaximumAttemptsKey, sessionAttemptsValue);
    localMaximumAttempts.innerText = sessionAttemptsValue;
  }
  const previousTotalVictories = parseInt(localStorage.getItem(localTotalVictoriesKey));
  localStorage.setItem(localTotalVictoriesKey, previousTotalVictories + 1);
  localTotalVictories.innerText = localStorage.getItem(localTotalVictoriesKey);
}

destroyDataButton.addEventListener("click", () => {
  sessionStorage.removeItem(sessionAnswerKey);
  sessionStorage.removeItem(sessionUserAttemptsKey);
  sessionStorage.removeItem(sessionUserIsPlayingKey);
  localStorage.removeItem(localTotalVictoriesKey);
  localStorage.removeItem(localMaximumAttemptsKey);
  alert("All data has been cleared.");
});

window.addEventListener("beforeunload", () => {
  sessionUserAnswerField.innerText = "";
  sessionUserWrongAnswerField.innerText = "";
  sessionStorage.setItem(sessionUserAttemptsKey, 0);
  sessionUserAnswerField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
});
