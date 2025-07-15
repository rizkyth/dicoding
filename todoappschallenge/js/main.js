document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addHabits();
  });
});

const todos = [];
const RENDER_EVENT = "render-todo";

document.addEventListener(RENDER_EVENT, function () {
  console.log(todos);

  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";
  for (const todoItem of todos) {
    const todoElement = makeHabits(todoItem);
    uncompletedTODOList.append(todoElement);
  }
});

function addHabits() {
  const todo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const generateID = generateId();
  const AddHabitsObject = generateHabitsObject(generateID, todo, timestamp, null);

  todos.push(AddHabitsObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}

function generateHabitsObject(id, task, timestamp, lastDone) {
  return {
    id,
    task,
    timestamp,
    lastDone,
  };
}

function makeHabits(habitsObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = habitsObject.task;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = habitsObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item");
  container.append(textContainer);
  container.setAttribute("id", `todo-${habitsObject.id}`);

  if (checkIftoday(habitsObject.lastDone)) {
    const doneText = document.createElement("p");
    doneText.innerText = "✔ Done Today!";
    doneText.classList.add("done-text");
    container.append(doneText);
  } else {
    const doneButton = document.createElement("button");
    doneButton.innerText = "Done Today";
    doneButton.classList.add("check-button");
    doneButton.addEventListener("click", function () {
      markHabitAsDoneToday(habitsObject.id);
    });
    container.append(doneButton);
  }
  return container;
}

function checkIftoday(timestamp) {
  if (!timestamp) return false;
  const today = new Date();
  const lastDone = new Date(timestamp);
  console.log(lastDone);
  return today.getDate() === lastDone.getDate() && today.getMonth() === lastDone.getMonth() && today.getFullYear() === lastDone.getFullYear();
}

function markHabitAsDoneToday(todoId) {
  const todo = findTodo(todoId);
  if (!todo) return;
  todo.lastDone = Date.now();
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodo(todoId) {
  console.log("findtodo");
  return todos.find((todo) => {
    return todo.id === todoId;
  });
}
