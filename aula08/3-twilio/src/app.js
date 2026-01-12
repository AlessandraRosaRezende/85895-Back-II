const express = require('express');
const twilio = require('twilio');
const config = require('./config/config');

const app = express();

const client = twilio(config.account, config.token);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/sms', async (req, res) => {
  const result = await client.messages.create({
    to: '+5531992782642',
    from: config.number,
    body: 'Mensagem enviada via Twilio!'
  })
  return res.send({ status: 'success', result })
})

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
})