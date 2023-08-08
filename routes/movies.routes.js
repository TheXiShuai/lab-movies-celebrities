const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');
const router = express.Router();


//GET CREATE 

router.get("/movies/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch (error) {
    console.error(error);
    res.send("Error fetching data");
  }
});


// POST CREATE

router.post("/movies/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const newMovie = await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies"); 
  } catch (error) {
    console.error(error);
    res.render("movies/new-movie", { errorMessage: "Error creating movie" });
  }
});


// GET FOR DISPLAY MOVIES

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('movies/movies', { movies });
  } catch (error) {
    console.error(error);
    res.send('Error fetching data');
  }
});

 router.get('movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cast');
    res.render('movies/movie-details', { movie });
  } catch (error) {
    console.error(error);
    res.send('Error fetching data');
  }
}); 


//DELETE MOVIES

router.post('movies/:id/delete', async (req, res) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect('/movies'); 
  } catch (error) {
    console.error(error);
    res.send('Error deleting movie');
  }
}); 


//edit movie


 router.get('movies/:id/edit', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cast');
    const celebrities = await Celebrity.find();
    res.render('movies/edit-movie', { movie, celebrities });
  } catch (error) {
    console.error(error);
    res.send('Error fetching data');
  }
}); 



//form submission 

router.post('movies/:id', async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, genre, plot, cast },
      { new: true }
    ).populate('cast');
    res.redirect(`/movies/${req.params.id}`); 
  } catch (error) {
    console.error(error);
    res.send('Error updating movie');
  }
}); 


module.exports = router;
