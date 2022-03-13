const express = require('express');

const PORT = 3000;
const executaQuery = require('./database/queries');

const app = express();

app.use(express.json());

app.get('/user', async (req, res) => {
  const query = 'SELECT * FROM usuario;';
  const data = await executaQuery(query);
  res.json(data).status(200);
});

app.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM usuario WHERE idusuario = ${id};`;
    const data = await executaQuery(query);
    if (data.length <= 0) {
      throw new Error('Usuario não encontrado!');
    }
    res.json(data).status(200);
  } catch (error) {
    res.send({ error: error.message }).status(500);
  }
});

app.post('/user', async (req, res) => {
  try {
    const {
      nome, email, senha, status, telefone,
    } = req.body;
    const query = `INSERT INTO usuario(nome, email, senha, status, telefone) VALUE ("${nome}", "${email}", "${senha}", "${status}", "${telefone}");`;
    const data = await executaQuery(query);
    res.json(data).status(201);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.put('/user/:id', async (req, res) => {
  try {
    const {
      nome, email, senha, status, telefone,
    } = req.body;
    const { id } = req.params;
    const query = `UPDATE usuario SET nome = "${nome}", email = "${email}", senha = "${senha}", status = "${status}", telefone = "${telefone}" WHERE idusuario = ${id};`;
    await executaQuery(query);
    res.json({ message: 'Usuario modificado!' }).status(201);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM usuario WHERE idusuario = ${id};`;
    await executaQuery(query);
    res.json({ message: 'Usuario Apagado!' }).status(201);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.listen(PORT, () => console.log(`Server listen on port: ${PORT}`));
