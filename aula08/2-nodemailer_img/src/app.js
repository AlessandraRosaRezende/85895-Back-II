require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  },
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/mail', async (req, res) => {
  const result = await transport.sendMail({
    from: `Coder Tests <${process.env.GMAIL_USER}>`,
    to: `endereço para onde o email será enviado <${process.env.GMAIL_USER}>`,
    subject: 'Test email with Node.js and Nodemailer',
    html: `
      <div>
        <h1 style="color: blue;">This is a test email</h1>
        <p>This email was sent using <b>Node.js</b> and <b>Nodemailer</b>!</p>
        <img src="cid:bob">
      </div>
    `,
    attachments: [{
      filename: 'bob.jpg',
      path: __dirname + '/images/bob.jpg',
      cid: 'bob'
    }]
  });
  return res.json({ message: 'Email sent', result });
})

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});