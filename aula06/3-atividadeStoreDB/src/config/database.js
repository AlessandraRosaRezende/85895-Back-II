const mongoose = require('mongoose');
const { mongoUrl } = require('./config');

const connection = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Conectado com sucesso ao MongoDB!');
  } catch (error) {
    console.log('Erro ao conectar ao MongoDB');
    console.error(error);
    process.exit(1);
  }
}

module.exports = connection