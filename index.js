let ulHide = document.getElementById("hide-ul");
let ul = document.getElementsByClassName("nv");
let lis = document.querySelectorAll(".hidd");
let ul_state = "not";

ulHide.onclick = function (e) {
  if (ul_state === "not") {
    lis.forEach((item) => item.classList.add("hidden"));
    ul_state = "yes";
  } else {
    lis.forEach((item) => item.classList.remove("hidden"));
    ul_state = "not";
  }
};

let allColors = document.querySelectorAll(".colors span");
let red = document.getElementById("red");
let blue = document.getElementById("blue");
let yellow = document.getElementById("yellow");
let green = document.getElementById("green");
let arrow = document.getElementById("arrow");
let up = document.getElementById("up");
let inputs = document.querySelector(".inputs");
let create = document.querySelector(".inputs button");
let title = document.getElementById("title");
let notes = document.querySelector(".notes");
let note = document.getElementById("note");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 140) {
    up.classList.add("up-1");
  } else {
    up.classList.remove("up-1");
  }
});
up.onclick = function () {
  window.scrollTo(0, 0);
};

if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color"),
  );
  allColors.forEach((span) => {
    span.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${localStorage.getItem("color")}"]`)
    .classList.add("active");
  arrow.style.backgroundColor =
    document.documentElement.style.getPropertyValue("--main-color");
  up.style.backgroundColor =
    document.documentElement.style.getPropertyValue("--main-color");
  inputs.style.backgroundColor =
    document.documentElement.style.getPropertyValue("--main-color");
  title.style.backgroundColor =
    document.documentElement.style.getPropertyValue("--main-color");
  notes.style.backgroundColor =
    document.documentElement.style.getPropertyValue("--main-color");
} else {
}

allColors.forEach((span) => {
  span.addEventListener("click", (e) => {
    allColors.forEach((span) => {
      span.classList.remove("active");
    });
    e.target.classList.add("active");
    localStorage.setItem("color", e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      localStorage.getItem("color"),
    );
    arrow.style.backgroundColor =
      document.documentElement.style.getPropertyValue("--main-color");
    up.style.backgroundColor =
      document.documentElement.style.getPropertyValue("--main-color");
    inputs.style.backgroundColor =
      document.documentElement.style.getPropertyValue("--main-color");
    title.style.backgroundColor =
      document.documentElement.style.getPropertyValue("--main-color");
    notes.style.backgroundColor =
      document.documentElement.style.getPropertyValue("--main-color");
  });
});

let colors = document.querySelector(".colors");
let arro = false;
arrow.onclick = function () {
  if (arro === false) {
    arro = true;
    colors.classList.add("col");
    arrow.classList.add("arrowi");
  } else {
    arro = false;
    arrow.classList.remove("arrowi");
    colors.classList.remove("col");
  }
};

let arr = JSON.parse(localStorage.getItem("Note")) || [];

function saveNote() {
  localStorage.setItem("Note", JSON.stringify(arr));
}

let notebox = document.querySelector(".notebox");
function displayNotes() {
  const now = new Date();
  let day = now.getDate();
  let year = now.getFullYear();
  let month = now.getMonth();
  let minutes = now.getMinutes();
  let hours = now.getHours() - 12;
  let fullDate = `${hours}:${minutes} - ${day} / ${month} / ${year} `;
  notes.innerHTML = "";
  arr.forEach((task) => {
    const p = document.createElement("p");
    const span = document.createElement("span");
    const date = document.createTextNode(`${fullDate}`);
    span.appendChild(date);
    p.innerHTML = `${task}`;
    notebox.appendChild(p);
    notebox.append(span);
    notes.appendChild(notebox);
  });
}
create.onclick = function () {
  if (note.value != "") {
    let task = note.value.trim();
    arr.push(task);
    note.value = "";
    note.focus();
    saveNote();
    displayNotes();
  }
};
displayNotes();
