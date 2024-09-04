let todoInput = document.getElementById("input");
let todoList = document.getElementById("todo-list");
let addButton = document.getElementById("add");
let message = document.getElementById("message");

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
  };

  listItem.onclick = function(){
    listItem.classList.toggle('completed');
  };

  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);

  todoInput.value='';
}

addButton.addEventListener('click', addTodo);