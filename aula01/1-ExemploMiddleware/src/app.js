const express = require('express');
const cors = require('cors')

const app = express();

// middleware de rota
const router = express.Router();

// middleware nativo
app.use(express.json()) // middleware para reconhecer o body

// middleware de terceiros
app.use(cors())

app.get('/antes', (req, res) => {
  res.send('Antes do middleware de aplicação')
})

// middleware de aplicação
app.use((req, res, next) => {
  console.log('Middleware de aplicação executado na data: ', new Date());
  next()
})

// app.get('/', (req, res) => { // método HTTP GET - localhost:8080/
//   res.send('Oi')
// })

app.get('/', (req, res) => { 
  if(!req.body.name) {
    throw new Error('Erro')
  }
  res.send('Depois do Middleware')
})

app.get('/depois', (req, res) => {
  res.send('Depois do Middleware')
})

// middleware de endpoint
const mid1 = (req, res, next) => { // 3 parâmetros
  req.mid1 = 'Middleware 1';
  next()
}

const mid2 = (req, res, next) => {
  req.mid2 = 'Middleware 2';
  next()
}

// app.get('/endpoint', mid1, mid2, (req, res) => {
//   res.json({ mid1: req.mid1, mid2: req.mid2 })
// })

const mid3 = (req, res, next) => {
  req.mid3 = 'Middleware 3';
  next()
}

app.get('/endpoint', mid1, mid2, mid3, (req, res) => {
  res.json({ mid1: req.mid1, mid2: req.mid2, mid3: req.mid3})
})

// middleware de erro - tem que ser o último! 4 parâmetros
app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).json('Middleware de erro - Algo deu errado')
})

app.listen(8080, () => {
  console.log('Rodando na porta 8080');
})