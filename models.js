/**
 * @module models
 * @description Contains Mongoose schemas for Movie and User data models.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Schema for movie data.
 * @typedef {Object} Movie
 * @property {string} Title - The title of the movie.
 * @property {string} Description - A brief description of the movie.
 * @property {Object} Genre - The genre of the movie.
 * @property {string} Genre.Name - The name of the genre.
 * @property {string} Genre.Description - Description of the genre.
 * @property {Object} Director - The director of the movie.
 * @property {string} Director.Name - The name of the director.
 * @property {string} Director.Bio - Biography of the director.
 * @property {string} Director.Birth - Birth date of the director.
 * @property {string} Director.Death - Death date of the director.
 * @property {Array<string>} Actors - List of actors in the movie.
 * @property {string} ImagePath - Path to the movie's image.
 * @property {boolean} Featured - Whether the movie is featured or not.
 */
const movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
      Name: String,
      Description: String
    },
    Director: {
      Name: String,
      Bio: String,
      Birth: String,
      Death: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

/**
 * Schema for user data.
 * @typedef {Object} User
 * @property {string} Username - The username of the user.
 * @property {string} Password - The hashed password of the user.
 * @property {string} Email - The email address of the user.
 * @property {Date} Birthday - The user's birthday.
 * @property {Array<ObjectId>} FavoriteMovies - List of favorite movies.
 */
const userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {string} - The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

/**
 * Validates a password against the hashed password.
 * @param {string} password - The plain text password to validate.
 * @returns {boolean} - True if the password matches, otherwise false.
 */
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

// Create models for Movie and User
const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

// Export the models
module.exports = { Movie, User };