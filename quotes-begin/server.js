// import dependencies
const express = require('express');
// this middleware will print to console
const logger = require('morgan');

// initialize app
const app = express();

// set up logger middleware to be used in dev environment
app.use(logger('dev'));


// index route
app.get('/', (req, res) => {
  res.send('HELLO WORLD! We are Hamilton');
});

// set up port and listen (good practice to place it all the way at the bottow of the file)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
