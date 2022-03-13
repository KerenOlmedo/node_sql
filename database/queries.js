/* eslint-disable no-unused-vars */
const conexao = require('./conexao');

const executaQuery = (query, parametros = '') => new Promise((resolve, reject) => {
  conexao.query(query, parametros, (erros, resultados, campos) => {
    if (erros) {
      reject(erros);
    } else {
      resolve(resultados);
    }
  });
});

module.exports = executaQuery;
