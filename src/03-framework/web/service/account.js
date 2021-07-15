const express = require("express");
const router = express.Router();

const UserAccountModel = require("../../db/mongodb/model/user_account");
const UserAccountController = require("../../../02-adapter/controller/userAccountController");
const controller = new UserAccountController(UserAccountModel);

module.exports = (app) => {

  /**
   * Creer un utilisateur
   */
  router.post("/", async (req, res) => {
    await controller.registerAccount(req, res);
  });


  /**
   * Authentification, generation de token
   */
  router.post('/login', app.oauth.grant(), (query, res) => {
    console.log("After authentification");
  });


  /**
   * Recuperer les information d'un compte utilisateur
   */
  router.get("/:id", app.oauth.authorise(), async (req, res) => {
    await controller.getAccountInformation(req, res);
  });

  
  router.get("/reactive/:username", async (req, res) => {
    await controller.desactiveAccountAndSendEmail(req, res);
  })

  /**
   * Modifier les informations d'un compte utilisateur
   */
  router.put("/:id", app.oauth.authorise(), async (req, res) => {
    await controller.modifyAccount(req, res);
  });

  /**
 * Modifier mon compte utilisateur
 */
  router.put("/", app.oauth.authorise(),
    (req, res, next) => {
      req.params.id = req.user._id;
      next();
     },
    async (req, res) => {
      await controller.modifyAccount(req, res);
    });

  return router;
};