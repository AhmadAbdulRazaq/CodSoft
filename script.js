document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const addTaskButton = document.getElementById("add-task");
    const searchBar = document.getElementById("search-bar");
  
    addTaskButton.addEventListener("click", addTask);
  
    function addTask() {
      const taskName = document.getElementById("task-name").value;
      const taskImageInput = document.getElementById("task-image");
      const taskImage = taskImageInput.files[0];
  
      if (taskName && taskImage) {
        const task = {
          name: taskName,
          imageSrc: URL.createObjectURL(taskImage),
        };
  
        createTaskItem(task);
        updateLocalStorage();
  
        // Clear input fields
        document.getElementById("task-name").value = "";
        taskImageInput.value = "";
      }
    }
  
    function updateLocalStorage() {
      const tasks = [];
      const taskItems = document.querySelectorAll(".task-item");
      taskItems.forEach((taskItem) => {
        const task = {
          name: taskItem.querySelector("span").textContent,
          imageSrc: taskItem.querySelector("img").src,
        };
        tasks.push(task);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task) => {
        createTaskItem(task);
      });
    }
  
    function createTaskItem(task) {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
  
      const imageContainer = document.createElement("div");
      const taskImageElement = document.createElement("img");
      taskImageElement.classList.add("task-image");
      taskImageElement.src = task.imageSrc;
      imageContainer.appendChild(taskImageElement);
  
      const taskNameElement = document.createElement("span");
      taskNameElement.textContent = task.name;
  
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit-button");
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        taskItem.remove();
        updateLocalStorage();
      });
  
      taskItem.appendChild(imageContainer);
      taskItem.appendChild(taskNameElement);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
  
      taskList.appendChild(taskItem);
      attachEditButtonEvent(taskItem, task);
    }
  
    function attachEditButtonEvent(taskItem, task) {
      const editButton = taskItem.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        editTask(taskItem, task);
      });
    }
  
    function editTask(taskItem, task) {
      const newTaskName = prompt("Edit task name:", task.name);
      if (newTaskName !== null) {
        taskItem.querySelector("span").textContent = newTaskName;
        task.name = newTaskName;
        updateLocalStorage();
      }
    }
  
    function searchTasks() {
      const searchTerm = searchBar.value.toLowerCase();
      const taskItems = document.querySelectorAll(".task-item");
  
      taskItems.forEach((taskItem) => {
        const taskName = taskItem.querySelector("span").textContent.toLowerCase();
        if (taskName.includes(searchTerm)) {
          taskItem.style.display = "flex";
        } else {
          taskItem.style.display = "none";
        }
      });
    }
  
    searchBar.addEventListener("input", searchTasks);
  
    loadTasksFromLocalStorage();
  });
  