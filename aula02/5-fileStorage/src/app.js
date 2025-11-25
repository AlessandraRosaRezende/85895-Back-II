// npm i express express-session session-file-store cookie-parser

const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fileStore = require('session-file-store')
const path = require('path')

const app = express()
const FileStore = fileStore(session)

app.use(cookieParser())

const pathFile = path.join(__dirname, './sessions')
const store = new FileStore({ path: pathFile, ttl: 100, retries: 0 });

app.use(session({
  store,
  secret: 'CoderSecret',
  resave: true,
  saveUninitialized: true
}))

const auth = (req, res, next) => {
  console.log('req.session no auth', req.session);
  if (!req.sessionID) {
    return res.status(401).send('Sessão inexistente!');
  }

  store.get(req.sessionID, (err, sessionData) => {
    if (err || !sessionData) {
      return res.status(401).send('Sessão expirada ou inválida!');
    }

    if (!sessionData.admin) {
      return res.status(403).send('Não autorizado!');
    }

    next();
  });
}

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (!err) res.send('Logout ok!')
    else res.send({ status: 'Logout error', body: err });
  })
})

app.get('/login', (req,res) => {
  const { username, password } = req.query;

  if (username !== 'pepe' || password !== 'pepepass' ) {
    req.session.admin = false
    return res.status(401).send('Login inválido!')
  }

  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1
  }

  req.session.user = username;
  req.session.admin = true

  console.log('req.session no login', req.session);
  res.send('login success!')
})

app.get('/privado', auth, (req, res) => {
  console.log('req.session na rota /privado', req.session);
  res.send('Se você está vendo isso, é porque é um admin')
})

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
})
