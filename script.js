const botaoCriaTarefa = document.querySelector('#criar-tarefa');
const botaoSalvaTarefas = document.querySelector('#salvar-tarefas');
const botaoRemoverFinalizados = document.querySelector('#remover-finalizados');
const botaoApagaTudo = document.querySelector('#apaga-tudo');
const inputTexto = document.querySelector('#texto-tarefa');
const listaDeTarefas = document.querySelector('#lista-tarefas');

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
  }
  const eventTarget = event.target;
  eventTarget.style.backgroundColor = 'rgb(128, 128, 128)';
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
    listaTarefas.push(tarefas[index].outerHTML);
  }

  localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
}

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

function removerFinalizados() {
  const tarefasCompletas = document.querySelectorAll('.completed');
  for (let index = 0; index < tarefasCompletas.length; index += 1) {
    listaDeTarefas.removeChild(tarefasCompletas[index]);
  }
  salvaTarefas();
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
