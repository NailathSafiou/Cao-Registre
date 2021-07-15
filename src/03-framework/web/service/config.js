const CompagnyModel = require("../../db/mongodb/model/compagny");
const UserAccountModel = require("../../db/mongodb/model/user_account");
const ProfilModel = require("../../db/mongodb/model/profil");

const ConfigController = require("../../../02-adapter/controller/configController");
const controller = new ConfigController(UserAccountModel, CompagnyModel, ProfilModel);

module.exports = async () => {
  await controller.configure();
}