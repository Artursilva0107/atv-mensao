// Seleciona os elementos do formulário, input e lista de tarefas
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Carrega as tarefas do localStorage ou inicia com array vazio
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Renderiza as tarefas na tela e salva no localStorage
function renderTasks() {
  taskList.innerHTML = ""; // Limpa a lista
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    // Cria o HTML de cada tarefa, com botões de completar e deletar
    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li); // Adiciona na lista
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Salva no localStorage
}

// Adiciona nova tarefa ao enviar o formulário
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita recarregar a página
  const newTask = taskInput.value.trim();
  if (newTask) {
    tasks.push({ text: newTask, completed: false }); // Adiciona tarefa
    taskInput.value = ""; // Limpa o input
    renderTasks(); // Atualiza a lista
  }
});

// Alterna o status de completada da tarefa
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Remove a tarefa da lista
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Renderiza as tarefas ao carregar a página
renderTasks();