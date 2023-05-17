const { app, BrowserWindow, ipcMain } = require('electron');
const db = require('./connection');
const Store = require('electron-store');
const store = new Store();

app.on('ready', () => {

    let mainWindow = new BrowserWindow({
        width:1000,
        height:800,
        fullscreenable: false, 
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);


});

app.on("window-all-closed", ()=>{
    app.quit();
});


ipcMain.on('login', (event, data) => {
    validateLogin(data);
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
        
  
        /* createWindowDashboard();
        window.loadFile(path.join(__dirname, 'views/consultar.html'));
        window.maximize();
        window.show();
        loginWindow.close(); */
      }
    });
  }