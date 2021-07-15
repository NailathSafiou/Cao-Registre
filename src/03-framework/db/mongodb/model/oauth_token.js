const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
 /**
  * Schema definitions.
  */
 
module.exports = mongoose.model('OAuthTokens', new Schema({
   accessToken: { type: String },
   expires: { type: Date },
   client : { type: Object },  // `client` and `user` are required in multiple places, for example `getAccessToken()`
   clientId: { type: String },
   refreshToken: { type: String },
   refreshTokenExpiresOn: { type: Date },
   user : { type: Object },
   userId: { type: String },
 }));
 