const auth = require("./auth");
const config = require("./config");
const profil = require("./profil");
const account = require("./account");
const compagny = require("./compagny");

module.exports = (app) => {

  auth(app);

  app.use("/api/profil", profil(app));
  app.use("/api/account", account(app));
  app.use("/api/compagny", compagny(app));

  config();
  
}