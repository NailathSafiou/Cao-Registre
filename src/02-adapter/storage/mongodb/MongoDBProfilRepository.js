const mongoose = require("mongoose");
const ProfilRepository = require("../../../01-application/repository/ProfilRepository");

module.exports = class extends ProfilRepository {

  /**
   * 
   * @param {mongoose.Model} Model 
   */
  constructor(Model) {
    super();
    this.Model = Model;
  }

  async create(data) {
    const newProfil = new this.Model(data);
    return await newProfil.save();
  }

  async update(id, profil) {
    return await this.Model.findByIdAndUpdate(id, profil, { new: true }).populate("account").exec();
  }

  async get(id) {
    return await this.Model.findOne({ _id: id }).populate("account").exec();
  }

  async getAll() {
    return await this.Model.find({}).populate("account").exec();
  }

  async getByAccount(id) {
    return await this.Model.findOne({ account: id }).populate("account").exec();
  }

  async delete(id) {
    return await this.Model.findByIdAndDelete(id).populate("account").exec();
  }
}