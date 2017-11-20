// import dependencies
const express = require('express');
// set up logger

// set up port and listen (good practice to place it all the way at the bottow of the file)
const PORT = 3000;


// initialize app
const app = express();

// set up logger middleware to be used in dev environment



// index route
app.get('/', (req, res) => {
  res.send('HELLO WORLD! We are Hamilton');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
