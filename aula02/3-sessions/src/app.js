// npm i express express-session

const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'secretCoder',
  resave: true, //resave mantem a sessão ativa mesmo em caso de inatividade
  saveUninitialized: true //saveUninitialized permite salvar qualquer sessão, mesmo que o objeto esteja vazio
}));

app.get('/session', (req, res) => {
  console.log(req.session);
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Você visitou o site ${req.session.counter} vezes`)
  } else {
    req.session.counter = 1;
    res.send('Seja bem vindo!')
  }
})


app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (!err) res.send('Logout ok!')
    else res.send({ status: 'Logout error', body: err });
  })
  console.log(req.session);
})


app.get('/login', (req,res) => {
  const { username, password } = req.query;

  if (username !== 'pepe' || password !== 'pepepass' ) {
    req.session.user = username;
    req.session.admin = true
    // return res.send('login failed')
  }

  req.session.user = username;
  req.session.admin = false;

  console.log('req.session no login', req.session);
  res.send('login success!')
})


const auth = (req, res, next) => {
  console.log(req.session?.admin);
  if (req.session?.admin) {
    return next();
  }

  return res.status(401).send('erro de autorização!')
}

app.get('/privado', auth, (req, res) => {
  console.log('req.session na rota privada', req.session);
  res.send('Se você está vendo isso, é porque é um admin')
})

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
})


// Para efetuar login, verifica - se se os dados inseridos pelo usuário estão corretos. 
// Se for, os dados desse usuário são salvos na sessão. 
// Além disso, a variável admin pode ser criada, também em sessão, com o valor true, que indica que o 
// usuário logado é um administrador.
