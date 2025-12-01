const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { generateToken, verifyToken } = require('./services/auth.service');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// login sem httpOnly
app.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Missing email');
  const token = generateToken({ email });
  // res.cookie('auth_token', token, { maxAge: 60 * 1000 /*1 minuto*/ });
  res.cookie('auth_token', token, {
    maxAge: 60 * 1000,
    httpOnly: false // depois muda pra true
  });
  res.sendStatus(200);
});

// rota protegida de teste
app.get('/protected', (req, res) => {
  const token = req.cookies.auth_token;
  const data = verifyToken(token);
  if (!data) return res.sendStatus(401);
  res.send(`Autenticado como ${data.email}`);
});

app.listen(8080, () => console.log('Rodando em http://localhost:8080'));

//document.cookie
// http://localhost:8080/login.html