const jwt = require('jsonwebtoken');
const bcrypt =require("bcrypt");

exports.generateToken=(userId, secretKey)=> {
  const payload = {
    userId: userId
  };

  const options = {
    expiresIn: '1h' 
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
}



exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

exports.comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};