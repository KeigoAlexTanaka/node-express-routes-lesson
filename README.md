# Express Routes!!!

### Learning Objectives:

- Start building a REST-ful structure for our app
- Separate routes from server logic
- Access user-specified parameters
- Handle errors for routes that don't exist

# App setup!!!

Let's rebuild an app that looks just like the one we built in the morning.

By the end, we'll have an app that says "Hello World!" and runs on port 3000.

## Another look at our first route

In `server.js`:

```js
// index route
app.get('/', (request, response) => {
    response.send('Hello world!');
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

# More Routes!

Of course, we want to do more with our app than just saying "hello world". We can do this by adding more routes to our app.


Now, instead of saying "CANNOT `/GET`" on all the routes we haven't set up, it'll send back an error instead.

***Order matters here.*** If we put our error handler above our root route, we won't ever be able to get to it, since the `'*'` catches the request before it gets to the `'/'`.

## Add our first additional route

Since this is a quotes app, we need to have a route that displays quotes on a page.

```js
app.get('/quotes', (request, response) => {
  response.send('<html><body><h1>A page of Quotes!</h1></body></html>');
});
```

But let's say we wanted to send back JSON data, for example, instead of just plain text.
We would add `.json` onto the path to make clear the route responds with JSON,
and use `response.json()` to send back JSON.


```js
app.get('/quotes.json', (request, response) => {
  response.json({
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
const quotes = require('./db/quotes-data');
app.get('/quotes.json', (request, response) => {
  response.json({
    message: 'ok',
    data: quotes,
  });
});
```

## 🚀 LAB!

Catch up in `quotes-begin`.
- Within `quotes-begin`, run `npm install` to install the dependencies.
- In `server.js`, add a route for GETting `/quotes` that sends back the data in `./db/quotes-data.js`.
- Also, what file we included to ignore node_modules and not push it to gitHub? Don't forget to include it ;)

# Params

What if we only want information about _one_ quote, though? We can do that using parameters, or params.

A route with params looks like this: `/quotes/:id`. The `id` stands for the variable parameter, which we can access on the request object, like so: `req.params.id`.

So if I was to say something like:

```js
app.get('/:id', (request, response) => {
  response.send(`${req.params.id} is awesome!!!!!`);
});
```

I could go to any endpoint on localhost and get the text "[whatever thing I put in the address bar] is awesome!!!!" Once again, ***order matters*** -- my route with params has to be after my explicitly defined routes.

I can also use the params to programmatically get information from my database, like so:

```js
app.get('/quotes/:id.json', (request, response) => {
  const requestedQuote = quotes.filter((quote) => {
    return quote.id == req.params.id;
  });
  response.json({
    message: 'ok',
    data: requestedQuote[0],
  });
});
```

This returns the quote object from my quotes array where the id of the object matches the ID that's been passed in the params.

## 🚀 Lab!

Catch up in `quotes-begin`.
- In `server.js`, add a route for GETting `quotes/:id`, where `:id` is a number passed in from the server. The app should send back data about one quote with that particular ID.

## 🚀 LAB!

Catch up in `quotes-begin`.

- Create a routes folder.
- Within that routes folder, create a file `quote-routes.js`.
- Write the routes for the quotes.
- In `server.js`, require the new route file.
- Tell the app to use the `quotes` endpoint and pass all actions relating to that endpoint to our new route.

# Serving an index page (if time permits)

Instead of just sending back json data, or "Hello World", it would be kind of nice if our app sent back an actual index page. Here's how we can set that up:

We first add a new directory called `public` and create an `index.html`.

Then, we need to tell our `server.js` where to look for static files.

```js
// directly beneath where we set up the logger
app.use(express.static('public'));
```

Finally, we tell our root route to send the `index.html` file

```js
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

Now we can add JavaScript to that HTML file to make requests to our backend.

## 🚀 Lab!

Check out [HERE](./lab/README.md) and follow the instructions you find there!

# Recap!

- Express is a web application framework for Node.
- It allows us to build RESTful APIs and web apps in JavaScript all the way down.
- We control what data is sent back at which endpoint using routes.
- Following the MVC pattern allows us to create our apps in a modular way.
