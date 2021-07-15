const CompagnyRepository = require("../../repository/CompagnyRepository");

/**
 * 
 * @param {*} pharmacy 
 * @param {CompagnyRepository} compagnyRepository 
 */
module.exports = async (compagny, compagnyRepository) => {
  try {
    const p = await compagnyRepository.create(compagny);
    return p;
  } catch(err){
    console.log(err);
    return null;
  }
}