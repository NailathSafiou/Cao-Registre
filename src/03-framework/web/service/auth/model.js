const mongoose = require("mongoose");

const OAuthTokensModel = require("../../../db/mongodb/model/oauth_token");
const OAuthClientsModel = require("../../../db/mongodb/model/oauth_client");
const OAuthUsersModel = require("../../../db/mongodb/model/user_account");

const crypto = require("../../../../02-adapter/util/crypto");

/**
 * Get access token.
 */

module.exports.getAccessToken = async function (bearerToken, cb) {
  // Adding `.lean()`, as we get a mongoose wrapper object back from `findOne(...)`, and oauth2-server complains.
  try {
    const accessToken = await OAuthTokensModel.findOne({ accessToken: bearerToken });
    cb(null, accessToken);
  } catch (err) {
    cb(err, null)
  }
};

/**
 * Get client.
 */

module.exports.getClient = async function (clientId, clientSecret, cb) {
  const client = {
    clientId,
    clientSecret,
    grants: null,
    redirectUris: null,
  };

  cb(false, client);
};

/**
 *  Grant type allowed 
 */
module.exports.grantTypeAllowed = function (clientId, grantType, cb) {
  cb(null, true);
}

/**
 * Get refresh token.
 */

module.exports.getRefreshToken = async function (refreshToken, cb) {
  try {
    const token = await OAuthTokensModel.findOne({ refreshToken: refreshToken });
    cb(null, token);
  } catch (err) {
    cb(err, null);
  }
};

/**
 * Get user.
 */

module.exports.getUser = async function (username, password, cb) {
  try {
    const shaPass = crypto.encrypt(password);
    const user = await OAuthUsersModel.findOne({ username: username, password: shaPass });
    cb(null, user);
  } catch (err) {
    cb(err, null);
  }
};

/**
 * Save token.
 */

module.exports.saveAccessToken = async function (token, clientId, expires, user, cb) {
  try {
    const accessToken2 = new OAuthTokensModel({
      accessToken: token,
      expires: expires,
      clientId: clientId,
      refreshToken: token,
      refreshTokenExpiresOn: expires,
      user: user,
      userId: user._id,
    });
    const token2 = await accessToken2.save();
    cb(null, token2);
  } catch (err) {
    cb(err, null);
  }
};