const compagnyRepository = require("../storage/mongodb/MongoDBCompagnyRepository");
const UserAccountRepository = require("../storage/mongodb/MongoDBUserAccountRepository");
const ProfilRepository = require("../storage/mongodb/MongoDBProfilRepository");

const email = require("../util/email");
const crypto = require("../util/crypto");

const port = process.env.PORT || 9047;

module.exports = class {

  constructor(UserAccount, compagny, Profil) {
    this.UserAccount = UserAccount;
    this.compagny = compagny;
    this.Profil = Profil;
    this.compagnyRepository = new compagnyRepository(compagny);
    this.userAccountRepository = new UserAccountRepository(UserAccount);
    this.ProfilRepository = new ProfilRepository(Profil);
  }

  async configure() {
    try {
      const alreadyExist = await this.accountExist();
      const password = process.env.ADMIN_PASSWORD || "1234560";
      const rootAccount = await this.createRootUserAccountIfNotExist({
        "email": process.env.ADMIN_EMAIL || "orphee.nve@sing.ga",
        "username": process.env.ADMIN_USERNAME || "orphee.nve@sing.ga",
        "password": crypto.encrypt(password),
        "firstname": process.env.ADMIN_FIRSTNAME || "Super",
        "lastname": process.env.ADMIN_LASTNAME || "Admin",
        "role": "Root"
      });
      const compagny = await this.createcompagnyIfNotExist();
      const url = process.env.URL || `http://localhost:${port}` ;
      if (!alreadyExist) {
        const email_address = rootAccount.email;
        const username = rootAccount.username;
        email(email_address, "Activation de compte",
          require("../../00-enterprise/modeles/email/active_account")(email_address, username, password));
        await this.createRootProfilIfNotExist({
          nom: "Super",
          prenom: "Admin",
          account: rootAccount._id
        });
      }
      console.log("done !");
    } catch (err) {
      console.log(err);
    }
  }


  async accountExist() {
    const userAccount = await this.UserAccount.findOne({ role: 'Root' });
    return userAccount != null;
  }

  async createRootUserAccountIfNotExist(userAccountData) {
    const userAccount = await this.UserAccount.findOne({ role: 'Root' });
    if (userAccount) {
      return userAccount;
    } else {
      const created = new this.UserAccount(userAccountData);
      return await created.save();
    }
  }


  async createRootProfilIfNotExist(profilData) {
    const profil = await this.Profil.findOne({ account: profilData.account });
    if (profil) {
      return profil;
    } else {
      const created = new this.Profil(profilData);
      return await created.save();
    }
  }

  async createcompagnyIfNotExist() {
    const compagny = await this.compagny.find({});
    if (compagny[0]) {
      return compagny[0];
    } else {
      const created = new this.compagny({});
      return await created.save();
    }
  }
}