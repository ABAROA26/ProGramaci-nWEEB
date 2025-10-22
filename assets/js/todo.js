function getTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const newTask = document.getElementById("task_name").value.trim();
  if (newTask === "") return false;

  tasks.push({ text: newTask, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("task_name").value = "";

  updateTodoList();
  return false;
}

function updateTodoList() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let lista = "<ol>";
  tasks.forEach((task, index) => {
    lista += `
      <li >
        <div >
          <input 
            type="checkbox" 
            ${task.done ? "checked" : ""} 
            onchange="toggleDone(${index})"
            style="cursor:pointer;"
          >
         
            ${task.text}
          
        </div>
         <button id=editar onclick="editTask(${index})">Editar</button>
        <button onclick="deleteTask(event, ${index})"
                >
          Eliminar
        </button>
      </li>`;
  });
  lista += "</ol>";

  document.getElementById("todo_list").innerHTML = lista;
}

function toggleDone(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTodoList();
}

function deleteTask(event, index) {
  event.stopPropagation();
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTodoList();
}

function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const form = document.getElementById("edit_form");
  const input = document.getElementById("edit_task_name");
  const hiddenIndex = document.getElementById("edit_task_index");

  input.value = tasks[index].text;
  hiddenIndex.value = index;

  form.style.display = "block";
  input.focus();
}

function saveEditedTask(event) {
  event.preventDefault();

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = document.getElementById("edit_task_index").value;
  const newText = document.getElementById("edit_task_name").value.trim();

  if (newText === "") return false;

  tasks[index].text = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("edit_form").style.display = "none";
  document.getElementById("edit_task_name").value = "";
  document.getElementById("edit_task_index").value = "";

  updateTodoList();
}

updateTodoList();
