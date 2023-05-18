const { ipcRenderer } = require('electron');
const $ = require('jquery');

let usuario = document.getElementById('usuario');
let senha = document.getElementById('senha');
let error = document.getElementById('erro');

let loginButton = document.getElementById('btn-login');

loginButton.addEventListener("click", () =>{
    const verifificar = validarInputs();
    if(verifificar){
        login();
    }
})

const login = () => {
    if (!(usuario.value == '' && senha.value == '')) {
        const data = { usuario: usuario.value, senha: senha.value };

        ipcRenderer.send('login', data);
        

        setTimeout(errorLogin, 300);
    }
}

const errorLogin = () => {
    error.innerHTML = 'Usuário ou senha incorreto';
    error.classList.remove('erro')
    error.classList.add('erro-login')

        usuario.value = '';
        senha.value = '';
        usuario.focus();
    
}





const validarInputs = () => {
    let teste = true;
    if (usuario.value == '') {
        error.classList.remove('erro')
        error.classList.add('erro-login')
        error.innerHTML = 'Informe seu nome de usuário';
        teste = false;
    } else if (senha.value == '') {
        error.style.display = "block";
        error.innerHTML = 'Informe sua senha';
        error.classList.remove('erro')
        error.classList.add('erro-login')
        teste = false;
    }
    return teste;
}
