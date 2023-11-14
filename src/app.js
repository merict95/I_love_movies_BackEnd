if (process.env.DATABASE_URL) require("dotenv").config();

const express = require("express");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

const cors = require("cors");

// CORS options to only allow your front-end domain
const corsOptions = {
  origin: 'https://we-love-movies-front-end-q9no.onrender.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Root route
const router = express.Router();
router.get('/', (req, res) => {
  res.json({ message: 'Welcome! You can access the data using these routes: /movies, /reviews, /theaters, /reviews/:reviewId, /movies/:movieId, /movies/:movieId/theaters, and /movies/:movieId/reviews.' });
});

app.use('/', router);

// Other routers
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Not found error handler
app.use((req, res, next) => {
  next({ status: 404, message: "That page doesn't exist." });
});

// General error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong on our end!" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;
