const UserAccountRepository = require("../../repository/UserAccountRepository");

/**
 * 
 * @param {String} id 
 * @param {UserAccountRepository} userAccountRepository 
 */
module.exports = async (id, userAccountRepository) => {
    try {
      const deleted = await userAccountRepository.delete(id);
      return deleted;
    } catch(err){
      return null;
    }
}