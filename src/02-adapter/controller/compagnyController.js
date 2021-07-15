const GetCompagny = require("../../01-application/use_case/compagny/GetCompagny");
const UpdateCompagny = require("../../01-application/use_case/compagny/UpdateCompagny");
const CompagnyRepository = require("../storage/mongodb/MongoDBCompagnyRepository");

module.exports = class {
  
  constructor(Compagny){
    this.compagnyRepository = new CompagnyRepository(Compagny);
  }
  
  /**
   * Modifier les informations de la compagny
   * @param {*} req 
   * @param {*} res 
   */
  async updateCompagny(req, res){
    const compagny = await UpdateCompagny(req.params.id, req.body, this.compagnyRepository);
    if(compagny){
      res.send(compagny);
    } else {
      res.sendStatus(500);
    }
  }
  
  /**
   * Recuperer toute les informations de la compagny
   * @param {*} req 
   * @param {*} res 
   */
  async getCompagnyInformations(req, res){
    const compagny = await GetCompagny(this.compagnyRepository);
    if(compagny){
      res.send(compagny);
    } else {
      res.sendStatus(404);
    }
  }
}