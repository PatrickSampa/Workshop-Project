const { app, BrowserWindow, ipcMain } = require('electron');
const db = require('./connection');
const Store = require('electron-store');
const { event } = require('jquery');
const store = new Store();







let mainWindow;

app.on('ready', () => {

        

        mainWindow = new BrowserWindow({
        width:1000,
        height:800,
        fullscreenable: false, 
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    

    mainWindow.loadURL(`file://${__dirname}/src/views/login.html`);


});

app.on("window-all-closed", ()=>{
    app.quit();
});



ipcMain.on('login', (event, data) => {
    validateLogin(data);
})


ipcMain.on('cadastroUser', (event, data) => {
  createUser(data);
})





function validateLogin(data) {
    const { usuario, senha } = data;
    const sql = 'SELECT * FROM usuarios WHERE nome=? AND senha=?';
  
    db.query(sql, [usuario, senha], (error, results, fields) => {
      if (error) {
        console.log(error);
      }
  
      if (results.length > 0) {
        console.log(results);
        store.set('usuario', results[0].usuario);
        store.set('nome', results[0].nome);
        store.set('senha', results[0].senha);
        store.set('permissao', results[0].permissao);

        const consultar = new BrowserWindow({
          width: 1000,
          height: 800,
          resizable: false,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          },
        });
    
        consultar.loadURL(`file://${__dirname}/src/views/consultar.html`);
    
        consultar.on('closed', () => {
          // Evento disparado quando a nova janela é fechada
          app.quit(); // Fechar o aplicativo quando a janela é fechada
        });
        
        consultar.maximize(); // Maximiza a janela "consultar"
        // Fechar a janela principal (mainWindow)
        mainWindow.close();
        mainWindow = null;
        
       
      }
    });
  }


  function createUser(data){
    const { nome, dataNascimento, email, telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao} = data;
    const sql = 'INSERT INTO clientes (nome, data_nascimento, email, numero_telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [nome, dataNascimento, email, telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao], (error) => {
      if(error){
        console.log(error)
      }
    })
  }

