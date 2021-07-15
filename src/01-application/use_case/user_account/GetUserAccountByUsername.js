const UserAccountRepository = require("../../repository/UserAccountRepository");

/**
 * 
 * @param {String} username 
 * @param {UserAccountRepository} userAccountRepository 
 */
module.exports = async (username, userAccountRepository) => {
  try {
    const userAccount = await userAccountRepository.findByUsername(username);
    return userAccount;
  }  catch(err){
    return null;
  } 
}