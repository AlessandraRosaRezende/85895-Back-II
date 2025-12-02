const userModel = require('../models/User');
const { createHash, isValidPassword } = require('../utils/utils');

async function registerUser(userData) {
  const existingUser = await userModel.findOne({ email: userData.email });
  if (existingUser) throw new Error('Usuário já existe');
  const hashPass = createHash(userData.password);
  const newUser = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    age: userData.age,
    password: hashPass
  }
  const user = await userModel.create(newUser);
  console.log("userData.password", userData.password);
  console.log("hashPass", hashPass);
  return user;
}

async function loginUser(email, password) {
  const user = await userModel.findOne({ email });
  let result = false;

  if (user) { //antes de tentar comparar a senha, é preciso saber se o usuário existe no banco
    const valid = isValidPassword(user.password, password);
    console.log("Senha enviada no body:", password);
    console.log("Senha do banco: ", user.password);
    console.log("Senha enviada hasheada: ", createHash(password));
    console.log("Hash salvo:", user.password);

    if (valid) {
      result = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
      };
    }
  }

  return result;
}

module.exports = {
  registerUser,
  loginUser
};
