/**
 * @module 
 * @description Contains Mongoose schemas for Movie and User data models.
 */

const mongoose = require('mongoose'); // Importing mongoose for database interaction
const Models = require('./models.js'); // Importing models for Movie and User schemas
const express = require("express"); // Importing Express framework
const cors = require('cors'); // Importing CORS for enabling cross-origin requests
const morgan = require("morgan"); // Importing morgan for logging HTTP requests
const { check, validationResult } = require('express-validator'); // Importing validation tools
const passport = require('passport'); // Importing passport for authentication
let auth = require('./auth')(app); // Setting up authentication middleware
require('./passport'); // Importing passport strategies

const app = express(); // Creating an Express application instance
const Movies = Models.Movie; // Reference to Movie model
const Users = Models.User; // Reference to User model

console.log('Attempting to connect to MongoDB...'); // Log message for connection attempt
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB'); // Success log message
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error); // Error log message
  });

// Middleware setup
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cors()); // Enabling CORS for all routes
app.use(morgan("common")); // Logging HTTP requests in common format

/**
 * Fetch all movies in the database using GET method
 * @function 
 * @name getAllMovies 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - returns a promise which is resolved with an array containing all movie objects  
 */
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Fetch movie by title using GET method
 * @function
 * @name getOneMovie
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {string} req.params.Title - The movie title
 * @returns {object} - returns a promise containing the object of the requested movie title
 */
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send('Sorry, we couldn\'t find that title.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Fetch info about a specific genre using GET method
 * @function
 * @name getOneGenre
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - returns a promise containing an object of the selected genre
 */
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie.Genre);
      } else {
        res.status(404).send('Sorry, we couldn\'t find that genre.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Fetch info about a specific director using GET method
 * @function
 * @name getOneDirector
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - returns a promise containing an object of the selected director
 */
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.directorName })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie.Director);
      } else {
        res.status(404).send('Sorry, we couldn\'t find that director.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Create a new user with POST method
 * @function
 * @name createUser
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - returns a promise containing the user object 
 */
app.post('/users', [
  check('Username', 'Username must be at least 5 characters long').isLength({ min: 5 }),
  check('Username', 'Username contains non-alphanumeric characters - not allowed').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => { res.status(201).json(user); })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

/**
 * Fetch data on all users using the GET method
 * @function
 * @name getAllUsers
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - returns a promise containing all user objects 
 */
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Fetch data on a specific user using the GET method
 * @function
 * @name getOneUser
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - returns a promise containing an object of the single user 
 */
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Update user info using the PUT method
 * @function
 * @name editUserProfile
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - returns a promise containing an object of the single user 
 */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), [
  check('Username', 'Username must be at least 5 characters long').isLength({ min: 5 }),
  check('Username', 'Username contains non-alphanumeric characters - not allowed').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied');
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }
  )
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

/**
 * Remove user from database using DELETE method
 * @function
 * @name deleteUserProfile
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - returns a promise confirming the deletion 
 */
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send(req.params.Username + ' was deleted.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Server setup
const port = process.env.PORT || 8080; // Default port is 8080 if not specified in environment variable
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log message indicating server is running
});
