const ProfilRepository = require("../../repository/ProfilRepository");

/**
 
 * @param {*} accounId
 * @param {ProfilRepository} ProfilRepository 
 */
module.exports = async (accounId, profilRepository) => {
  try {
    const p = await profilRepository.getByAccount(accounId);
    return p;
  } catch (err) {
    console.log(err);
    return null;
  }
}