const CreateUserAccount = require("../../01-application/use_case/user_account/CreateUserAccount");
const UpdateUserAccount = require("../../01-application/use_case/user_account/UpdateUserAccount");
const GetUserAccount = require("../../01-application/use_case/user_account/GetUserAccountById");
const UserAccountRepository = require("../storage/mongodb/MongoDBUserAccountRepository");

const crypto = require("../util/crypto");
const GetUserAccountByUsername = require("../../01-application/use_case/user_account/GetUserAccountByUsername");
const email = require("../util/email");
const active_account = require("../../00-enterprise/modeles/email/active_account");

module.exports = class {

  constructor(UserAccount) {
    this.userAccountRepository = new UserAccountRepository(UserAccount);
  }

  /**
   * Creer un compte utilisateur
   */
  async registerAccount(req, res) {
    if (req.body.password) {
      req.body.password = crypto.encrypt(req.body.password);
      const account = await CreateUserAccount(req.body, this.userAccountRepository);
      if (account) {
        res.send(account);
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(403);
    }
  }

  /**
   * Modifier les informations d'un compte utilisateur (Crypter le mot de passe pour le modifier)
   */
  async modifyAccount(req, res) {
    if(req.body.password){
      req.body.password = crypto.encrypt(req.body.password);
    }
    const account = await UpdateUserAccount(req.params.id, req.body, this.userAccountRepository);
    if (account) {
      res.send(account);
    } else {
      res.sendStatus(500);
    }
  }

  /**
   * Recuperer toute les informations du compte utilisateur correspondant a un _id
   */
  async getAccountInformation(req, res) {
    const account = await GetUserAccount(req.params.id, this.userAccountRepository);
    if (account) {
      res.send(account);
    } else {
      res.sendStatus(500);
    }
  }
  
  /**
   * Desactive le compte si il existe et envoi un email de reinialisation
   */
  async desactiveAccountAndSendEmail(req, res) {
    const account = await GetUserAccountByUsername(req.params.username, this.userAccountRepository);
    if(account){
      const password = Math.floor(Math.random() * 99999999999).toString();
      const update = await UpdateUserAccount(account._id, { isActive: false, password: crypto.encrypt(password) }, this.userAccountRepository);
      email(account.username, "Mot de passe oublie", active_account(account.username, account.username, password));
      res.send(update);
    } else {
      res.sendStatus(500);
    }
  }
}

