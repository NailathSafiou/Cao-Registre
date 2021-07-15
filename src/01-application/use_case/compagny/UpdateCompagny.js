const CompagnyRepository = require("../../repository/CompagnyRepository");

/**
 * @param {*} id 
 * @param {*} compagny 
 * @param {CompagnyRepository} compagnyRepository 
 */
module.exports = async (id, compagny, compagnyRepository) => {
  try {
    const p = await compagnyRepository.update(id, compagny);
    return p;
  } catch(err){
    console.log(err);
    return null;
  }
}