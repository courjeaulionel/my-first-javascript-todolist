//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo); // Pour montrer la liste complète et incomplète, ça ne marche pas bien, ça dépend des navigateurs et il faut utiliser soit "change" soit "click"

//Functions

function addTodo(event){
    //Prevent form from submitting
   event.preventDefault();
    //Todo DIV
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");
    //Create LI
   const newTodo = document.createElement("li");
   newTodo.innerText = todoInput.value;
   newTodo.classList.add("todo-item");
   todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTORAGE
   saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
   const completedButton = document.createElement("button");
   completedButton.innerHTML = '<i class="fas fa-check"></i>';
   completedButton.classList.add("complete-btn");
   todoDiv.appendChild(completedButton);
    //CHECK trash BUTTON
   const trashButton = document.createElement("button");
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);
    //APPEND TO LIST
   todoList.appendChild(todoDiv);
    //Clear todo INPUT VALUE
   todoInput.value = ""; 
}

function deleteCheck(e) {
    const item = e.target;
     //DELETE TODO
    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
     //Animation 
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener("transitionend", function() {
        todo.remove();
      });
    }
    
     //CHECK MARK
    if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");  
    } 
}

function filterTodo(e) { //Pour selectionner et voir des lignes completed et uncompleted corrects, ce code est le bon mais le code d'origine du développeur est celui en dessous celui-ci mais il ne marche pas bien et pas sur tous les navigateurs
  const todos = todoList.childNodes;
  todos.forEach(function (todo) { 
      const mStyle = todo.style;  
      if(mStyle != undefined && mStyle != null){
          switch (e.target.value) {
              case "all":
                  mStyle.display = "flex";
                  break;
              case "completed":
                  if (todo.classList.contains('completed')) {
                      mStyle.display = 'flex';
                  } else {
                      mStyle.display = "none";
                  }
                  break;
              case "uncompleted":
                  if (todo.classList.contains('completed')){
                      mStyle.display = 'none';
                  }
                  else{
                      mStyle.display = "flex";
                  }
                  break;
          }
      }
  })
}

/*function filterTodo(e) { //Code d'origine du développeur d'origine de la Todolist
   const todos = todoList.childNodes;
   todos.forEach(function(todo) {
    switch (e.target.value) {
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;           
    }
   }); 
}*/

function saveLocalTodos(todo) {
  //CHECK - - - HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //CHECK - - - HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
   //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
   //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
   //CHECK trash BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
   //APPEND TO LIST
  todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //CHECK - - - HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}  
