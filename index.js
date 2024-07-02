const express = require('express');
morgan = require('morgan');

const app = express();

let topMovies = [
  {
    title: 'A Trip to the Moon',
    director: 'Georges Méliès',
  },
  {
    title: 'The Great Train Robbery',
    director: 'Edwin S. Porter',
  },
  {
    title: 'Intolerance',
    director: 'D.W. Griffith',
  },
  {
    title: 'The Cabinet of Dr. Caligari',
    director: 'Robert Wiene',
  },
  {
    title: 'The Phantom Carriage',
    director: 'Victor Sjöström',
  },
  {
    title: 'Nosferatu',
    director: 'F.W. Murnau',
  },
  {
    title: 'The General',
    director: 'Buster Keaton, Clyde Bruckman',
  },
  {
    title: 'Metropolis',
    director: 'Fritz Lang',
  },
  {
    title: 'The Passion of Joan of Arc',
    director: 'Carl Theodor Dreyer',
  },
  {
    title: 'The Man with a Movie Camera',
    director: 'Dziga Vertov',
  },
];

app.use(morgan('common'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/', (req, res) => {
  res.send('Welcome to my silent movie app!');
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
