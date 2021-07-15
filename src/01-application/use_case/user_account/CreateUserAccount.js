const UserAccountRepository = require("../../repository/UserAccountRepository");

/**
 * 
 * @param {UserAccountRepository} userAccountRepository 
 */
module.exports = async (userAccount, userAccountRepository) => {
  try {
    const created = await userAccountRepository.create(userAccount);
    return created;
  } catch(err){
    return null;
  }
}