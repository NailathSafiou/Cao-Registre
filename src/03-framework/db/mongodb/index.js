const mongoose = require("mongoose");

module.exports = () => {

  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/fnjs-demo';

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("we're connected!");
  });
}