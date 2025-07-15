// const localStorageKey = "PRESS_FREQUENCY";

// if (typeof Storage !== "undefined") {
//   if (localStorage.getItem(localStorageKey) === null) {
//     localStorage.setItem(localStorageKey, 0);
//   }

//   const incrementButton = document.querySelector("#incrementButton");
//   const clearButton = document.querySelector("#clear");
//   const countDisplay = document.querySelector("#count");

//   countDisplay.innerText = localStorage.getItem(localStorageKey);

//   incrementButton.addEventListener("click", function () {
//     let count = localStorage.getItem(localStorageKey);
//     count++;
//     localStorage.setItem(localStorageKey, count);
//     countDisplay.innerText = localStorage.getItem(localStorageKey);
//   });

//   clearButton.addEventListener("click", function () {
//     localStorage.removeItem(localStorageKey);
//     countDisplay.innerText = 0;
//   });
// } else {
//   alert("Browser Anda tidak mendukung Web Storage");
// }

// session storage

const sessionStorageKey = "PRESS_FREQUENCY";

if (typeof Storage !== "undefined") {
  if (sessionStorage.getItem(sessionStorageKey) === null) {
    sessionStorage.setItem(sessionStorageKey, 0);
  }
  const incrementButton = document.querySelector("#incrementButton");
  const clearButton = document.querySelector("#clear");
  const countDisplay = document.querySelector("#count");
  countDisplay.innerText = sessionStorage.getItem(sessionStorageKey);

  incrementButton.addEventListener("click", function () {
    let count = sessionStorage.getItem(sessionStorageKey);
    count++;
    sessionStorage.setItem(sessionStorageKey, count);
    countDisplay.innerText = sessionStorage.getItem(sessionStorageKey);
  });

  clearButton.addEventListener("click", function () {
    sessionStorage.removeItem(sessionStorageKey);
    countDisplay.innerText = 0;
  });
} else {
  alert("Browser Anda tidak mendukung Web Storage");
}
