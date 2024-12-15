// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskTime = document.getElementById('task-time');
const taskList = document.getElementById('task-list');

// Event Listener for form submission
taskForm.addEventListener('submit', addTask);

// Task Array to store tasks
let tasks = [];

// Add a new task
function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value;
    const taskDueDate = taskDate.value;
    const taskDueTime = taskTime.value;

    if (taskText === '' || taskDueDate === '' || taskDueTime === '') {
        alert('Please fill in all fields');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        date: taskDueDate,
        time: taskDueTime,
        completed: false,
    };

    tasks.push(task);
    displayTasks();

    // Clear input fields
    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
}

// Display tasks in the list
function displayTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <div class="task-info">
                <span>${task.text}</span>
                <span class="task-date-time">Due: ${task.date} at ${task.time}</span>
            </div>
            <div class="task-buttons">
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Unmark' : 'Complete'}
                </button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

// Edit a task
function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
        taskInput.value = taskToEdit.text;
        taskDate.value = taskToEdit.date;
        taskTime.value = taskToEdit.time;

        deleteTask(id);  // Remove the old task while editing
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

// Toggle task completion status
function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        displayTasks();
    }
}
