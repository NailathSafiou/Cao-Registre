const login = require("./login");
const home = require("./home");
const root = require("./root");

const appName = process.env.APP_NAME || "FNJS";

module.exports = (app) => {
  
  app.use("/login", login);
  app.use("/home", home);
  app.use("/root", root);
  
  app.get("/", (req, res) => {
    res.redirect("/login");
  })
  
  app.get("/hello", (req, res) => {
    res.render('hello.hbs', { title: appName + ' - Hello world'});
  });
}