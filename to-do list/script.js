document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const categorySelect = document.getElementById("category-select");
    const dueDateInput = document.getElementById("due-date-input");
    const prioritySelect = document.getElementById("priority-select");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskListUl = document.getElementById("task-list-ul");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(filter = null) {
        taskListUl.innerHTML = "";
        tasks.filter(task => {
            if (filter === "completed") {
                return task.completed;
            } else if (filter === "uncompleted") {
                return !task.completed;
            } else {
                return true;
            }
        }).forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.name}</span>
                <span class="priority">${task.priority}</span>
                <button class="complete-btn" data-index="${index}">${task.completed ? "Undo" : "Complete"}</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskListUl.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", function() {
        const task = {
            name: taskInput.value,
            category: categorySelect.value,
            dueDate: dueDateInput.value,
            priority: prioritySelect.value,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = "";
        categorySelect.value = "";
        dueDateInput.value = "";
        prioritySelect.value = "low";
    });

    taskListUl.addEventListener("click", function(event) {
        const index = event.target.getAttribute("data-index");
        if (event.target.classList.contains("delete-btn")) {
            tasks.splice(index, 1);
        } else if (event.target.classList.contains("complete-btn")) {
            tasks[index].completed = !tasks[index].completed;
        }
        saveTasks();
        renderTasks();
    });

    renderTasks();

    const allTasksBtn = document.getElementById("show-all-btn");
    const completedTasksBtn = document.getElementById("show-completed-btn");
    const uncompletedTasksBtn = document.getElementById("show-uncompleted-btn");

    if (allTasksBtn) {
        allTasksBtn.addEventListener("click", () => renderTasks());
    }
    if (completedTasksBtn) {
        completedTasksBtn.addEventListener("click", () => renderTasks("completed"));
    }
    if (uncompletedTasksBtn) {
        uncompletedTasksBtn.addEventListener("click", () => renderTasks("uncompleted"));
    }
});
