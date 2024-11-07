// app.js

// Global array to store the to-do items
let todoList = [];

// Helper function to generate unique IDs for each task
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to render the to-do list
function renderList() {
  const todoListContainer = document.getElementById('todoList');
  todoListContainer.innerHTML = ''; // Clear existing list before rendering

  todoList.forEach(task => {
    const li = document.createElement('li');
    const br = document.createElement('br');
    li.classList.add('task');
    li.dataset.id = task.id;
  
    // Using template literals for building task HTML structure
    const taskHTML = `
      <h4 class="task-title ${task.completed ? 'completed' : ''}"> Tittle:${task.title}</h4><br>
      <p class="task-description">Description:${task.description ? ` ${task.description}` : ''}</p><br>
      <h4 class="task-due-date"> Time: ${new Date(task.dueDate).toLocaleString()}</h4>
<div class="kkk-flex">
  <button class="complete-btn" style="background-color: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background-color 0.3s;">
    <i class="fa-solid fa-check" style="font-size: 18px; margin-right: 8px;"></i> 
  </button>
  
  <button class="edit-btn" style="background-color: #007BFF; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background-color 0.3s;">
    <i class="fa-solid fa-pen" style="font-size: 18px; margin-right: 8px;"></i> 
  </button>
  
  <button class="delete-btn" style="background-color: #FF5733; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background-color 0.3s;">
    <i class="fa-solid fa-trash" style="font-size: 18px; margin-right: 8px;"></i> 
  </button>
</div>


    `;
  
    // Insert the task HTML into the li element
    li.innerHTML = taskHTML;
  
    // Attach event listeners for the buttons
    li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));
    li.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
  
    // Append the li to the todoListContainer
    todoListContainer.appendChild(li);
    todoListContainer.appendChild(br);

  });
  
}

// Function to add a new task
function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;

  if (!title || !dueDate) {
    alert("Please enter a title and due date.");
    return;
  }

  const newTask = {
    id: generateId(),
    title,
    description,
    dueDate,
    completed: false
  };

  todoList.push(newTask);
  renderList();
  resetForm();
}

// Function to reset the form after adding a task
function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('dueDate').value = '';
}

// Function to delete a task
function deleteTask(id) {
  todoList = todoList.filter(task => task.id !== id);
  renderList();
}

// Function to toggle the completion status of a task
function toggleComplete(id) {
  const task = todoList.find(task => task.id === id);
  task.completed = !task.completed;
  renderList();
}

// Function to edit a task
function editTask(id) {
  const task = todoList.find(task => task.id === id);

  // Pre-fill form fields with task data
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description || '';
  document.getElementById('dueDate').value = task.dueDate;

  // Update the button to act as "Save"
  const addButton = document.getElementById('addButton');
  addButton.textContent = 'Save Changes';
  addButton.onclick = () => saveChanges(id);
}

// Function to save changes to an existing task
function saveChanges(id) {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;

  if (!title || !dueDate) {
    alert("Please enter a title and due date.");
    return;
  }

  const task = todoList.find(task => task.id === id);
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;

  renderList();
  resetForm();

  // Reset the button to "Add Task"
  const addButton = document.getElementById('addButton');
  addButton.textContent = 'Add Task';
  addButton.onclick = addTask;
}

// Function to sort the tasks by due date (ascending)
function sortAsc() {
  todoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  renderList();
}

// Function to sort the tasks by due date (descending)
function sortDesc() {
  todoList.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  renderList();
}

// Event listeners for the buttons
document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('sortAsc').addEventListener('click', sortAsc);
document.getElementById('sortDesc').addEventListener('click', sortDesc);

// Initial render
renderList();
