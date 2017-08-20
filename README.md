# Express Routes!!!

### Learning Objectives:

- Start building a REST-ful structure for our app
- 

# More Routes and Adding Params

Of course, we want to do more with our app than just saying "hello world". We can do this by adding more routes to our app.

### Add an error handler

```js
// get anything that hasn't already been matched
app.get('*', (req, res) => {
    // create a new error
    const err = new Error('not found!');
    // and send a response
    res.status(404).send(err);
});
```

Now, instead of saying "CANNOT `/GET`" on all the routes we haven't set up, it'll send back an error instead.

***Order matters here.*** If we put our error handler above our root route, we won't ever be able to get to it, since the `'*'` catches the request before it gets to the `'/'`. 

### Add our first additional route

Since this is a movies app, we need to have a route that gives information about movies!

```js
app.get('/movies', (req, res) => {
  res.send('Info about movies!');
});
```

But let's say we wanted to send back JSON data, for example, instead of just plain text. We can change `res.send` to `res.json`:


```js
app.get('/movies', (req, res) => {
  res.json({
      message: 'ok',
      movies: [
          {
              id: 1,
              title: 'Back to the Future',
              year: 1985,
          },
          {
              id: 2,
              title: 'Back to the Future Part II',
              year: 1989,
          },
          {
              id: 3,
              title: 'Back to the Future Part III',
              year: 1990,
          },
      ]
  });
});
```

We can also put our data into a separate file and import it, using `module.exports`:

```js
const movies = require('./db/movies-info');
app.get('/movies', (req, res) => {
  res.json({
    message: 'ok',
    data: movies,
  });
});
```

### Params

What if we only want information about _one_ movie, though? We can do that using parameters, or params.

A route with params looks like this: `/movies/:id`. The `id` stands for the variable parameter, which we can access on the request object, like so: `req.params.id`.

So if I was to say something like:

```js
app.get('/:id', (req, res) => {
  res.send(`${req.params.id} is awesome!!!!!`);
});
```

I could go to any endpoint on localhost and get the text "[whatever thing I put in the address bar] is awesome!!!!" Once again, ***order matters*** -- my route with params has to be after my explicitly defined routes.

I can also use the params to programmatically get information from my database, like so:

```js
app.get('/movies/:id', (req, res) => {
  const requestedMovie = movies.filter((movie) => {
    return movie.id == req.params.id;
  });
  res.json({
    message: 'ok',
    data: requestedMovie[0],
  });
});
```

This returns the movie object from my movies array where the id of the object matches the ID that's been passed in the params.

## 🚀 Lab!

Catch up in the app you've been working in. Once again, no copy-pasting!

# Separating Concerns

Now, leaving all our routes in our `app.js` may _seem_ like a good idea, but once our app starts to scale, we need to start _separating our concerns_. The MVC pattern itself places a lot of emphasis on modularity, as does node as a whole. 

One way we can improve the modularity of our apps is by taking the routes out of `app.js` and putting them in their own routes directory. 

- `mkdir routes` & cd into it
- `touch movie-routes.js`

### Initializing Express Router

In `routes/movie-routes.js`:

```js
const express = require('express');
const movieRoutes = express.Router();
```

What this does is it initializes a new instance of express's router. Instead of having to say `app.get(whatever)` for all our different endpoints, we can create multiple instances of express router and use them for individual endpoints.

So, we know we're using `/movies` as an endpoint. Our `movieRoutes` will control all the endpoints for `/movies`. So, in `movie-routes`, we can say:

```js
// still have to import the movie data
const movieInfo = require('../db/movies-info');

// the root route, `/movies`
movieRoutes.get('/', (req, res) => {
  res.json({
    message: 'ok',
    data: movies,
  });
});

// need to export the files
module.exports = movieRoutes;
```

We can move over the `/movies/:id` route as well.

### Telling our app to use the new route

Now, in `app.js`, we can import the new route, like so:

```js
// below the index route
const movieRoutes = require('./routes/movie-routes');
app.use('/movies', movieRoutes);
```

We can create and import as many routes as we want. 

### Final step: serving an index page

Instead of just sending back json data, or "Hello World", it would be kind of nice if our app sent back an actual index page. Here's how we can set that up:

We first add a new directory called `public` and create an `index.html`. 

Then, we need to tell our `app.js` where to look for static files.

```js
// directly beneath where we set up the logger
app.use(express.static('public'));
```

Finally, we tell our root route to send the `index.html` file 

```js
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

Now we can add JavaScript to that HTML file to make requests to our backend.

## 🚀 Lab!

Check out [this repo](https://git.generalassemb.ly/wdi-nyc-delorean/LAB_U02_D05_Candy-Routes) and follow the instructions you find there!

# Recap!

- Express is a web application framework for Node.
- It allows us to build RESTful APIs and web apps in JavaScript all the way down.
- We control what data is sent back at which endpoint using routes.
- Following the MVC pattern allows us to create our apps in a modular way.