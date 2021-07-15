const express = require("express");
const hbs = require("hbs");
const routes = require('./routes');

module.exports = (app) => {
  app.use(express.static(__dirname  + "/public"));
  app.set("view enging", 'hbs');
  app.set("views", __dirname + '/views');
  
  hbs.registerPartials(__dirname + '/views/core', function (err) {});
  hbs.registerPartials(__dirname + '/views/shared/', function (err) { });
  hbs.registerPartials(__dirname + '/views/pages/', function (err) { });
  
  routes(app);
}
