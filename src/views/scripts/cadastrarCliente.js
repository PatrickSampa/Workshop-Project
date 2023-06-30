const { ipcRenderer } = require('electron');


localStorage.setItem('teste',false)

let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener("submit", async (e) => {
    e.preventDefault();

    

  try{
    const UserNãoCadHtml = document.getElementById('clienteCad');
    let nomeElement = document.getElementById('nome');
    let dataNascElement = document.getElementById('dataNasc');
    let emailElement = document.getElementById('email');
    let telefoneElement = document.getElementById('telefone');
    let cpfElement = document.getElementById('cpf');
    let rgElement = document.getElementById('rg');
    let cidadeElement = document.getElementById('cidade');
    let bairroElement = document.getElementById('bairro');
    let ruaElement = document.getElementById('rua');
    let casaElement = document.getElementById('casa');
    let refenElement = document.getElementById('refen');
    let obsElement = document.getElementById('obs');
    
    let nome = nomeElement.value || "Null";
    let dataNasc = dataNascElement.value || new Date(1, 0, 1);
    let email = emailElement.value || "Null";
    let telefone = telefoneElement.value || "Null";
    let cpf = cpfElement.value || "Null";
    let rg = rgElement.value || "Null";
    let cidade = cidadeElement.value || "Null";
    let bairro = bairroElement.value || "Null";
    let rua = ruaElement.value || "Null";
    let casa = casaElement.value || "Null";
    let refen = refenElement.value || "Null";
    let obs = obsElement.value || "Null";
    
/*     nome.value = "";
    console.log(nome)
    dataNasc.value = "";
    email.value = "";
    telefone.value = "";
    cpf.value = "";
    rg.value = "";
    cidade.value = "";
    bairro.value = "";
    rua.value = "";
    casa.value = "";
    refen.value = "";
    obs.value = ""; */


    data = {nome: nome, dataNascimento: dataNasc, email: email, telefone: telefone, cpf: cpf, rg: rg, cidade: cidade, bairro: bairro, rua: rua, casa: casa, referencia: refen, observacao: obs}

    ipcRenderer.send('cadastroUser', data);
/*     const resultado = await ipcRenderer.invoke('cadastroUserTeste', true);
   console.log("Invoke: " + resultado); // true
 */

   ipcRenderer.on('resposta-para-aba-html', (event, resposta) => {
    console.log("Dntro: " + resposta); // 'OK'
    executarAposResposta(resposta);
  });

  function executarAposResposta(resposta) {
    if(resposta){
      nomeElement.value = "";
      dataNascElement.value = "";
      emailElement.value = "";
      telefoneElement.value = "";
      cpfElement.value = "";
      rgElement.value = "";
      cidadeElement.value = "";
      bairroElement.value = "";
      ruaElement.value = "";
      casaElement.value = "";
      refenElement.value = "";
      obsElement.value = "";
      UserNãoCadHtml.style.display = 'none'
      Swal.fire(
        'Sucesso!!',
        'Cliente Cadastrado',
        'success'
      );
    }else{
      UserNãoCadHtml.style.display = 'block'
    }

  }
  }catch(e){
    console.log('Errrrro: ' + e)
    //Mensagem de erro ao cadastrar
  }
    





    

})







