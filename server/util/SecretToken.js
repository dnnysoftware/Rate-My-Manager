require("dotenv").config();
const jwt = require("jsonwebtoken");


/**
 * Creates the secret toke
 * @param {*} id the user id
 * @returns signed jwt token with the user id
 */
module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};