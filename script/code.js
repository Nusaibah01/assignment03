// 
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskName = taskInput.value.trim();

  if (taskName) {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      createdDate: new Date().toLocaleDateString(),
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener('change', () => toggleTaskCompletion(task.id));

    const taskLabel = document.createElement('label');
    taskLabel.textContent = `${task.name} (Created: ${task.createdDate})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  saveTasks();
  renderTasks();
}

function sortTasksAlphabetically() {
  tasks.sort((a, b) => a.name.localeCompare(b.name));
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log('Tasks saved to local storage:', tasks);
}

renderTasks();