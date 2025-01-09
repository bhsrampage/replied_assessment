const shorthash = require("shorthash");

/**
 const User = {
    userID:String,
    birthDate:Date,
    email:String,
    followers:[userID],
    following:[userID],
    blocked:[userID]
 }
 */

exports.createNewUser = (birthDate, email) => {
  let user = {
    userID: shorthash.unique(email),
    birthDate,
    email,
    followers: [],
    following: [],
    blocked: [],
  };

  return user;
};
