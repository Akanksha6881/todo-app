const inputBox = document.getElementById("input-box");
const priorityBox = document.getElementById("priority-box");
const listContainer = document.getElementById("list-container");

// Add task
function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === '') {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  const p = document.createElement("p");
  p.textContent = taskText;
  p.classList.add("priority-" + priorityBox.value);
  p.style.marginRight = "50px";
  li.appendChild(p);

  const span = document.createElement("span");
  span.innerHTML = "&#10006;";
  li.appendChild(span);

  listContainer.appendChild(li);
  inputBox.value = "";
  saveData();
}

// Clicks & Deletes
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.tagName === "P") {
    const newText = prompt("Edit Task", e.target.textContent);
    if (newText) {
      e.target.textContent = newText;
      saveData();
    }
  }
});

// Add on Enter key
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Save to LocalStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load from LocalStorage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

// Clear all tasks
function clearAll() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    listContainer.innerHTML = "";
    saveData();
  }
}

showTask();
