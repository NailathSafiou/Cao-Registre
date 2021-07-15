const ProfilRepository = require("../../repository/ProfilRepository");

/**
 * @param {*} id 
 * @param {*} profil
 * @param {ProfilRepository} ProfilRepository 
 */
module.exports = async (id, profil, profilRepository) => {
  try {
    const p = await profilRepository.update(id, profil);
    return p;
  } catch (err) {
    console.log(err);
    return null;
  }
}