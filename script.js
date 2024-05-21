const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");

let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
let filter = '';

function getTodoHtml(todo, index) {
  if (filter && filter !== 'all' && filter !== todo.status) {
    return '';
  }
  const checked = todo.status === "completed" ? "checked" : "";
  return /* html */ `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `;
}

function showTodos() {
  if (todosJson.length === 0) {
    todosHtml.innerHTML = '';
    emptyImage.style.display = 'block';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    emptyImage.style.display = 'none';
  }
}

function addTodo() {
  const todo = input.value.trim();
  if (!todo) return;
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

addButton.addEventListener("click", () => {
  addTodo();
});

function updateStatus(todo) {
  const todoIndex = parseInt(todo.id, 10);
  if (todo.checked) {
    todosJson[todoIndex].status = "completed";
  } else {
    todosJson[todoIndex].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

function remove(todo) {
  const index = parseInt(todo.dataset.index, 10);
  todosJson.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

filters.forEach((el) => {
  el.addEventListener("click", () => {
    filters.forEach(tag => tag.classList.remove('active'));
    el.classList.add('active');
    filter = el.dataset.filter || '';
    showTodos();
  });
});

deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});

showTodos();
