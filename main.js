const btnNewTask = document.querySelector(".new-task button");
btnNewTask.addEventListener("click", addTask);
const taskText = document.querySelector(".new-task input");
const taskBox = document.querySelector(".task-box");
const taskBoxCompleted = document.querySelector(".task-box-completed");
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clear);

let index = [];

let id = localStorage.length;

for (let i = 0; i < id; i++) {
    const taskLoaded = localStorage.getItem(`task${i}`);

    let newTaskItem = document.createElement("label");
    newTaskItem.classList.add("task-item");

    let checkboxInput = document.createElement("input");
    checkboxInput.type = 'checkbox';

    let newCheckbox = document.createElement("span");
    newCheckbox.classList.add("new-checkbox");

    let checkboxValue = document.querySelector(".task-item input[type=checkbox]");
    checkboxValue = checkboxInput.addEventListener('change', completeTask);

    let oldTask = document.createElement('p');
    oldTask.innerHTML = taskLoaded;

    let newTrashButton = document.createElement('button');

    let trashIcon = document.createElement("i")
    trashIcon.classList.add('fa-solid');
    trashIcon.classList.add('fa-trash');

    newTaskItem.appendChild(checkboxInput);
    newTaskItem.appendChild(newCheckbox);
    newTaskItem.appendChild(oldTask);
    newTaskItem.appendChild(newTrashButton);
    newTrashButton.appendChild(trashIcon);
    taskBox.appendChild(newTaskItem);

    newTrashButton.addEventListener("click", deleteTask);

    index.push(taskLoaded);

};

function addTask(e) {
    e.preventDefault();
    if (taskText.value !== '') {
        let newTaskItem = document.createElement("label");
        newTaskItem.classList.add("task-item");

        let checkboxInput = document.createElement("input");
        checkboxInput.type = 'checkbox';

        let newCheckbox = document.createElement("span");
        newCheckbox.classList.add("new-checkbox");

        let checkboxValue = document.querySelector(".task-item input[type=checkbox]");
        checkboxValue = checkboxInput.addEventListener('change', completeTask);

        let newTaskText = document.createElement('p');
        newTaskText.innerHTML = `${taskText.value}`;

        localStorage.setItem(`task${id}`, taskText.value);
        id++;

        let newTrashButton = document.createElement('button');

        let trashIcon = document.createElement("i")
        trashIcon.classList.add('fa-solid');
        trashIcon.classList.add('fa-trash');

        newTaskItem.appendChild(checkboxInput);
        newTaskItem.appendChild(newCheckbox);
        newTaskItem.appendChild(newTaskText);
        newTaskItem.appendChild(newTrashButton);
        newTrashButton.appendChild(trashIcon);

        taskBox.appendChild(newTaskItem);

        newTrashButton.addEventListener("click", deleteTask);

        taskText.value = '';
    } else {
        window.alert("Type something!");
    }
};
location.reload();

function deleteTask(e) {
    let deleteIndex = index.indexOf(e.target.parentElement.parentElement.outerText);
    let textDeleted = e.target.parentElement.parentElement.outerText;

    e.target.parentElement.parentElement.remove();
    
    localStorage.removeItem(`task${deleteIndex}`);
    
    index.splice(0, deleteIndex, textDeleted);
};

function completeTask(e) {
    e.target.nextSibling.nextSibling.classList.toggle("complete");
};

function clear() {
    localStorage.clear();
}