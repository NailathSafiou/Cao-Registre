const crypto = require("../util/crypto");

const CreateProfil = require("../../01-application/use_case/profil/CreateProfil");
const UpdateProfil = require("../../01-application/use_case/profil/UpdateProfil");
const GetProfilById = require("../../01-application/use_case/profil/GetProfilById");
const GetProfilByAccount = require("../../01-application/use_case/profil/GetProfilByAccount");
const DeleteProfil = require("../../01-application/use_case/profil/DeleteProfil");

const ProfilRepository = require("../storage/mongodb/MongoDBProfilRepository");
const UserAccountRepository = require("../storage/mongodb/MongoDBUserAccountRepository");
const CompagnyRepository = require("../storage/mongodb/MongoDBCompagnyRepository");

const DeleteUserAccount = require("../../01-application/use_case/user_account/DeleteUserAccount");
const GetAllProfil = require("../../01-application/use_case/profil/GetAllProfil");
const CreateUserAccount = require("../../01-application/use_case/user_account/CreateUserAccount");
const email = require("../util/email");
const active_account = require("../../00-enterprise/modeles/email/active_account");
const GetCompagny = require("../../01-application/use_case/compagny/GetCompagny");

module.exports = class {

  constructor(Profil, UserAccount, Compagny) {
    this.profilRepository = new ProfilRepository(Profil);
    this.userAccountRepository = new UserAccountRepository(UserAccount);
    this.compagnyRepository = new CompagnyRepository(Compagny);
  }

  async createNewProfil(req, res) {
    const profil = await CreateProfil(req.body, this.profilRepository);
    if (profil) {
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }

  async createNewUser(req, res) {
    const humanReadingPassword = req.body.password;
    req.body.password = crypto.encrypt(req.body.password);
    const account = await CreateUserAccount({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstname: req.body.profil.prenom,
      lastname: req.body.profil.nom,
      role: req.body.role,
    }, this.userAccountRepository);
    if (account) {
      email(req.body.email, "Activation de compte", active_account(req.body.email, req.body.username, humanReadingPassword));
      req.body.profil.account = account._id;
      const profil = await CreateProfil(req.body.profil, this.profilRepository);
      if (profil) {
        res.send({ profil, account });
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(500);
    }
  }

  async updateProfil(req, res) {
    const profil = await UpdateProfil(req.params.id, req.body, this.profilRepository);
    if (profil) {
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }

  async findAllUser(req, res) {
    const user = await GetAllProfil(this.profilRepository);
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(400);
    }
  }

  async findProfilById(req, res) {
    const profil = await GetProfilById(req.params.id, this.profilRepository);
    if (profil) {
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }

  async findProfilByAccount(req, res) {
    const profil = await GetProfilByAccount(req.params.accountId, this.profilRepository);
    if (profil) {
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }

  async deleteUser(req, res) {
    const profil = await DeleteProfil(req.params.id, this.profilRepository);
    if (profil) {
      const userAccount = await DeleteUserAccount(profil.account._id, this.userAccountRepository);
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }
}