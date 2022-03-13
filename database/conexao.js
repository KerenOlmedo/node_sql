/* eslint-disable linebreak-style */
const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'teste',
});

module.exports = conexao;
