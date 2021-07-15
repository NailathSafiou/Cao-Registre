const mongoose = require("mongoose");

function randomFive(){
  return Math.floor(Math.random() * 5);
}

module.exports = mongoose.model('UserAccount', mongoose.Schema({
  username: { type: String, require: true, unique: true, sparse: true },
  password: { type: String, require: true },
  email: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  role: { type: String },
  isActive: { type: Boolean, default: false },
  last_connexion: { type: Date, default: Date.now },
  last_activity: { type: Date, default: Date.now },
  initial_color: { type: Number, default: randomFive, enum: [0, 1, 2, 3, 4] },
  created_at: { type: Date, default: Date.now }
}));