const { ipcRenderer } = require('electron');


let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener("submit", async (e) => {
    e.preventDefault();

    

  try{

    let nome = document.getElementById('nome').value || "Null";
    let dataNasc = document.getElementById('dataNasc').value || "Null";
    let email = document.getElementById('email').value || "Null";
    let telefone = document.getElementById('telefone').value || "Null";
    let cpf = document.getElementById('cpf').value || "Null";
    let rg = document.getElementById('rg').value || "Null";
    let cidade = document.getElementById('cidade').value || "Null";
    let bairro = document.getElementById('bairro').value || "Null";
    let rua = document.getElementById('rua').value || "Null";
    let casa = document.getElementById('casa').value || "Null";
    let refen = document.getElementById('refen').value || "Null";
    let obs = document.getElementById('obs').value || "Null";
    data = {nome: nome, dataNascimento: dataNasc, email: email, telefone: telefone, cpf: cpf, rg: rg, cidade: cidade, bairro: bairro, rua: rua, casa: casa, referencia: refen, observacao: obs}


    ipcRenderer.send('cadastroUser', data);

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


    Swal.fire(
      'Sucesso!!',
      'Cliente Cadastrado',
      'success'
    )
  }catch(e){
    console.log(e)
    //Mensagem de erro ao cadastrar
  }
    





    

})







