const express = require('express');
const logger = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const quoteRoutes = require('./routes/quote-routes');
app.use('/quotes', quoteRoutes);

app.use('*', (req, res) => {
  res.status(404).json('Not Found!');
});
