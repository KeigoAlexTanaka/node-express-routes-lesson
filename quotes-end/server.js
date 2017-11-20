const express = require('express');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;
const quoteRoutes = require('./routes/quote-routes');

const app = express();
/* use logger in dev environment */
app.use(logger('dev'));

/* set up a home route*/
app.get('/', (req, res) => {
  res.send('Hello World');
});

/* middleware to use quotes routes to display the quote data */
app.use('/quotes', quoteRoutes);

/* error handler */
app.use('*', (req, res) => {
  res.status(404).json('Not Found!');
});

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});
