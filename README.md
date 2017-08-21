# Express Routes!!!

### Learning Objectives:

- Start building a REST-ful structure for our app
- 

# App setup!!!

Let's rebuild an app that looks just like what Kate did in her lecture.

## Another look at our first route

In `server.js`:

```js
// index route
app.get('/', (req, res) => {
    res.send('Hello world!');
});
```

This is another method on the app object. It describes a `GET` request to the root route of the app.

- It takes a string and a callback
- The callback takes two arguments, `req` and `res`.
    - `req` stands for the request object received from the browser
    - `res` stands for the response object that will be sent back to the browser.
- Within the callback, we access a method on the response object in order to send 'Hello world!'.

Now, when we run `npm run dev` and visit `localhost:3000`, we see 'Hello world!' rendered in the browser.

#### [FROM THE EXPRESS DOCS](https://expressjs.com/en/starter/basic-routing.html):

Route definitions always take the same basic structure:

```js
app.METHOD(PATH, HANDLER);
```

Where:
- `app` is an instance of express
- `METHOD` is an HTTP request method, in lowercase
- `PATH` is is a path on the server
- `HANDLER` is the function executed when the path matches.

# More Routes and Adding Params

Of course, we want to do more with our app than just saying "hello world". We can do this by adding more routes to our app.

### Add an error handler

```js
// get anything that hasn't already been matched
app.use('*', (req, res) => {
    // send a response with status 404
    res.status(404).send(err);
});
```

Now, instead of saying "CANNOT `/GET`" on all the routes we haven't set up, it'll send back an error instead.

***Order matters here.*** If we put our error handler above our root route, we won't ever be able to get to it, since the `'*'` catches the request before it gets to the `'/'`. 

### Add our first additional route

Since this is a quotes app, we need to have a route that gives information about quotes!

```js
app.get('/quotes', (req, res) => {
  res.send('Info about quotes!');
});
```

But let's say we wanted to send back JSON data, for example, instead of just plain text. We can change `res.send` to `res.json`:


```js
app.get('/quotes', (req, res) => {
  res.json({
    message: 'ok',
    quotes: [
      {
        id: 1,
        content: 'Sometimes you win, sometimes you learn!',
        author: 'unknown',
        genre_type: 'motivational',
      },
      {
        id: 2,
        content: 'Do or do not, there is no try.',
        author: 'Yoda',
        genre_type: 'motivational',
      },
      {
        id: 3,
        content: 'A simple \'Hello\' could lead to a million things.',
        author: 'unknown',
        genre_type: 'motivational',
      },
    ]
  });
});
```

We can also put our data into a separate file and import it, using `module.exports`:

```js
const quotes = require('./db/quotes-info');
app.get('/quotes', (req, res) => {
  res.json({
    message: 'ok',
    data: quotes,
  });
});
```

### Params

What if we only want information about _one_ quote, though? We can do that using parameters, or params.

A route with params looks like this: `/quotes/:id`. The `id` stands for the variable parameter, which we can access on the request object, like so: `req.params.id`.

So if I was to say something like:

```js
app.get('/:id', (req, res) => {
  res.send(`${req.params.id} is awesome!!!!!`);
});
```

I could go to any endpoint on localhost and get the text "[whatever thing I put in the address bar] is awesome!!!!" Once again, ***order matters*** -- my route with params has to be after my explicitly defined routes.

I can also use the params to programmatically get information from my database, like so:

```js
app.get('/quotes/:id', (req, res) => {
  const requestedQuote = quotes.filter((quote) => {
    return quote.id == req.params.id;
  });
  res.json({
    message: 'ok',
    data: requestedQuote[0],
  });
});
```

This returns the quote object from my quotes array where the id of the object matches the ID that's been passed in the params.

## 🚀 Lab!

Catch up in the app you've been working in. Once again, no copy-pasting!

# Separating Concerns

Now, leaving all our routes in our `server.js` may _seem_ like a good idea, but once our app starts to scale, we need to start _separating our concerns_. The MVC pattern itself places a lot of emphasis on modularity, as does node as a whole. 

One way we can improve the modularity of our apps is by taking the routes out of `server.js` and putting them in their own routes directory. 

- `mkdir routes` & cd into it
- `touch quote-routes.js`

### Initializing Express Router

In `routes/quote-routes.js`:

```js
const express = require('express');
const quoteRoutes = express.Router();
```

What this does is it initializes a new instance of express's router. Instead of having to say `app.get(whatever)` for all our different endpoints, we can create multiple instances of express router and use them for individual endpoints.

So, we know we're using `/quotes` as an endpoint. Our `quoteRoutes` will control all the endpoints for `/quotes`. So, in `quote-routes`, we can say:

```js
// still have to import the quote data
const quoteInfo = require('../db/quotes-info');

// the root route, `/quotes`
quoteRoutes.get('/', (req, res) => {
  res.json({
    message: 'ok',
    data: quotes,
  });
});

// need to export the files
module.exports = quoteRoutes;
```

We can move over the `/quotes/:id` route as well.

### Telling our app to use the new route

Now, in `server.js`, we can import the new route, like so:

```js
// below the index route
const quoteRoutes = require('./routes/quote-routes');
app.use('/quotes', quoteRoutes);
```

We can create and import as many routes as we want. 

### Final step: serving an index page

Instead of just sending back json data, or "Hello World", it would be kind of nice if our app sent back an actual index page. Here's how we can set that up:

We first add a new directory called `public` and create an `index.html`. 

Then, we need to tell our `server.js` where to look for static files.

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