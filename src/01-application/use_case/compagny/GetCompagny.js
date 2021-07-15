const CompagnyRepository = require("../../repository/CompagnyRepository");

/**
 * @param {*} id 
 * @param {CompagnyRepository} compagnyRepository 
 */
module.exports = async (compagnyRepository) => {
  try {
    const p = await compagnyRepository.get();
    return p;
  } catch(err){
    console.log(err);
    return null;
  }
}