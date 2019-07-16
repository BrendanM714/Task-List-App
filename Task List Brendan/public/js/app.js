// Part 1

// Define UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBTN = document.querySelector('.clear-tasks');

// Call loadEventListeners Function
loadEventListeners();

// Define loadEventListeners Function
function loadEventListeners() {

  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  
  // Event listener for add task and addTask function call
  form.addEventListener('submit', addTask);

  //Event listener for remove task and removeTask function call
  taskList.addEventListener('click', removeTask);

  // Event listener for clear tasks and clearTasks function call
  clearBTN.addEventListener('click', clearTasks);

  // Event listener for filter tasks and filterTasks function call
  filter.addEventListener('keyup', filterTasks)
}

// Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
   // Create li element
   const li = document.createElement('li');

   // Add class to li element
   li.className = 'collection-item';
 
   // Create text node, append to li
   li.appendChild(document.createTextNode(task));
 
   // Create link element for delete function
   const link = document.createElement('a');
 
   // Add class to link element
   link.className = 'delete-item secondary-content';
 
   // Add icon to link element
   link.innerHTML = '<i class="fa fa-remove"></i>';
 
   // Append link to li
   li.appendChild(link);
 
   // Append li to ul
   taskList.appendChild(li);
  });
}

function addTask(e){
  // Make sure there is a value in task input
  if(taskInput.value === '') {
    alert('Add A Task!');
  }

  // Create li element
  const li = document.createElement('li');

  // Add class to li element
  li.className = 'collection-item';

  // Create text node, append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create link element for delete function
  const link = document.createElement('a');

  // Add class to link element
  link.className = 'delete-item secondary-content';

  // Add icon to link element
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store task in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear task input field
  taskInput.value = '';

  // Prevent default form submit behavior
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Part 2

// Remove single task with removeTask
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();
    }
  }
  // Remove from LS
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
        tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks with clearTasks
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter through tasks with filterTasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else  {
      task.style.display = 'none';
    }
  });
}

// brent code
// jquery
// $('#task').keyup(() => {
//   if ($('#task').val().length > 5) {
//     $('input[type="submit"]').attr({
//       'disabled': false
//     })
//   }
// })

var inputField = document.getElementById('task');
var inputSubmit = document.querySelector('input[type="submit"');
inputField.addEventListener('keyup', () => {
  if (inputField.value.length >= 3) {
    inputSubmit.disabled = false;
  } else {
    inputSubmit.disabled = true;
  }
})