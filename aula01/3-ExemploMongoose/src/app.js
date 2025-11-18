const express = require('express');
const dbConn = require('./db/connection');
const usersRouter = require('./routes/users.router');

const app = express();
app.use(express.json()); // middleware para reconehcer o body da requisição
app.use(express.urlencoded({ extended: true })); // aceitar carcateres especiais

// Connect to the database
dbConn.then(() => {
  console.log('Database connection established');
})

// Router Express
app.use('/api/users', usersRouter);

// Healthy check
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

module.exports = app;