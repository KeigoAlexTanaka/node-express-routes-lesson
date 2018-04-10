// import dependencies
const express = require('express');
const bodyParser = require('body-parser');

// set up logger
const logger = require('morgan');

const quotes = require('./db/quotes-data');


// set up port and listen (good practice to place it all the way at the bottow of the file)
const PORT = 3000;


// initialize app
const app = express();

// set up logger middleware to be used in dev environment
app.use(logger('dev'));
// parse application/json
app.use(bodyParser.json())

/* GET ALL */
app.get('/quotes', (req, res) => {
  res.json({ quotes: quotes });
});

/* CREATE ONE */
app.post('/quotes', (req, res) => {

  // grab the data from the req.body
  const newObject = req.body;
  // generate a new id
  newObject.id = String(Date.now());

  // push the new object into the collection
  quotes.push(newObject);

  // tell the client the new ID number
  res.json({id: newObject.id});
});

/* GET ONE */
app.get('/quotes/:id', (req, res) => {
  // find some item in my collection
  const chosen = quotes.find(item => item.id === req.params.id);
  // if i didn't find it, die here, and return a 404
  if(!chosen) {
    return res.sendStatus(404);
  }
  res.json({ data: chosen });
  // show just the one that the user asks for
});

/* UPDATE ONE */
app.put('/quotes/:id', (req, res) => {
  const idx = quotes.findIndex(item => item.id === req.params.id);

  //replace all my data
  quotes[idx].content = req.body.content;
  quotes[idx].author = req.body.author;
  quotes[idx].genre_type = req.body.genre_type;

  res.json({data: quotes[idx]});
});

// /* DELETE ONE */
app.delete('/quotes/:id', (req, res) => {
  // delete the item at this ID

  const idx = quotes.findIndex(item => item.id === req.params.id);
  quotes.splice(idx, 1);

  res.sendStatus(202);
});

// index route
app.get('/', (req, res) => {
  res.send('HELLO WORLD! We are OPPORTUNITY');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
