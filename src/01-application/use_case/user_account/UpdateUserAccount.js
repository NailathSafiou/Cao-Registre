const UserAccountRepository = require("../../repository/UserAccountRepository");

/**
 * 
 * @param {String} id 
 * @param {UserAccountRepository} userAccountRepository 
 */
module.exports = async (id, userAccountData, userAccountRepository) => {
    try {
      const created = await userAccountRepository.update(id, userAccountData);
      return created;
    } catch(err){
      return null;
    }
}