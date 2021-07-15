const UserAccountRepository = require("../../../01-application/repository/UserAccountRepository");

module.exports = class extends UserAccountRepository {


  constructor(Model) {
    super();
    this.Model = Model;
  }

  async create(data) {
    const newEntity = new this.Model(data);
    return await newEntity.save();
  }

  async update(id, data) {
    return await this.Model.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id) {
    return await this.Model.findOne({ _id: id });
  }

  async findByUsername(username) {
    return await this.Model.findOne({ username });
  }

  async delete(id) {
    return await this.Model.findByIdAndDelete(id);
  }

}