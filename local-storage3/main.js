const storageKey = "STORAGE_KEY";
const submitAction = document.getElementById("form-data-user");

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putUserList(data) {
  if (checkForStorage()) {
    let userData = [];
    if (localStorage.getItem(storageKey) !== null) {
      userData = JSON.parse(localStorage.getItem(storageKey));
    }
    userData.unshift(data);
    if (userData.length > 5) {
      userData.pop();
    }
    localStorage.setItem(storageKey, JSON.stringify(userData));
  }
}

function getUserList() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } else {
    return [];
  }
}

function renderUserList() {
  const userData = getUserList();
  const userList = document.getElementById("user-list-detail");

  userList.innerHTML = "";
  for (let user of userData) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.nama}</td>`;
    row.innerHTML += `<td>${user.umur}</td>`;
    row.innerHTML += `<td>${user.domisili}</td>`;

    userList.appendChild(row);
  }
}
submitAction.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputNama = document.getElementById("nama");
  const inputUmur = document.getElementById("umur");
  const inputDomisili = document.getElementById("domisili");

  const userNewData = {
    nama: inputNama.value,
    umur: inputUmur.value,
    domisili: inputDomisili.value,
  };

  putUserList(userNewData);
  renderUserList();
});

window.addEventListener("load", function () {
  if (checkForStorage()) {
    if (localStorage.getItem(storageKey) !== null) {
      renderUserList();
    }
  } else {
    alert("Browser kamu tidak mendukung local storage");
  }
});
