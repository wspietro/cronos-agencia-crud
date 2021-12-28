// Ações de Modal
let Modal = {
  open() {
    // Abrir modal
    // Adicionar a classe "active" ao modal
    document.querySelector('.modal-overlay').classList.add('active');
  },

  close() {
    // Fechar modal
    // Remover a classe "active" do modal
    document.querySelector('.modal-overlay').classList.remove('active');
  }
}
// Ações de Modal

// Local Storage API
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("cronos.cursos:cursos")) || [];
  },

  set(cursos) {
    localStorage.setItem("cronos.cursos:cursos", JSON.stringify(cursos)); // Array -> String
  }
}
// Local Storage API

// Lista Cursos
let cursos = [
  {
    id: 1,
    nome: "Desenvolvimento Web",
    descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti.",
    imagem: "./imagens/ilustra-web.png",
  },
  {
    id: 2,
    nome: "Marketing Digital",
    descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti.",
    imagem: "./imagens/ilustra-marketing.png",
  },
  {
    id: 3,
    nome: "Consultoria UX",
    descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti.",
    imagem: "./imagens/ilustra-ux.png",
  },
]
// Lista Cursos

// CRUD curso
const Curso = {
  all: Storage.get(),

  add(curso) {
    Curso.all.push(curso) // adicionar curso no localStorage

    App.reload();
  }
}
// CRUD curso

// Montando DOM
const DOM = {
  // corpo da tabela (onde os cursos são inseridos)
  cursosTabela: document.querySelector('.table tbody'),

  addCurso(curso) {
    DOM.cursosTabela.innerHTML += DOM.innerHTMLCursos(curso);
  },

  innerHTMLCursos(curso) {
    let htmlCursos = `
    <tr>
    <td>${curso.nome}</td>
    <td><img src="${curso.imagem}" class="img-fluid" /></td>
    <td>${curso.descricao}</td>
    <td>
      <button class="btn btn-secondary m-1">editar</button>
      <button class="btn btn-danger m-1">excluir</button>
    </td>
  </tr>
    `

    return htmlCursos
  },

  // limpar o html no Reload para não duplicar a informação
  limparHtml() {
    DOM.cursosTabela.innerHTML = "";
  }

}

// Montando DOM

// Informações formulário
const Form = {
  getValues() {
    return {
      nome: document.querySelector("#name").value,
      descricao: document.querySelector("#description").value,
      imagem: document.querySelector('input[name="input-img"]:checked').value,
    }
  },

  submit(event) {
    // Alterar comportamento padrão do submit
    event.preventDefault();

    // Buscar valores do Form
    const cursos = Form.getValues();
    // Fechar o modal
    Modal.close();
    // Salvar curso e Reload
    Curso.add(cursos)
  }
}
// Informações formulário

// Funções iniciar App
const App = {
  init() {
    // Montando html
    Curso.all.forEach(DOM.addCurso)

    // Set storage
    Storage.set(Curso.all)
  },
  reload() {
    DOM.limparHtml();
    App.init();
  }
}
// Funções iniciar App

App.init();