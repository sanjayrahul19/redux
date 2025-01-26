const mongoose = require('mongoose');

const connect =async () => {
try {
await mongoose.connect('mongodb://localhost:27017/node-crud');
  console.log('Connected to MongoDB');
} catch (error) {
console.log(error);
}
}

module.exports = connect
