var add = document.getElementById('add');
var inputTask = document.getElementById('task');
var unfinishedTasks = document.getElementById('unfinished-tasks');
var finishedTasks = document.getElementById('finished-tasks');

function createNewElement(task) {
    var listItem = document.createElement('li');
    var checkbox = document.createElement('button');
    listItem.className = ('list-item')
    checkbox.className = 'icons checkbox';
    checkbox.innerHTML = '<i class="icons">check_box_outline_blank</i>';

    var label = document.createElement('label');
    label.innerText = task;
   	var input = document.createElement('input');
   	input.type = "text";
    var editButton = document.createElement('button');
    editButton.className = 'icons edit';
    editButton.innerHTML = '<i class="icons">edit</i>';

    var deleteButton = document.createElement('button');
    deleteButton.className = 'icons delete';
    deleteButton.innerHTML = '<i class="icons">delete</i>';
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}


function addTask() {
   if (inputTask.value) {
        var listItem = createNewElement(inputTask.value);
        bindTask(listItem, finishTask);
        unfinishedTasks.appendChild(listItem);
        inputTask.value = '';
         
    }

}
add.onclick = addTask;

function deleteTask(){
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}

function editTask(){
	var editButton = this;
	var listItem = this.parentNode;
    var label = listItem.querySelector('label');
    var input = listItem.querySelector('input[type=text]');
    var containsClass = listItem.classList.contains('editMode');//проверяем сод-т ли класс

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = "icons edit";
        editButton.innerHTML = "<i class='material-icons'>edit</i>";
        label.style.display = "block";
        input.value = "";
	}
	else {
		label.style.display = "none";
        input.value = label.innerText;//если класса нет сохраняем значение
        editButton.className = "icons save";
        editButton.innerHTML = "<i class='material-icons'>save</i>";

    }
    listItem.classList.toggle('editMode');//переключаем класс
}
function finishTask(){
	var listItem  = this.parentNode;
	var checkbox = listItem.querySelector(".checkbox");
	checkbox.className = 'icons checkbox';
    checkbox.innerHTML = '<i class="icons">check_box</i>';
    finishedTasks.appendChild(listItem); //в блок завершенные дела добавл список
    bindTask(listItem, unfinishTask);//вызываем ф-ю для переключ чекбокса

}
function unfinishTask() {
    var listItem = this.parentNode;
    var checkbox = listItem.querySelector('.checkbox');
    checkbox.className = "icons checkbox";
    checkbox.innerHTML = "<i class='icons'>check_box_outline_blank</i>";

    unfinishedTasks.appendChild(listItem);//возвращ в список дел
    bindTask(listItem, finishTask);
    
}

function bindTask(listItem, checkboxEvent){
	var checkbox = listItem.querySelector(".checkbox");
	var editButton = listItem.querySelector(".edit");
	var deleteButton = listItem.querySelector(".delete");
	checkbox.onclick = checkboxEvent;
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
}
