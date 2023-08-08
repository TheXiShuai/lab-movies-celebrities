const router = require("express").Router();

// all your routes here


//GET

router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});

const Celebrity = require('../models/Celebrity.model');

//POST

router.post('/celebrities/create', async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('/celebrities'); 
  } catch (error) {
    res.render('celebrities/new-celebrity', { error: 'Error creating celebrity' });
  console.log("no celebrities created");
  }
});



//GET Create the celebrities GET route in routes/celebrities.routes.js.

router.get('/celebrities', async (req, res) => {
  console.log("CELEBRITIES ROUTE");
  try {
    const celebrities = await Celebrity.find();
    res.render('celebrities/celebrities', { celebrities });
  } catch (error) {
    console.error(error);
    res.send('Error fetching celebrities');
  }
});



module.exports = router;