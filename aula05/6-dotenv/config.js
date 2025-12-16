const dotenv = require('dotenv');

const environment = 'production'; // Change this value to switch environments

dotenv.config({ path: `.env.${environment}` });

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD
}
