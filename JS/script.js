const form = document.querySelector('form');
const input = document.querySelector('#texto-tarefa');
const btnAddItemList = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const botaoSalvaTarefas = document.querySelector('#salvar-tarefas');
const botaoRemoverSelecionado = document.querySelector('#remover-selecionado');
const botaoRemoverFinalizados = document.querySelector('#remover-finalizados');
const botaoApagaTudo = document.querySelector('#apaga-tudo');

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
    elem.classList.remove('selecionado');
    elem.children[0].children[0].classList.add('d-none');
  });
  const eventTarget = event.target;
  eventTarget.style.backgroundColor = bgSelect;
  eventTarget.classList.add('selecionado');
  eventTarget.children[0].children[0].classList.remove('d-none');
};
taskList.addEventListener('click', selectElementList);

const doubleClick = (event) => {
  event.target.classList.toggle('completed');
  const tarefas = document.querySelectorAll('li');
  tarefas.forEach((elem) => {
    if (elem.classList.contains('completed')) {
      elem.children[0].children[1].classList.remove('d-none');
    } else {
      elem.children[0].children[1].classList.add('d-none');
    }
  });
};
taskList.addEventListener('dblclick', doubleClick);

function salvaTarefas() {
  const tarefas = document.querySelectorAll('li');
  const listaTarefas = [];

  for (let index = 0; index < tarefas.length; index += 1) {
    tarefas[index].style.backgroundColor = 'white';
    listaTarefas.push(tarefas[index].outerHTML);
  }

  localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
}

const btnMoverCima = document.querySelector('#mover-cima');
function moverTarefaCima() {
  const tarefas = document.querySelectorAll('li');
  const tarefaSelect = document.querySelector('.selecionado');
  for (let index = 0; index < tarefas.length; index += 1) {
    if (tarefas[index].classList.contains('selecionado') && index > 0) {
      tarefas[index - 1].insertAdjacentElement('beforebegin', tarefaSelect);
    }
  }
}

btnMoverCima.addEventListener('click', moverTarefaCima);

const btnMoverBaixo = document.querySelector('#mover-baixo');
function moverTarefaBaixo() {
  const tarefas = document.querySelectorAll('li');
  const tarefaSelect = document.querySelector('.selecionado');
  for (let index = 0; index < tarefas.length; index += 1) {
    if (tarefas[index].classList.contains('selecionado') && index < tarefas.length - 1) {
      tarefas[index + 1].insertAdjacentElement('afterend', tarefaSelect);
    }
  }
}

btnMoverBaixo.addEventListener('click', moverTarefaBaixo);

function renderizaçãoInicial() {
  const elemHTMLLista = JSON.parse(localStorage.getItem('tarefas'));
  for (let index = 0; index < elemHTMLLista.length; index += 1) {
    const li = document.createElement('li');
    taskList.appendChild(li);
    li.outerHTML = elemHTMLLista[index];
  }
}

function paginaInicial() {
  if (localStorage.getItem('tarefas') === null) {
    localStorage.setItem('tarefas', JSON.stringify([]));
  } else {
    renderizaçãoInicial();
  }
}

botaoSalvaTarefas.addEventListener('click', salvaTarefas);

function removeTarefaSelecionada() {
  const tarefas = document.querySelectorAll('li');
  for (let index = 0; index < tarefas.length; index += 1) {
    if (tarefas[index].classList.contains('selecionado')) {
      taskList.removeChild(tarefas[index]);
    }
  }
}

botaoRemoverSelecionado.addEventListener('click', removeTarefaSelecionada);

function removerFinalizados() {
  const tarefasCompletas = document.querySelectorAll('.completed');
  for (let index = 0; index < tarefasCompletas.length; index += 1) {
    taskList.removeChild(tarefasCompletas[index]);
  }
}

botaoRemoverFinalizados.addEventListener('click', removerFinalizados);

function removeTudo() {
  const apagaElemento = document.querySelectorAll('li');
  for (let index = 0; index < apagaElemento.length; index += 1) {
    taskList.removeChild(apagaElemento[index]);
  }
  localStorage.clear();
}

botaoApagaTudo.addEventListener('click', removeTudo);

window.onload = () => {
  paginaInicial();
};
