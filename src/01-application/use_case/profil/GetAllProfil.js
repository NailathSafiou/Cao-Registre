const ProfilRepository = require("../../repository/ProfilRepository");

/**
 * @param {ProfilRepository} ProfilRepository 
 */
module.exports = async (profilRepository) => {
  try {
    const p = await profilRepository.getAll();
    return p;
  } catch (err) {
    console.log(err);
    return null;
  }
}