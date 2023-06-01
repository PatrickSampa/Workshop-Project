const { ipcRenderer } = require('electron');

let nome = document.getElementById('nome');
let dataNasc = document.getElementById('dataNasc');
let email = document.getElementById('email');
let telefone = document.getElementById('telefone');
let cpf = document.getElementById('cpf');
let rg = document.getElementById('rg');
let cidade = document.getElementById('cidade');
let bairro = document.getElementById('bairro');
let rua = document.getElementById('rua');
let casa = document.getElementById('casa');
let refen = document.getElementById('refen');
let obs = document.getElementById('obs');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener("submit", async (e) => {
    e.preventDefault();
    /* let a = document.getElementById('consultar');
    a.click(); */
    nome.value  = "";
    dataNasc.value  = "";
    email.value  = "";
    telefone.value  = "";
    cpf.value  = "";
    rg.value  = "";
    cidade.value  = "";
    bairro.value  = "";
    rua.value  = "";
    casa.value  = "";
    refen.value  = "";
    obs.value  = "";
    cadastrar.value = "";
    Swal.fire(
        'Sucesso!!',
        'Cliente Cadastrado',
        'success'
      )
    console.log(nome)
    console.log(dataNasc)
    console.log(email)
    console.log(telefone)
    console.log(cpf)
    console.log(rg)
    console.log(cidade)
    console.log(bairro)
    console.log(rua)
    console.log(casa)
    console.log(refen)
    console.log(obs)
    
})







