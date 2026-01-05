const express = require('express');
const bodyParser = require('body-parser');
const brinquedosRouter = require('./routes/brinquedosRouter');
const usuariosRouter = require('./routes/usuariosRouter');
const connection = require('./config/database');
const { port } = require('./config/config');

const app = express();
app.use(bodyParser.json());

connection();

app.use('/brinquedos', brinquedosRouter);
app.use('/usuarios', usuariosRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});