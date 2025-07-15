const container = document.getElementById("container");
console.log(container);

const div = document.createElement("div");
container.appendChild(div);
div.className = "button";
div.textContent = "Click Me";

const div2 = document.querySelector(".button");

const button = document.querySelectorAll(".button");

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", function () {
    console.log("Button clicked!");
    this.style.backgroundColor = "blue";
    this.style.color = "white";
  });
  button[i].addEventListener("mouseover", function () {
    this.style.backgroundColor = "green";
  });
  button[i].addEventListener("mouseout", function () {
    this.style.backgroundColor = "";
    this.style.color = "";
  });
}
window.addEventListener("scroll", function () {
  if (document.documentElement.scrollTop > 100) {
    container.style.backgroundColor = "lightblue";
    button.forEach((btn) => {
      btn.style.position = "fixed";
    });
  } else {
    container.style.backgroundColor = "";
    button.forEach((btn) => {
      btn.style.position = "static";
    });
  }
});
