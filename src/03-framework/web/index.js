const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const webApp = require("./app");
const webService = require("./service");

module.exports = () => {
  
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: '100Mb'}));
  app.use(bodyParser.urlencoded({ extended: true}));

  webService(app);
  webApp(app);

  const port = process.env.PORT || 9047;
  const appInitial = process.env.APP_INITIAL || 'FNJS'
  app.listen(port, () => {
    console.log("(" + appInitial + ") Listenning at " + port);
  });
}