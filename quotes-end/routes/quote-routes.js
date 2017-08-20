const express = require('express');
const quoteRouter = express.Router();
const data = require('../db/quotes');

quoteRouter.get('/', (req, res) => {
  res.json({
    data: data,
  });
});

quoteRouter.get('/:id', (req, res) => {
  const filteredQuotes = data.filter(quote => {
    return quote.id == req.params.id;
  });
  res.json({
    data: filteredQuotes,
  });
});

module.exports = quoteRouter;

