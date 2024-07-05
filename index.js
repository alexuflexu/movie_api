const express = require("express");
(app = express()),
  (bodyParser = require("body-parser")),
  (uuid = require("uuid"));
morgan = require("morgan");

app.use(bodyParser.json());

app.use(morgan("common"));

let users = [
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
    "imageURL": "img",
    "featured": false,
  },
  {
    "id": 2,
    "Title": "The Great Train Robbery",
    "Synopsis": "A groundbreaking narrative film depicting a train heist and its aftermath, featuring innovative editing techniques.",
    "Genre": {
      "Name": "western",
      "Description": "A genre of fiction set in the American Old West frontier, typically in the late 19th century.",
    },
    "Director": {
      "Name": "Edwin S. Porter",
      "Bio": "Edwin S. Porter was an influential American filmmaker who played a crucial role in developing early narrative cinema and editing techniques.",
      "Birth": 1870,
      "Death": 1941,
    },
    "imageURL": "img",
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
    "imageURL": "img",
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
    "imageURL": "img",
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
    "imageURL": "img",
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
    "imageURL": "img",
    "featured": false,
  },
  {
    "id": 7,
    "Title": "The General",
    "Synopsis": "A silent comedy set during the American Civil War, following a Confederate train engineer\'s attempts to recover his stolen locomotive.",
    "Genre": {
      "Name": "comedy",
      "Description": "A genre intended to amuse and provoke laughter through humorous situations, witty dialogue, or physical gags.",
    },
    "Director": {
      "Name": "Buster Keaton, Clyde Bruckman",
      "Bio": "Buster Keaton was a legendary American comedian and filmmaker renowned for his physical comedy. Clyde Bruckman was a talented American director and screenwriter who collaborated with great comedians of the silent era.",
      "Birth": 1895,
      "Death": 1966,
    },
    "imageURL": "img",
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
    "imageURL": "img",
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
    "imageURL": "img",
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
    "imageURL": "img",
    "featured": false,
  },
];


// READ - Get all movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// READ - Get movie by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send("Movie not found");
  }
});

// READ - Get genre by name
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send("Genre not found");
  }
});

// READ - Get director by name
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find((movie) => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send("Director not found");
  }
});



// CREATE - New user
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send("Users need names")
  }
})

// UPDATE User name
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id === parseInt(id));

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user)
  } else {
    res.status(400).send("User not found")
  }

})

// CREATE - Add a movie to favorite
app.post("/users/:id/movies/:movieId", (req, res) => {
  const { id, movieId } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  const movie = movies.find((movie) => movie.id === parseInt(movieId));
  
  if (user && movie) {
  if (!user.favoriteMovies.includes(parseInt(movieId))) {
    user.favoriteMovies.push(parseInt(movieId));
  res.status(200).json(user);
  } else {
  res.status(400).send("Movie already in favorites");
  }
  } else {
  res.status(404).send("User or Movie not found");
  }
  });

// DELETE - Remove a movie from favorites
app.delete("/users/:id/movies/:movieId", (req, res) => {
  const { id, movieId } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  
  if (user) {
  const initialLength = user.favoriteMovies.length;
  user.favoriteMovies = user.favoriteMovies.filter((favMovieId) => favMovieId !== parseInt(movieId));
  
  if (user.favoriteMovies.length < initialLength) {
  res.status(200).json(user);
  } else {
  res.status(404).send("Movie not found in favorites");
  }
  } else {
  res.status(404).send("User not found");
  }
  });

// DELETE User
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  
  const initialLength = users.length;
  users = users.filter(user => user.id !== parseInt(id));
  
  if (users.length < initialLength) {
    res.status(200).send(`User with ID ${id} was deleted.`);
  } else {
  res.status(404).send("User not found.");
  }
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
