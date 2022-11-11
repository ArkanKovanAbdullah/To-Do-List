import './style.css';

import updateTaskStatus from './To-Do-Item-Status.js';

const form = document.getElementById('plus-to-list');
const listItems = document.getElementById('to-do-list');
const btnClear = document.querySelector('.btn-clear');
const taskArr = [];

const displayTask = (task) => {
  const listItem = `
  <li>

    <div class="check">

      <input type="checkbox" name="checkbox" class="checkbox" id="${task.description}">

      <input type="text" class="task-description" name="${task.description}" class="task-name" id="task-name" value="${task.description}">

    </div>

    <div class="actions">

      <i class="fa-solid fa-trash-can del"></i>

    </div>

  </li>`;
  return listItem;
};

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => {
    const listItem = displayTask(task);
    listItems.insertAdjacentHTML('beforeend', listItem);
  });

  const completedTasksIndex = tasks.filter((task) => task.completed === true);

  for (let i = 0; i < completedTasksIndex.length; i += 1) {
    for (let j = 0; j < (listItems.children).length; j += 1) {
      if (j === (completedTasksIndex[i].index - 1)) {
        listItems.children[j].children[0].children[0].checked = true;
      }
    }
  }
});
const addTask = (task) => {
  const taskObj = {};
  taskObj.index = taskArr.length + 1;
  taskObj.description = task;
  taskObj.completed = false;
  const listItem = displayTask(taskObj);
  listItems.insertAdjacentHTML('beforeend', listItem);
  taskArr.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};
const deleteTask = (task, element) => {
  const taskName = task.children[0].children[1].value;
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const taskIndex = tasks.findIndex((x) => x.description === taskName);
  tasks.splice(taskIndex, 1);
  tasks.forEach((item, ind) => {
    item.index = ind + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  element.parentElement.parentElement.remove();
};
const editTask = (task) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const taskItem = task.children[0].children[1].name;
  const taskIndex = tasks.findIndex((x) => x.description === taskItem);
  const taskName = task.querySelector('#task-name').value;
  tasks[taskIndex].description = taskName;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
listItems.addEventListener('click', (e) => {
  const task = e.target.parentElement.parentElement;
  if (e.target.classList.contains('del')) {
    deleteTask(task, e.target);
  }
  if (e.target.classList.contains('edit')) {
    editTask(task);
  }
  if (e.target.classList.contains('checkbox')) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    updateTaskStatus(e.target, tasks);
  }
});
btnClear.addEventListener('click', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const filterTasks = tasks.filter((task) => task.completed === false);

  filterTasks.forEach((item, ind) => {
    item.index = ind + 1;
  });

  let updatedList = '';
  filterTasks.forEach((task) => {
    updatedList += displayTask(task);
  });

  listItems.innerHTML = updatedList;
  localStorage.setItem('tasks', JSON.stringify(filterTasks));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = document.getElementById('task');
  addTask(task.value);
  task.value = '';
});
