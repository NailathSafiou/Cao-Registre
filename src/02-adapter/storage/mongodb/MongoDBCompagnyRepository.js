const mongoose = require("mongoose");
const CompagnyRepository = require("../../../01-application/repository/CompagnyRepository");

module.exports = class extends CompagnyRepository {
  
  /**
   * 
   * @param {mongoose.Model} Model 
   */
  constructor(Model){
    super();
    this.Model = Model;
  }
  
  async create(compagny){
    const newCompagny = new this.Model(compagny);
    return await newCompagny.save();
  }
  
  async update(id, compagny){
    return await this.Model.findByIdAndUpdate(id, compagny, { new: true});
  }
  
  async get(){
    const compagnyArray = await this.Model.find({})
    return compagnyArray[0];
  }
}