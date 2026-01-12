const express = require('express');
const twilio = require('twilio');
const config = require('./config/config');

const app = express();
app.use(express.json());

const client = twilio(config.account, config.token);

app.get('/', (req, res) =>{
  res.send('Hello World');
})

app.get('/sms', async (req, res) => {
  const { name, product } = req.query;

  const result = await client.messages.create({
    to: '+5531992782642',
    from: config.number,
    body: `Obrigado, ${name}, por comprar o produto ${product} conosco!`
  });
  return res.send({ status: 'success', result });
})

app.listen(8080, () => {
  console.log('Server running on port 8080');
})
