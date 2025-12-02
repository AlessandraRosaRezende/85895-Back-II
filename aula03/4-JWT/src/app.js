const express = require('express');
const { authToken, generateToken } = require('./utils/utils')

const app = express();
app.use(express.json())

const users = [];

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const exists = users.find(user => user.email === email);
  if (exists) return res.status(408).send({ status: 'error', error: 'User already exists' });

  const user = {
    name,
    email,
    password
  };

  users.push(user);

  res.send({ status: "success", message: 'Usuário cadastrado' })
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });

  const access_token = generateToken(user.email);
  res.send({ status: "success", access_token })
});

app.get('/current', authToken, (req, res) => {
  const email = req.user;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send({ error: 'User not found' });

  const userToShow = {
    name: user.name,
    email: user.email
  };

  res.send({ status: "success", payload: userToShow });
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080')
});
