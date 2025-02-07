const task_title_input = document.querySelector("#task_title_input");
const task_color_input = document.querySelector("#task_color_input");
const task_description_input = document.querySelector("#task_description_input");
const task_add_button = document.querySelector("#task_add_button");
const task_picker_color = document.querySelector("#task_picker_color");
const content = document.querySelector("#content");

let task_manage = [];

function showTask() {
    let taskHtml = "";

    task_manage.forEach((task_Info, index) => {
        taskHtml += `
        <div class="task ${task_Info.status ? "checked" : ""}" data-index="${index}">
        <div class="body_task">
        <h3 id="card_title" style="color: ${task_Info.color};">${task_Info.title}</h3>
        <p id="card_description">${task_Info.description}</p>
        </div>
        <div class="bottom_task">
        <i class="fa-solid fa-check card_check_button" data-index="${index}"></i>
        <i class="fa-solid fa-xmark card_delete_button" data-index="${index}"></i>
        </div>
        </div>`
    });

    content.innerHTML = taskHtml;

    document.querySelectorAll(".card_check_button").forEach(button => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data-index");
            markTask(index);
        });
    });

    document.querySelectorAll(".card_delete_button").forEach(button => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data-index");
            deleteTask(index);
        });
    });

    localStorage.setItem('task', JSON.stringify(task_manage));
}

task_add_button.addEventListener('click', () => {
    if (task_title_input.value && task_description_input.value) {
        let new_task = {
            title: task_title_input.value,
            color: task_color_input.value,
            description: task_description_input.value,
            status: false
        };
        task_manage.push(new_task);
        showTask();
        clearField();
    } else {
        erroTask();
    }
});

task_color_input.addEventListener('input', ()=> {
    task_picker_color.style.borderColor = task_color_input.value;
});

function deleteTask(index) {
    task_manage.splice(index, 1);
    showTask();
}

function markTask(index) {
    task_manage[index].status = !task_manage[index].status;
    showTask();
}

function clearField() {
    task_title_input.value = "";
    task_color_input.value = "#7161ef";
    task_description_input.value = "";
    task_color_input.dispatchEvent(new Event('input'));
}

function erroTask() {
    task_title_input.classList.add("erro");
    task_description_input.classList.add("erro");
    setTimeout(()=> {
        task_title_input.classList.remove("erro");
        task_description_input.classList.remove("erro");
    }, 5000);
}

function loadTasks() {
    let savedTasks = localStorage.getItem('task');
    if (savedTasks) {
        task_manage = JSON.parse(savedTasks);
        showTask();
    }
}

loadTasks();
