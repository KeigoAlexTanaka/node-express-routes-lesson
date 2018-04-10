const express = require('express');
const quoteRouter = express.Router();
const quotes = require('../db/quotes-data');


const showAll = (req, res) => {
  res.json({ quotes: quotes });
};

const createOne = (req, res) => {
  // grab the data from the req.body
  const newObject = req.body;
  // generate a new id
  newObject.id = String(Date.now());

  // push the new object into the collection
  quotes.push(newObject);

  // tell the client the new ID number
  res.json({id: newObject.id});
};

const getOne = (req, res) => {
  // find some item in my collection
  const chosen = quotes.find(item => item.id === req.params.id);
  // if i didn't find it, die here, and return a 404
  if(!chosen) {
    return res.sendStatus(404);
  }
  res.json({ data: chosen });
  // show just the one that the user asks for
};

const updateOne = (req, res) => {
  const idx = quotes.findIndex(item => item.id === req.params.id);

  //replace all my data
  quotes[idx].content = req.body.content;
  quotes[idx].author = req.body.author;
  quotes[idx].genre_type = req.body.genre_type;

  res.json({data: quotes[idx]});
};

const deleteOne = (req, res) => {
  // delete the item at this ID

  const idx = quotes.findIndex(item => item.id === req.params.id);
  quotes.splice(idx, 1);

  res.sendStatus(202);
}

/* **********************ROUTES *********/
quoteRouter.route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);


quoteRouter.route('/')
  .get(showAll)
  .post(createOne);








module.exports = quoteRouter;
