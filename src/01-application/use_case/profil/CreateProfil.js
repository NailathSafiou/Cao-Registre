const ProfilRepository = require("../../repository/ProfilRepository");

/**
 * 
 * @param {*} profil 
 * @param {ProfilRepository} profilRepository 
 */
module.exports = async (profil, profilRepository) => {
  try {
    const p = await profilRepository.create(profil);
    return p;
  } catch (err) {
    console.log(err);
    return null;
  }
}