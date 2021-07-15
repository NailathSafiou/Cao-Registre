const express = require("express");
const router = express.Router();

const CompagnyModel = require("../../db/mongodb/model/compagny");
const CompagnyController = require("../../../02-adapter/controller/compagnyController");
const controller = new CompagnyController(CompagnyModel);

module.exports = (app) => {
  
  
  /**
   * Recuperer les information d'un compte utilisateur
   */
  router.get("/", async (req, res) => {
    await controller.getCompagnyInformations(req, res);
  });

  
  /**
   * Modifier les informations d'un compte utilisateur
   */
  router.put("/:id", app.oauth.authorise(), async (req, res) => {
    await controller.updateCompagny(req, res);
  });
  
  return router;
};