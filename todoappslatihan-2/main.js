const topics = [];
const RENDER_EVENT = "topics-render";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const textStudy = document.getElementById("topic").value;
    const textTimestamp = document.getElementById("date").value;

    const id = generatedId();
    const newTopics = generatedStudyObject(id, textStudy, textTimestamp);
    topics.push(newTopics);
    form.reset();
    document.dispatchEvent(new Event(RENDER_EVENT));
  });
});

function renderAllStudy() {
  const studyContainer = document.getElementById("topics");
  studyContainer.innerHTML = "";

  for (const topic of topics) {
    const element = makeStudyElement(topic);
    studyContainer.appendChild(element);
  }
}
function getTodayDateKey() {
  return new Date().toISOString().split("T")[0];
}

function generatedId() {
  return +new Date();
}

function generatedStudyObject(id, task, timestamp) {
  return {
    id,
    task,
    timestamp,
    doneLog: {},
  };
}

function makeStudyElement(topic) {
  const container = document.createElement("div");
  container.classList.add("item");

  const title = document.createElement("h2");
  title.innerText = topic.task;

  const time = document.createElement("p");
  time.innerText = `Study di tambahkan pada : ${topic.timestamp}`;

  const today = getTodayDateKey();
  const isDoneToday = topic.doneLog[today];

  const progress = getStudyProgressThisWeek(topic);
  const progressText = document.createElement("p");
  progressText.innerText = `Progress minggu ini: ${progress.done}/${progress.total} hari (${progress.percent}%)`;

  const doneBtn = document.createElement("button");
  doneBtn.innerText = isDoneToday ? "✅ Sudah hari ini" : "Done Today";
  doneBtn.disabled = isDoneToday;
  doneBtn.classList.add("check-button");

  doneBtn.addEventListener("click", () => {
    topic.doneLog[today] = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
  });

  container.append(title, time, progressText, doneBtn);
  return container;
}

function getStudyProgressThisWeek(topic) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // buang jam, menit, detik, ms

  const createdDate = new Date(topic.timestamp + "T00:00:00");
  createdDate.setHours(0, 0, 0, 0);

  const dates = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0); // buang jam supaya valid

    if (date >= createdDate) {
      const key = date.toISOString().split("T")[0];
      dates.push(key);
    }
  }

  let done = 0;
  for (const date of dates) {
    console.log(`topic ${topic.doneLog[date]}`);
    console.log(`date ${date}`);
    if (topic.doneLog[date]) done++;
  }

  const total = dates.length;
  const percent = total == 0 ? 0 : Math.round((done / total) * 100);
  console.log(percent);

  // Debug ulang
  console.log("Tanggal yang dihitung minggu ini:", dates);
  console.log("Log harian:", topic.doneLog);
  console.log("Progress:", { done, total, percent });

  return {
    done,
    total,
    percent,
  };
}

document.addEventListener(RENDER_EVENT, () => {
  renderAllStudy();
});
