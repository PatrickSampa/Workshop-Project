const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '22041985',
    database: 'oficina',
    port: '3306'
});

connection.connect(function (err) {
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
        return;
    } else {
        console.log('Conexion exitosa.');
    }
});

module.exports = connection;