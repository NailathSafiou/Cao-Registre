const UserAccountRepository = require("../../repository/UserAccountRepository");

/**
 * 
 * @param {String} id 
 * @param {UserAccountRepository} userAccountRepository 
 */
module.exports = async (id, userAccountRepository) => {
  try {
    const userAccount = await userAccountRepository.findById(id);
    return userAccount;
  }  catch(err){
    return null;
  } 
}