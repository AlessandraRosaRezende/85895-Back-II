const express = require('express');
const usersRouter = require('./routes/users.router');
const businessRouter = require('./routes/business.router');
const ordersRouter = require('./routes/orders.router');
const { port, connectDB } = require('./config/config')
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // IMPORTANTE: para que o express consiga interpretar JSON no body das requisições
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
app.get('/', (req, res) => {
  res.redirect('/api/users')
})

app.use('/api/users', usersRouter);
app.use('/api/business', businessRouter);
app.use('/api/orders', ordersRouter);

//Listen
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});