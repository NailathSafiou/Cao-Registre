const express = require("express");
const router = express.Router();

const Profil = require("../../db/mongodb/model/profil");
const UserAccount = require("../../db/mongodb/model/user_account");
const Compagny = require("../../db/mongodb/model/compagny");
const ProfilController = require("../../../02-adapter/controller/profilController");

const controller = new ProfilController(Profil, UserAccount, Compagny);

module.exports = (app) => {

  router.post("/", app.oauth.authorise(), async (req, res, next) => {
    await controller.createNewProfil(req, res);
  });

  router.post("/with-account", app.oauth.authorise(), async (req, res, next) => {
    await controller.createNewUser(req, res, next);
  })

  router.put("/:id", app.oauth.authorise(), async (req, res, next) => {
    await controller.updateProfil(req, res);
  });

  router.get("/", app.oauth.authorise(), async (req, res, next) => {
    await controller.findAllUser(req, res);
  });

  router.get("/:id", app.oauth.authorise(), async (req, res, next) => {
    await controller.findProfilById(req, res);
  });

  router.get("/search/by-account/:accountId", app.oauth.authorise(), async (req, res, next) => {
    await controller.findProfilByAccount(req, res);
  });

  router.get("/search/by-account", app.oauth.authorise(),
    (req, res, next) => {
      req.params.accountId = req.user._id;
      next();
    },
    async (req, res, next) => {
      await controller.findProfilByAccount(req, res);
    });

  router.delete("/:id", app.oauth.authorise(), async (req, res, next) => {
    await controller.deleteUser(req, res);
  });

  return router;
};