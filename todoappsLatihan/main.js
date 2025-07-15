const tasks = [];
const RENDER_EVENT = "render-task";
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("form");
  submitButton.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("name").value;

    const desc = document.getElementById("descripsi").value;

    const timestamp = document.getElementById("date").value;

    const id = generatedId();

    const newTask = generateTaskObject(id, title, desc, timestamp);
    tasks.push(newTask);

    document.dispatchEvent(new Event(RENDER_EVENT));
  });
});

function renderAllTask() {
  const taskContainer = document.getElementById("task-list");
  taskContainer.innerHTML = "";
  for (const task of tasks) {
    const element = makeTaskUpdate(task);
    taskContainer.appendChild(element);
  }
}
function generateTaskObject(id, task, desc, timestamp) {
  return {
    id,
    task,
    desc,
    timestamp,
    doneLog: {},
  };
}
const generatedId = () => {
  return +new Date();
};

document.addEventListener(RENDER_EVENT, () => {
  renderAllTask();
});

function makeTaskUpdate(tasks) {
  const textContainer = document.createElement("li");
  textContainer.setAttribute(`id`, `${tasks.id}`);
  textContainer.style.listStyle = "none";

  const textTask = document.createElement("h2");
  textTask.innerText = tasks.task;

  const desc = document.createElement("h3");
  desc.innerText = tasks.desc;

  const timestamp = document.createElement("p");
  timestamp.innerText = tasks.timestamp;

  const today = getKeysToday();
  const isDoneToday = tasks.doneLog[today];

  const progress = getProgressInThisWeek(tasks);
  const progressText = document.createElement("p");
  progressText.innerText = `progress ${progress.done} ${progress.total} ${progress.percent}`;

  const donebtn = document.createElement("button");
  donebtn.innerText = isDoneToday ? "✅ Sudah hari ini" : "Done Today";
  donebtn.disabled = isDoneToday;

  donebtn.addEventListener("click", () => {
    tasks.doneLog[today] = true;
    console.log("✔ Disimpan DONE:", today, "Untuk task:", tasks.task);
    document.dispatchEvent(new Event(RENDER_EVENT));
  });
  textContainer.append(textTask, desc, timestamp, progressText, donebtn);
  return textContainer;
}

function getKeysToday() {
  return new Date().toLocaleDateString("en-CA");
}

function getProgressInThisWeek(task) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let created = new Date(task.timestamp + "T00:00:00");
  if (isNaN(created.getTime())) {
    created = new Date(today);
  }
  created.setHours(0, 0, 0, 0);

  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() >= created.getTime()) {
      const key = date.toLocaleDateString("en-CA");
      dates.push(key);
    }
  }
  let done = 0;
  for (const date of dates) {
    if (task.doneLog[date]) done++;
  }
  const total = dates.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}
