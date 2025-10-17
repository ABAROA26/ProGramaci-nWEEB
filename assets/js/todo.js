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

updateTodoList();
