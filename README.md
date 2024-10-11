# MyFlix API

## Description
MyFlix API is a RESTful web service for managing a silent movie database. It offers endpoints for user operations and movie information retrieval, providing authentication, user profile management, favorite movie lists, and detailed information about movies, genres, and directors.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- Passport for authentication middleware

## Features
- User authentication and authorization
- CRUD operations for user profiles
- Movie information retrieval
- Genre and director information
- Favorite movie list management

## API Endpoints
- GET /movies: Retrieve all movies
- GET /movies/:title: Get a specific movie by title
- GET /movies/genre/:genreName: Get genre information
- GET /movies/directors/:directorName: Get director information
- GET /users/:Username: Get user information
- POST /users: Register a new user
- PUT /users/:Username: Update user information
- POST /users/:Username/movies/:MovieID: Add a movie to favorites
- DELETE /users/:Username/movies/:MovieID: Remove a movie from favorites
- DELETE /users/:Username: Delete a user account

### Prerequisites

- Node.js
- MongoDB Atlas account or a local MongoDB instance
- Render account for hosting (optional)

### Installation

## How to Clone
To clone the repository, run: `git clone https://github.com/alexuflexu/movie_api.git`

## Install dependencies:

   ```sh
   npm install
   ```

## Create a `.env` file in the root directory and add your MongoDB connection string:

   ```sh
   CONNECTION_URI=mongodb+srv://<username>:<password>@cluster0.qlykdkm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

## Running the API

Start the server with the following command:

```sh
node index.js
```

By default, the server will run on `http://localhost:8080`.

## Authentication
This API uses JWT for authentication. Include the JWT token in the Authorization header for protected routes.

## Deployment
This API is hosted on Render.
