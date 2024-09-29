const express = require('express');
const app = express();
const port = 3000;


const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'db',
    port: 3306
});






app.get('/', (req, res) => {

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }
    console.log('Conectado como id ' + connection.threadId);
});

const sql = 'INSERT INTO people (nome) VALUES (?)';
const dados = ['Amanda'];
connection.query(sql, dados, (err, result) => {
    if (err) {
        console.error('Erro ao executar o INSERT: ' + err.message);
        return;
    }
    console.log('Registro inserido com sucesso! ID do registro: ' + result.insertId);
});

connection.query('SELECT * FROM people', (err, rows) => {
    if (err) throw err;
    
    console.log('Dados recebidos do MySQL:');
    console.log(rows);
    res.send(`
        <h1>Full Cycle Rocks!</h1>
        ${JSON.stringify(rows)}
    `);
});
});


app.listen(port, () => {
console.log(`Servidor Express rodando em http://localhost:${port}`);
});