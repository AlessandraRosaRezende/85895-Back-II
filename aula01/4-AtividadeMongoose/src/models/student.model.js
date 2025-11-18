const mongoose = require('mongoose');
const studentCollection = 'estudante';
const studentSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  sobrenome: {
    type: String,
    required: true
  },
  idade: {
    type: Number,
    required: true
  },
  dni: {
    type: String,
    required: true,
    unique: true
  },
  curso: {
    type: String,
    required: true
  },
  nota: {
    type: Number,
    required: true
  },
});
const studentModel = mongoose.model(studentCollection, studentSchema);

module.exports = studentModel;