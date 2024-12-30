const todoForm = document.querySelector('form');
const todoInput = document.getElementById('input-task');
const todoList = document.getElementById('todo-list');
const deleteAllButton = document.getElementById('delete-all-button'); 

let allTasks = getTasks();
updateTodoList();
updateDeleteButtonState(); 

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodoList();
})

deleteAllButton.addEventListener('click', function() {
    if (allTasks.length > 0 && confirm("Are you sure you want to delete all tasks?")) {
        deleteAllTasks();
    }
})

function addTodoList() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObj = {
            text: todoText,
            completed: false
        };
        allTasks.push(todoObj);
        updateTodoList();
        saveTasks();
        updateDeleteButtonState(); 
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoList.innerHTML = "";
    allTasks.forEach((task, taskIndex) => {
        const todoItem = createTodoTask(task, taskIndex);
        todoList.append(todoItem);
    });
}

function createTodoTask(task, taskIndex) {
    const todoId = "todo-" + taskIndex;
    const todoTask = document.createElement("li");
    const taskText = task.text;
    todoTask.className = "todo";
    todoTask.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">${taskText}</label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    const deleteButton = todoTask.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(taskIndex);
    });

    const checkbox = todoTask.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTasks[taskIndex].completed = checkbox.checked;
        saveTasks();
    });

    checkbox.checked = task.completed;
    return todoTask;
}

function deleteTodoItem(taskIndex) {
    allTasks = allTasks.filter((_, i) => i !== taskIndex);
    saveTasks();
    updateTodoList();
    updateDeleteButtonState(); 
}

function deleteAllTasks() {
    allTasks = [];  
    saveTasks();
    updateTodoList();
    updateDeleteButtonState(); 
}

function updateDeleteButtonState() {
    if (allTasks.length === 0) {
        deleteAllButton.disabled = true;  
    } else {
        deleteAllButton.disabled = false; 
    }
}

function saveTasks() {
    const todoJson = JSON.stringify(allTasks);
    localStorage.setItem("todos", todoJson);
}

function getTasks() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
