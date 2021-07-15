const ProfilRepository = require("../../repository/ProfilRepository");

/**
 * @param {*} id 
 * @param {ProfilRepository} ProfilRepository 
 */
module.exports = async (id, profilRepository) => {
  try {
    const p = await profilRepository.get(id);
    return p;
  } catch (err) {
    console.log(err);
    return null;
  }
}