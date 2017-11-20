const express = require('express');
const quoteRouter = express.Router();
const data = require('../db/quotes-data');

quoteRouter.get('/', (req, res) => {
  res.json({
    message: 'ok',
    data: data,
  });
});

quoteRouter.get('/:id', (req, res) => {
  const filteredQuotes = data.filter(quote => {
    return quote.id == req.params.id;
  });
  res.json({
    message: 'ok',
    data: filteredQuotes,
  });
});

module.exports = quoteRouter;
