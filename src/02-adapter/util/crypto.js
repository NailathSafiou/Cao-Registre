const crypto = require("crypto");

module.exports = {
  
  encrypt(value){
    const sha = crypto.createHash("sha256").update(value).digest("hex");
    return sha;
  }
  
}