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

app.listen(PORT, () => console.log(`Server listen on port: ${PORT}`));
