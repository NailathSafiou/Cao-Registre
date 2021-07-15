const initDB = require("./db");
const initWeb = require("./web");

module.exports = () => {
  initDB();
  initWeb();
}