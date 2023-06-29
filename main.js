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


ipcMain.on('cadastroUser', async (event, data) => {
  //let UserCreat = createUser(data);
  store.set('t',"arroz");

  
  /* console.log(p) */
})

/* ipcMain.handle('cadastroUserTeste', (event, data) => {
  if (data) {
    console.log('passou');
    return true;
  }
  return false; // Retorne o valor desejado caso a condição não seja atendida
});

 */

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


  function createUser(data) {
      
      const { nome, dataNascimento, email, telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao } = data;
      const sql = 'INSERT INTO clientes (nome, data_nascimento, email, numero_telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(sql, [nome, dataNascimento, email, telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao], (error) => {
        if (error) {
          console.log("ERROOOOO");
          reject(error); // Rejeitar a Promise com o erro
        } else {
          console.log("PASSOU PELO ERRO");
          resolve(true); // Resolver a Promise com o valor desejado (true)
        }
      });
  }


  function UserExistente(data) {
    return new Promise((resolve, reject) => {
      const { cpf } = data;
      const sql = 'SELECT * FROM clientes WHERE cpf=?';
  
      db.query(sql, [cpf], (error, results, fields) => {
        if (results.length >= 1) {
          reject(new Error());
        } else {
          resolve(results);
        }
      });
    });
  }