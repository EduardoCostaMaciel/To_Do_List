const form = document.querySelector('form');
const input = document.querySelector('#texto-tarefa');
const btnAddItemList = document.querySelector('#criar-tarefa');

const taskList = document.querySelector('#lista-tarefas');
const btnMoveUp = document.querySelector('#mover-cima');
const btnMoveDown = document.querySelector('#mover-baixo');
const btnSaveTaskList = document.querySelector('#salvar-tarefas');
const btnRemoveTaskSelected = document.querySelector('#remover-selecionado');
const btnRemoveTaskCompleted = document.querySelector('#remover-finalizados');
const btnRemoveList = document.querySelector('#apaga-tudo');

const bgSelect = 'rgb(128, 128, 128)';

const formSubmit = (e) => e.preventDefault();
form.addEventListener('submit', formSubmit);

const createItemList = () => {
  if (input.value !== '') {
    const li = document.createElement('li');
    li.innerText = input.value;
    li.setAttribute('class', 'd-flex justify-content-between rounded-pill ps-3');
    input.value = '';
    taskList.appendChild(li);

    const span = document.createElement('span');
    li.appendChild(span);

    const check = document.createElement('i');
    check.setAttribute('class', 'fa-solid fa-check text-primary me-2 d-none');
    span.appendChild(check);

    const doubleCheck = document.createElement('i');
    doubleCheck.setAttribute('class', 'fa-solid fa-check-double text-success me-2 d-none');
    span.appendChild(doubleCheck);
  }
};
btnAddItemList.addEventListener('click', createItemList);

const selectElementList = (event) => {
  const list = document.querySelectorAll('li');
  list.forEach((elem) => {
    const elemento = elem;
    elemento.style.backgroundColor = 'white';
    elem.classList.remove('selected');
    elem.children[0].children[0].classList.add('d-none');
  });
  const eventTarget = event.target;
  eventTarget.style.backgroundColor = bgSelect;
  eventTarget.classList.add('selected');
  eventTarget.children[0].children[0].classList.remove('d-none');
};
taskList.addEventListener('click', selectElementList);

const doubleClick = ({ target }) => {
  target.classList.toggle('completed');
  const list = document.querySelectorAll('li');
  list.forEach((elem) => {
    if (elem.classList.contains('completed')) {
      elem.children[0].children[1].classList.remove('d-none');
    } else {
      elem.children[0].children[1].classList.add('d-none');
    }
  });
};
taskList.addEventListener('dblclick', doubleClick);

const moveTaskUp = () => {
  const list = document.querySelectorAll('li');
  const taskSelected = document.querySelector('.selected');
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].classList.contains('selected') && index > 0) {
      list[index - 1].insertAdjacentElement('beforebegin', taskSelected);
    }
  }
};
btnMoveUp.addEventListener('click', moveTaskUp);

const moveTaskDown = () => {
  const list = document.querySelectorAll('li');
  const taskSelected = document.querySelector('.selected');
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].classList.contains('selected') && index < list.length - 1) {
      list[index + 1].insertAdjacentElement('afterend', taskSelected);
    }
  }
};
btnMoveDown.addEventListener('click', moveTaskDown);

const saveTaskList = () => {
  const list = document.querySelectorAll('li');
  const taskListSave = [];

  list.forEach((elem) => {
    const elemento = elem;
    elemento.style.backgroundColor = 'white';
    taskListSave.push(elem.outerHTML);
  });

  localStorage.setItem('tasks', JSON.stringify(taskListSave));
};
btnSaveTaskList.addEventListener('click', saveTaskList);

const removeTaskSelected = () => {
  const list = document.querySelectorAll('li');
  list.forEach((elem) => {
    if (elem.classList.contains('selected')) {
      taskList.removeChild(elem);
    }
  });
};
btnRemoveTaskSelected.addEventListener('click', removeTaskSelected);

const removeTasksCompleted = () => {
  const taskCompleted = document.querySelectorAll('.completed');
  taskCompleted.forEach((elem) => taskList.removeChild(elem));
};
btnRemoveTaskCompleted.addEventListener('click', removeTasksCompleted);

const cleanList = () => {
  const list = document.querySelectorAll('li');
  list.forEach((elem) => taskList.removeChild(elem));
  localStorage.clear();
};
btnRemoveList.addEventListener('click', cleanList);

const realodInitial = () => {
  const listHTML = JSON.parse(localStorage.getItem('tasks'));
  listHTML.forEach((elem) => {
    const li = document.createElement('li');
    taskList.appendChild(li);
    li.outerHTML = elem;
  });
};

const pageInitial = () => {
  if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
  } else {
    realodInitial();
  }
};

window.onload = () => pageInitial();
