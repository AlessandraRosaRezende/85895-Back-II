const mongoose = require('mongoose');

const dbConn = mongoose.connect('mongodb://127.0.0.1:27017/class')
.then(() => {
  console.log('Database connected successfully');
}
).catch((error) => {
  console.error('Database connection error:', error);
});

module.exports = dbConn;