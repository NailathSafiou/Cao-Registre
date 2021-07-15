/**
 * Module dependencies.
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 /**
  * Schema definitions.
  */
 
 
module.exports = mongoose.model('OAuthClients', new Schema({
   clientId: { type: String },
   clientSecret: { type: String },
   redirectUris: { type: Array }
 }));