/**
 * @module models
 * @descriptio This module configures Passport strategies for local authentication and JWT authentication.
 */

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Configures the local authentication strategy for Passport.
 *
 * @function
 * @param {string} username - The username provided by the user.
 * @param {string} password - The password provided by the user.
 * @param {function} callback - The callback to be invoked with the authentication result.
 * @returns {void}
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log('incorrect username');
            return callback(null, false, {
              message: 'Incorrect username or password.',
            });
          }
          if (!user.validatePassword(password)) {
            console.log('incorrect password');
            return callback(null, false, { message: 'Incorrect password.' });
          }
          console.log('finished');
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
        });
    }
  )
);

/**
 * Configures the JWT authentication strategy for Passport.
 *
 * @function
 * @param {object} jwtPayload - The payload decoded from the JWT.
 * @param {function} callback - The callback to be invoked with the authentication result.
 * @returns {void}
 */
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',
}, async (jwtPayload, callback) => {
  return await Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error);
    });
}));

module.exports = passport;
