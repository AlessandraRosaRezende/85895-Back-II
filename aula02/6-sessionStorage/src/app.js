// npm i express cookie-parser connect-mongo express-session

require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')

const app = express()
app.use(cookieParser())

app.use(session({
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl:1000,
  }),
  secret: 'CoderSecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000,
    httpOnly: true
  }
}))

const auth = (req, res, next) => {
  if (!req.sessionID) {
    return res.status(401).send("cookie ausente!");
  }

  if (!req.session) {
    return res.status(401).send("sessão não encontrada no banco!");
  }

  if (!req.session.admin) {
    return res.status(403).send("não autorizado!");
  }

  next();
};

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (!err) res.send('Logout ok!')
    else res.send({ status: 'Logout error', body: err });
  })
})

app.get('/login', (req,res) => {
  const { username, password } = req.query;

  if (username !== 'pepe' || password !== 'pepepass' ) {
    return res.send('login failed')
  }

  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1
  }

  req.session.user = username;
  req.session.admin = true

  console.log(req.session);
  res.send('login success!')
})

app.get('/privado', auth, (req, res) => {
  res.send('Se você está vendo isso, é porque é um admin')
})

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
})


// { "_id": "G1r-eTk99FUjK6KskuqfZiQjusnPHuuS", "expires": { "$date": { "$numberLong": "1764029265625" } }, "session": "{\"cookie\":{\"originalMaxAge\":10000,\"expires\":\"2025-11-25T00:07:45.625Z\",\"httpOnly\":true,\"path\":\"/\"},\"counter\":1,\"user\":\"pepe\",\"admin\":true}" }

// {"_id":"1rPscB9DPTwbUC-XViYdLPl0OuR0Smlj","expires":{"$date":{"$numberLong":"1764029334144"}},"session":"{\"cookie\":{\"originalMaxAge\":10000,\"expires\":\"2025-11-25T00:08:53.063Z\",\"httpOnly\":true,\"path\":\"/\"},\"counter\":1,\"user\":\"pepe\",\"admin\":true}"}