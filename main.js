const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
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
  
    const User = await createUser(data)
  event.reply('resposta-para-aba-html', User)
  

  
  
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



  async function createUser(data) {
    try{
      const User = await UserExistente(data);
      console.log('Userrrr: ' + User)
      console.log(data.nome, data.dataNascimento, data.email, data.telefone, data.cpf, data.rg, data.cidade, data.bairro, data.rua, data.casa, data.referencia, data.observacao)
      const { nome, dataNascimento, email, telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao } = data;
      const sql = 'INSERT INTO clientes (nome, data_nascimento, email, numero_telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(sql, [nome, dataNascimento, email, telefone, cpf, rg, cidade, bairro, rua, casa, referencia, observacao], (error) => {
        if (error) {
          console.log("ERROOOOO");
           // Rejeitar a Promise com o erro
        } else {
          console.log("PASSOU PELO ERRO");
       // Resolver a Promise com o valor desejado (true)
        }
      });    
      return true  
    }catch(erro){
      console.log("ENTROU CATTCH ERR0")
      return false
    }

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






  ipcMain.on('cadastroVeiculo', async (event, data) => {
    let CadVeoculo = await cadVeiculo(data);
    
    
    event.reply('cadVeiculo', CadVeoculo);
    
  
    
    
    /* console.log(p) */
  })
  


  async function cadVeiculo(data){
    try{
      const user = await CpfCadasVeiculo(data);
      const  {modelo, marca, tipo, placa, ano, cpf} = data
      const sql = 'INSERT INTO veiculos (modelo, marca, tipo, placa, ano, cpf) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(sql, [modelo, marca, tipo, placa, ano, cpf] , (error) => {
        if(error){
          console.log("ERRO")
        }else{
          console.log("Passou pelo erro")
        }
      })
      return true
    }catch(e){
      return false;
    }
  }



  function CpfCadasVeiculo(data){
    return new Promise((resolve, reject) => {
      const { cpf } = data;
      const sql = 'SELECT * FROM clientes WHERE cpf=?';
  
      db.query(sql, [cpf], (error, results, fields) => {
        if (results.length >= 1) {
          resolve(results);
        } else {
          reject(new Error());
        }
      });
    });
  }