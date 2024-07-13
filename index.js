const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


mongoose.connect('mongodb://localhost:27017/mongoAppDB');

const express = require("express");
const app = express();
uuid = require("uuid");
morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

/*let users = [
  {
    "id": 1,
    "name": "John",
    "favoriteMovies": [],
  },
  {
    "id": 2,
    "name": "Jane",
    "favoriteMovies": [3],
  },
];

let movies = [
  {
    "id": 1,
    "Title": "A Trip to the Moon",
    "Synopsis":
      "A group of astronomers travel to the Moon in a cannon-propelled capsule, explore its surface, and encounter its inhabitants.",
    "Genre": {
      "Name": "Science fiction",
      "Description":
        "A genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.",
    },
    "Director": {
      "Name": "Georges Méliès",
      "Bio": "Georges Méliès was a pioneering French filmmaker who revolutionized early cinema with his innovative special effects and fantastical storytelling.",
      "Birth": 1861,
      "Death": 1938,
    },
    "imageURL": "https://en.wikipedia.org/wiki/A_Trip_to_the_Moon#/media/File:Le_Voyage_dans_la_lune.jpg",
    "featured": false,
  },
  {
    "id": 2,
    "Title": "The Kingdom of the Fairies",
    "Synopsis": "A spectacular fantasy film featuring elaborate sets, costumes, and special effects, following a prince's quest to rescue a princess from an evil witch.",
    "Genre": {
      "Name": "fantasy",
      "Description": "A genre that uses magic and other supernatural phenomena as a primary element of plot, theme, or setting.",
    },
    "Director": {
      "Name": "Georges Méliès",
      "Bio": "Georges Méliès was a pioneering French filmmaker who revolutionized early cinema with his innovative special effects and fantastical storytelling.",
      "Birth": 1861,
      "Death": 1938,
    },
    "imageURL": "https://en.wikipedia.org/wiki/The_Kingdom_of_the_Fairies#/media/File:Royaume_des_fees.jpg",
    "featured": false,
  },
  {
    "id": 3,
    "Title": "Intolerance",
    "Synopsis": "An epic film interweaving four storylines from different historical periods to explore the theme of intolerance throughout history.",
    "Genre": {
      "Name": "historical drama",
      "Description": "A genre that dramatizes historical events or figures, often on a grand scale.",
    },
    "Director": {
      "Name": "D.W. Griffith",
      "Bio": "D.W. Griffith was a visionary American director who significantly advanced film language and narrative complexity in early Hollywood.",
      "Birth": 1875,
      "Death": 1948,
    },
    "imageURL": "https://en.wikipedia.org/wiki/Intolerance_(film)#/media/File:Intolerance_(film).jpg",
    "featured": false,
  },
  {
    "id": 4,
    "Title": "The Cabinet of Dr. Caligari",
    "Synopsis": "A landmark of German Expressionist cinema, telling the twisted tale of an insane hypnotist who uses a sleepwalker to commit murders.",
    "Genre": {
      "Name": "horror",
      "Description": "A genre intended to frighten, scare, or disgust audiences through suspense, shock, and gore.",
    },
    "Director": {
      "Name": "Robert Wiene",
      "Bio": "Robert Wiene was an acclaimed German filmmaker who made substantial contributions to the German Expressionist movement in cinema.",
      "Birth": 1873,
      "Death": 1938,
    },
    "imageURL": "https://en.wikipedia.org/wiki/The_Cabinet_of_Dr._Caligari#/media/File:The_Cabinet_of_Dr._Caligari_poster.jpg",
    "featured": false,
  },
  {
    "id": 5,
    "Title": "The Phantom Carriage",
    "Synopsis": "A Swedish silent film about a drunkard who must drive Death\'s carriage and collect souls for a year, featuring groundbreaking special effects.",
    "Genre": {
      "Name": "drama/horror",
      "Description": "A blend of dramatic storytelling with elements of horror, often exploring psychological themes.",
    },
    "Director": {
      "Name": "Victor Sjöström",
      "Bio": "Victor Sjöström was an esteemed Swedish director, screenwriter, and actor who masterfully shaped the golden age of Swedish silent cinema.",
      "Birth": 1879,
      "Death": 1960,
    },
    "imageURL": "https://en.wikipedia.org/wiki/The_Phantom_Carriage#/media/File:The_Phantom_Carriage_(1921)_poster.jpg",
    "featured": false,
  },
  {
    "id": 6,
    "Title": "Nosferatu",
    "Synopsis": "An unauthorized adaptation of Bram Stoker\'s Dracula, this influential vampire film is renowned for its eerie atmosphere and iconic visuals.",
    "Genre": {
      "Name": "horror",
      "Description": "A genre intended to frighten, scare, or disgust audiences through suspense, shock, and gore.",
    },
    "Director": {
      "Name": "F.W. Murnau",
      "Bio": "F.W. Murnau was a groundbreaking German filmmaker celebrated for his expressionist works and technical innovations in silent cinema.",
      "Birth": 1888,
      "Death": 1931,
    },
    "imageURL": "https://en.wikipedia.org/wiki/Nosferatu#/media/File:Nosferatuposter.jpg",
    "featured": false,
  },
  {
    "id": 7,
    "Title": "One Week",
    "Synopsis": "A newly wedded couple attempts to build a house with a prefabricated kit, unaware that a rival has sabotaged the plans, leading to comedic mishaps.",
    "Genre": {
      "Name": "comedy",
      "Description": "A genre intended to amuse and provoke laughter through humorous situations, witty dialogue, or physical gags.",
    },
    "Director": {
      "Name": "Buster Keaton",
      "Bio": "Buster Keaton was a legendary American comedian and filmmaker renowned for his physical comedy and deadpan expression, earning him the nickname 'The Great Stone Face'.",
      "Birth": 1895,
      "Death": 1966,
    },
    "imageURL": "https://en.wikipedia.org/wiki/One_Week_(1920_film)#/media/File:Buster_Keaton_One_Week_Ad_-_Motion_Picture_News_(Oct_9,_1920).jpg",
    "featured": false,
  },
  {
    "id": 8,
    "Title": "Metropolis",
    "Synopsis": "A visually stunning dystopian film set in a futuristic city, exploring themes of class struggle and industrialization.",
    "Genre": {
      "Name": "science fiction",
      "Description": "A genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.",
    },
    "Director": {
      "Name": "Fritz Lang",
      "Bio": "Fritz Lang was a visionary Austrian-German-American filmmaker who made significant contributions to expressionist cinema and film noir.",
      "Birth": 1890,
      "Death": 1976,
    },
    "imageURL": "https://en.wikipedia.org/wiki/Metropolis_(1927_film)#/media/File:Metropolis_(German_three-sheet_poster).jpg",
    "featured": false,
  },
  {
    "id": 9,
    "Title": "The Passion of Joan of Arc",
    "Synopsis": "A powerful silent film depicting the trial of Joan of Arc, known for its innovative use of close-ups and emotional performances.",
    "Genre": {
      "Name": "historical drama",
      "Description": "A genre that dramatizes historical events or figures, often on a grand scale.",
    },
    "Director": {
      "Name": "Carl Theodor Dreyer",
      "Bio": "Carl Theodor Dreyer was a revered Danish director known for his austere style and emotionally intense films that pushed the boundaries of cinema.",
      "Birth": 1889,
      "Death": 1968,
    },
    "imageURL": "https://en.wikipedia.org/wiki/The_Passion_of_Joan_of_Arc#/media/File:The_Passion_of_Joan_of_Arc_(1928)_English_Poster.png",
    "featured": false,
  },
  {
    "id": 10,
    "Title": "The Man with a Movie Camera",
    "Synopsis": "An experimental silent documentary film with no story and no actors, showcasing urban life in Soviet cities through innovative camera techniques.",
    "Genre": {
      "Name": "documentary",
      "Description": "A non-fictional genre that documents reality, often for the purposes of instruction, education, or maintaining a historical record.",
    },
    "Director": {
      "Name": "Dziga Vertov",
      "Bio": "Dziga Vertov was a pioneering Soviet filmmaker and theorist who revolutionized documentary filmmaking with his Kino-Eye concept and experimental techniques.",
      "Birth": 1896,
      "Death": 1954,
    },
    "imageURL": "https://en.wikipedia.org/wiki/Man_with_a_Movie_Camera#/media/File:Man_with_a_movie_camera_1929_2.png",
    "featured": false,
  },
];
*/

// READ - Get all movies
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// READ - Get movie by title
app.get("/movies/:title", async (req, res) => {
  await Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).send("Movie not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ - Get genre by name
app.get("/movies/genre/:genreName", async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie.Genre);
      } else {
        res.status(404).send("Genre not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ - Get director by name
app.get("/movies/directors/:directorName", async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.directorName })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie.Director);
      } else {
        res.status(404).send("Director not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



// CREATE - New user
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// UPDATE User name
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) 
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});

// CREATE - Add a movie to favorite
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) 
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// DELETE - Remove a movie from favorites
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) 
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// DELETE User by username
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


app.get("/", (req, res) => {
  res.send("Welcome to my silent movie app!");
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
