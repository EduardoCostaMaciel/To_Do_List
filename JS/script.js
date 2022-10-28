const forme = document.querySelector('form');
const botaoCriaTarefa = document.querySelector('#criar-tarefa');
const botaoSalvaTarefas = document.querySelector('#salvar-tarefas');
const botaoRemoverSelecionado = document.querySelector('#remover-selecionado');
const botaoRemoverFinalizados = document.querySelector('#remover-finalizados');
const botaoApagaTudo = document.querySelector('#apaga-tudo');
const inputTexto = document.querySelector('#texto-tarefa');
const listaDeTarefas = document.querySelector('#lista-tarefas');

const corItemSeleciodo = 'rgb(128, 128, 128)';

const formeSubmit = (e) => e.preventDefault();
forme.addEventListener('submit', formeSubmit);

function criaTarefa() {
  if (inputTexto.value !== '') {
    const lista = document.createElement('li');
    lista.innerText = inputTexto.value;
    inputTexto.value = '';
    listaDeTarefas.appendChild(lista);
  }
}

botaoCriaTarefa.addEventListener('click', criaTarefa);

function trocaCor(event) {
  const elementoClicado = document.querySelectorAll('li');
  for (let index = 0; index < elementoClicado.length; index += 1) {
    elementoClicado[index].style.backgroundColor = 'white';
    elementoClicado[index].classList.remove('selecionado');
  }
  const eventTarget = event.target;
  eventTarget.style.backgroundColor = corItemSeleciodo;
  eventTarget.classList.add('selecionado');
}

listaDeTarefas.addEventListener('click', trocaCor);

function clickDuplo(event) {
  event.target.classList.toggle('completed');
}

listaDeTarefas.addEventListener('dblclick', clickDuplo);

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
    listaDeTarefas.appendChild(li);
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
      listaDeTarefas.removeChild(tarefas[index]);
    }
  }
}

botaoRemoverSelecionado.addEventListener('click', removeTarefaSelecionada);

function removerFinalizados() {
  const tarefasCompletas = document.querySelectorAll('.completed');
  for (let index = 0; index < tarefasCompletas.length; index += 1) {
    listaDeTarefas.removeChild(tarefasCompletas[index]);
  }
}

botaoRemoverFinalizados.addEventListener('click', removerFinalizados);

function removeTudo() {
  const apagaElemento = document.querySelectorAll('li');
  for (let index = 0; index < apagaElemento.length; index += 1) {
    listaDeTarefas.removeChild(apagaElemento[index]);
  }
  localStorage.clear();
}

botaoApagaTudo.addEventListener('click', removeTudo);

window.onload = () => {
  paginaInicial();
};
