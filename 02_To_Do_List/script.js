document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task_input");
    const taskDate = document.getElementById("task_date");
    const taskTime = document.getElementById("task_time");
    const priorityCheckbox = document.getElementById("priority_checkbox");
    const prioritySelect = document.getElementById("task_priority_select");
    const taskList = document.getElementById("task_list");
    const taskNotes = document.getElementById("task_notes");
    const saveNotesBtn = document.getElementById("save_notes");
    const filterTasks = document.getElementById("filter_tasks");
    const priorityFilter = document.getElementById("priority_filter");
    const toggleTheme = document.getElementById("toggle-theme");

    let tasks = [];
    let currentEditIndex = null;

    // Load tasks from localStorage
    function loadTasks() {
        const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = saved;
        renderTasks();
    }

    // Save tasks to localStorage
    function saveData() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Clear input form
    function clearForm() {
        taskInput.value = "";
        taskDate.value = "";
        taskTime.value = "";
        priorityCheckbox.checked = false;
        prioritySelect.value = "";
    }

    // Render tasks to UI
    function renderTasks() {
        taskList.innerHTML = "";
        const statusFilter = filterTasks.value;
        const priorityValue = priorityFilter.value;

        tasks.forEach((t, i) => {
            if (
                (statusFilter === "completed" && !t.completed) ||
                (statusFilter === "pending" && t.completed) ||
                (statusFilter === "today" && t.date !== new Date().toISOString().split("T")[0])
            ) return;

            if (priorityValue !== "all" && t.priority !== priorityValue) return;

            const li = document.createElement("li");
            li.className = `list-group-item d-flex justify-content-between align-items-center ${t.completed ? "completed" : ""}`;

            li.innerHTML = `
                <div>
                    <strong>${t.task}</strong><br>
                    <small>${t.date} @ ${t.time} ${t.priority !== "none" ? `| Priority: ${t.priority}` : ""}</small>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-light select-btn">Select</button>
                    <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
                </div>
            `;

            // Select button (for edit)
            li.querySelector(".select-btn").addEventListener("click", () => {
                taskInput.value = t.task;
                taskDate.value = t.date;
                taskTime.value = t.time;
                priorityCheckbox.checked = t.priority !== "none";
                prioritySelect.value = t.priority !== "none" ? t.priority : "";
                currentEditIndex = i;
            });

            // Delete button
            li.querySelector(".delete-btn").addEventListener("click", () => {
                if (confirm("Delete this task?")) {
                    tasks.splice(i, 1);
                    renderTasks();
                }
            });

            taskList.appendChild(li);
        });

        saveData();
    }

    // Event: Add Task
    document.getElementById("add_task").addEventListener("click", () => {
        const task = taskInput.value.trim();
        const date = taskDate.value;
        const time = taskTime.value;
        const priority = priorityCheckbox.checked ? prioritySelect.value : "none";

        if (!task || !date || !time || (priorityCheckbox.checked && !priority)) {
            alert("Please fill all fields properly.");
            return;
        }

        tasks.push({
            task,
            date,
            time,
            priority,
            completed: false,
        });

        renderTasks();
        clearForm();
    });

    // Event: Edit Task
    document.getElementById("edit_task").addEventListener("click", () => {
        if (currentEditIndex === null) {
            alert("Select a task to edit.");
            return;
        }

        const task = taskInput.value.trim();
        const date = taskDate.value;
        const time = taskTime.value;
        const priority = priorityCheckbox.checked ? prioritySelect.value : "none";

        tasks[currentEditIndex] = {
            ...tasks[currentEditIndex],
            task,
            date,
            time,
            priority
        };

        renderTasks();
        clearForm();
        currentEditIndex = null;
    });

    // Event: Mark Complete
    document.getElementById("complete_task").addEventListener("click", () => {
        if (currentEditIndex === null) {
            alert("Select a task to mark complete.");
            return;
        }

        tasks[currentEditIndex].completed = true;
        renderTasks();
        clearForm();
        currentEditIndex = null;
    });

    // Event: Delete Task (from toolbar)
    document.getElementById("delete_task").addEventListener("click", () => {
        if (currentEditIndex === null) {
            alert("Select a task to delete.");
            return;
        }

        tasks.splice(currentEditIndex, 1);
        renderTasks();
        clearForm();
        currentEditIndex = null;
    });

    // Event: Filter change
    filterTasks.addEventListener("change", renderTasks);
    priorityFilter.addEventListener("change", renderTasks);

    // Event: Save Notes
    saveNotesBtn.addEventListener("click", () => {
        const notes = taskNotes.value.trim();
        if (notes) {
            alert("Notes saved successfully!");
        }
    });

    // Toggle Theme
    toggleTheme.addEventListener("click", () => {
        const html = document.documentElement;
        html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    });

    // Load on startup
    loadTasks();
});
