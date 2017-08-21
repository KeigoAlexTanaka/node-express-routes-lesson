// import dependencies
const express = require('express');
const logger = require('morgan');

// initialize app
const app = express();

// set up port and listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// set up logger middleware
app.use(logger('dev'));


// index route
app.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});
