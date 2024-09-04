let todoInput = document.getElementById("input");
let todoList = document.getElementById("todo-list");
let addButton = document.getElementById("add");
let message = document.getElementById("message");

document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo(){
  let taskText = todoInput.value;

  if(taskText === ''){
    message.textContent = "Please Enter A Task!";
    message.classList.add('show');
    return;
  }
  
  message.classList.remove('show');

  const listItem = document.createElement('li');

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  
  const icon = document.createElement('i');
  icon.className = 'fas fa-trash';
  deleteButton.appendChild(icon);
  deleteButton.onclick = function(){
    todoList.removeChild(listItem);
    removeTodoFromStorage(taskText);
  };

  listItem.onclick = function(){
    listItem.classList.toggle('completed');
    updateTodoInStorage(taskText, listItem.classList.contains('completed'));
  };

  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);

  saveTodoToStorage(taskText);

  todoInput.value='';
}

function saveTodoToStorage(taskText) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push({ text: taskText, completed: false });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
  todos.forEach(todo => {
    const listItem = document.createElement('li');
    if (todo.completed) {
      listItem.classList.add('completed');
    }

    const taskSpan = document.createElement('span');
    taskSpan.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-trash'; // Font Awesome trash icon
    deleteButton.appendChild(icon);
    deleteButton.onclick = function(){
      todoList.removeChild(listItem);
      removeTodoFromStorage(todo.text);
    };

    listItem.onclick = function(){
      listItem.classList.toggle('completed');
      updateTodoInStorage(todo.text, listItem.classList.contains('completed'));
    };

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
  });
}

function removeTodoFromStorage(taskText) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.text !== taskText);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodoInStorage(taskText, isCompleted) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.map(todo => 
    todo.text === taskText ? { ...todo, completed: isCompleted } : todo
  );
  localStorage.setItem('todos', JSON.stringify(todos));
}

addButton.addEventListener('click', addTodo);