const shorthash = require("shorthash");

/**
 const User = {
    userID:String,
    birthDate:Date,
    email:String
 }
 */

exports.createNewUser = (birthDate, email) => {
  let user = {
    userID: shorthash(email),
    birthDate,
    email,
  };

  return user;
};
