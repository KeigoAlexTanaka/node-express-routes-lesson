// import dependencies
const express = require('express');
const bodyParser = require('body-parser');

// set up logger
const logger = require('morgan');

const quoteRouter = require('./routes/quotesRouter');

// set up port and listen (good practice to place it all the way at the bottow of the file)
const PORT = 3000;


// initialize app
const app = express();

// set up logger middleware to be used in dev environment
app.use(logger('dev'));
// parse application/json
app.use(bodyParser.json())


// index route
app.get('/', (req, res) => {
  res.send('HELLO WORLD! We are OPPORTUNITY');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
