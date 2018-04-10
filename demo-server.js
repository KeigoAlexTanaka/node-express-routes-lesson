// go get express from node_modules
const express = require('express');

// go get morgan from node_modules
const logger = require('morgan');

// activate express
const app = express();

// make a port
const PORT = process.env.PORT || 3000;

// for all reqs, log them in dev mode
app.use(logger('dev'));

// TODO: make a route that responds to this URL and spits out the
//parts in order
// http://localhost:3000/puppies/35?showAll=true&color=brown
// BONUS: respond in JSON format

// "you asked for {path}"
// and your search terms were: {terms}
// "and you're looking for puppy # {id}"

app.get('/puppies/:zarrina/', (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  console.log('path', req.path);
  res.send('blorp');
  // send to the client, a message with the puppy ID in it.
})

app.get('/', (req, res) => {
  res.send('This is a homepage');
});


app.listen(PORT, () => {
  console.log(`server up and running on ${PORT}`);
});
