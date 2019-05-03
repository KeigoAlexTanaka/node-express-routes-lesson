<!--
Location: NYC
-->

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Express Routes & Parameters

### Learning Objectives:

- Start building a REST-ful structure for our app
- Separate routes from server logic
- Access user-specified parameters
- Handle errors for routes that don't exist


### Review: Creating an App

#### 1. Directory and File Setup

Let's start a simple **Express** application.

1. Make a project directory and `server.js`:

	```bash
	mkdir express_routes
	cd express_routes
	touch server.js
	```

2. Use `npm init` to create a `package.json`:

	```bash
	npm init --yes
	```
  
3. Install Express and open the project directory in your text editor:

	```bash
	npm install express
	subl .
	```

The folder structure will look like the following:

```
	express_routes
	├── node_modules/
	    └── express/
	├── server.js  
	├── package.json
	...
```

##### Check for Understanding

<details>

<summary>Summarize the effects of the two npm commands above.</summary>
  

* Node Package Manager keeps track of the various libraries and third-party packages of code used in a Node project.  

* The `npm init` command helps you set up `package.json`, which stores important information about the project.  

* `npm install  express` tells the Node Package Manager to download and install the Express library for this particular project.  The `install` command lets NPM know that we will be downloading and using `express` for this project and to save it into the project's `package.json`.  

The above two `npm` commands will be necessary for every new web application that uses Express.  Other packages can also be installed as above.

</details>

#### 2. Server Setup

1. Write some boilerplate code for a simple server.  Remember to require express, call the `express` function to create a server, and tell the server to  start listening. **Note:** `process.env.PORT || 3000` means "in production use the production port, otherwise use 3000 (for development)". 

	`server.js`
	  
	```js
	// Requirements
	const express = require('express');
	const app = express();
	
	const PORT = process.env.PORT || 3000
	
	// Middleware
	app.use(express.static('public'));
	
	// Routes
	// ... coming soon
	
	// Server Start
	app.listen(PORT, () => {
	  console.log(`Listening on port ${PORT}`);
	})
	
	```

2. Start the server:

	```bash
	$ nodemon server.js
	```

3. At this point your browser should return `Cannot GET /`

##### Check for Understanding

<details>

<summary>Visit `localhost:3000` in your browser. Why don't we see anything yet? How can we show something here?</summary>

There aren't any routes yet. Add the following to the routes section of your `server.js` file and refresh the browser window:

```js
app.get("/", (req, res) => {
  // send back the response: 'Hello World'
  res.send('Hello World');
});
```
Your browser should return `Hello World`.

</details>

#### 3. Starter Routes

##### Routes Review

Building an application requires a firm grasp of something called  **routing**.  Each **route** is a combination of a **Request Type** and **Path**.  Code for the server lets us dictate how it will respond to requests on each route.


## Step back and take another look at our first route

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

Now, when we run `npm start` and visit `localhost:3000`, we see 'Hello world!' rendered in the browser.

#### [Express Documentation](https://expressjs.com/en/starter/basic-routing.html):

Route definitions always take the same basic structure:

```js
app.METHOD(PATH, HANDLER);
```

Where:
- `app` is an instance of express
- `METHOD` is an HTTP request method, in lowercase
- `PATH` is is a path on the server
- `HANDLER` is the function executed when the path matches.

#### More Hard-Coded Routes

Let's build two more routes into our application:

| Request Type | Request Path | Response
| :--- | :--- | :--- |
| `GET` | `/` | `Hello World` |
| `GET` | `/api/burgers` | `Hamburger`, `Cheese Burger`, `Vegetable Burger` |
| `GET` | `/api/tacos` | `Soft Taco`, `Crunchy Taco`, `Super Taco` |

<details>
<summary> click to see contents of `server.js`</summary>

```js
// REQUIREMENTS
const express = require('express');
const app = express();

//DATA (temporary until we know how to use databases)
const burgers = [
  'Hamburger',
  'Cheese Burger',
  'Vegetable Burger'
];

var tacos = [
  'Soft Taco',
  'Crunchy Taco',
  'Super Taco'
];

// ROUTES
app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/api/burgers",  (request, response) => {
  //send all the burgers     
  response.json(burgers);
});

app.get("/api/tacos",  (request, response) => {
  //send all the tacos       
  response.json(tacos);
});

// SERVER START
app.listen(3000, () => {
  console.log("HTTP server listening at localhost:3000");
});

```
</details>

##### Check for Understanding

What should we expect to see rendered in the browser window?

> You should see our burgers when you use Postman to request the http://localhost:3000/api/burgers URL. You could also try using curl: curl -X GET http://localhost:3000/api/burgers or just your browser.

## Add our first additional route

We're building a quotes app; therefore, we need to have a route that displays quotes on a page. One way to accomplish that is to use `response.send()` to send back HTML.

```js
app.get('/quotes', (request, response) => {
  response.send('<html><body><h1>A page of Quotes!</h1></body></html>');
});
```

Suppose we wanted to send back JSON data, for example, instead of just plain text. We would add `.json` onto the path to make clear the route responds with JSON, and use `response.json()` to send back JSON.


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

## 🚀 Independent Practice :: Quotes Lab

Catch up in `quotes-begin`.
- Within `quotes-begin`, run `npm install` to install the dependencies.
- In `server.js`, add a route for GETting `/quotes.json` that sends back the data in `./db/quotes-data.js`.
- Also, what file do we need to include to ignore node_modules and not push it to GitHub? Don't forget to include it.

## Parameterized URLs

What if we want to create an app that can dynamically say hello to anyone?

**URL parameters** let us add dynamic routes to the application. In Express, parameters in a URL are indicated by a colon `:` and any variable name you want to use. We'll use `:name` for the example below.

```js
app.get("/greetings/:name", (request, response) => {
  response.send( "Hello, " + request.params.name );
});
```

In the route above, `:name` is considered a route or URL parameter. Inside the route's callback, the parameter is accessible with `request.params.name`.

| Request Type | Request Path | Response
| :--- | :--- | :--- |
| `GET` | `/greetings/:name` | `Hello, :name` |

<details>

<summary>What URL would you visit to see the results of the route above? Can you make the site say hello with your name?</summary>

Reset your server and go to [http://localhost:3000/greetings/jane](http://localhost:3000/greetings/jane), but use your name instead if it's not Jane!

</details>

## 🚀 Independent Practice :: Pick A Color

Create a route that responds with "You picked: blue" or "You picked: green" depending on a parameter in its path. For instance, if I visit `localhost:3000/pick-a-color/orange` in the browser, I should see the name of the color I chose (orange) as the response.

<details>

<summary>Click for answer</summary>

```js
// server.js
// Pick A Color Route
app.get('/color/:choice', (request, response) => {
  let choice = request.params.choice;
  response.send('Your color is: ' + choice);
});
```

</details>

#### Back to the Quotes

Now, what if we only want information about _one_ quote, though? We can do that using parameters, or params.

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
    data: requestedQuote
  });
});
```

This returns the quote object from my quotes array where the id of the object matches the ID that's been passed in the params.

## 🚀 Independent Practice :: Quotes cont'd...

Catch up in `quotes-begin`.

- In `server.js`, add a route for GETting `quotes/:id`, where `:id` is a number passed in from the server. The app should send back data about one quote with that particular ID.

### Query String Parameters

When you want even more flexibility, **query string parameters** can be included with each request.

Let's see query params in action. Go to [https://google.com/search?q=kittens&tbm=isch](https://google.com/search?q=kittens&tbm=isch).


#### Query String Review

* `?` marks the beginning of the query parameters.
* `=` indicates a key-value-pair assignment; the text to the left is a key, while the right is its value.
* `&` allows for multiple parameters; it separates the key-value pairs.
* `tbm=isch` means `to be matched` = `image search`

#### Query Parameters in Express

In Express, query string parameters are available in the `request.query` object. Let's add our first route to practice query params.

```js
app.get("/thank", (request, response) => {
  console.log(request.query);
  let name = request.query.name;
  response.send('Thank you, ' + name + '!');
});
```
#### Check for Understanding

<details>

<summary>What URL would you visit to see the results of the route above? Can you make the site say thank you with your name?</summary>

Reset your server and go to [localhost:3000/thank?name=jane](localhost:3000/thank?name=jane), but use your name instead, if it's not Jane!

Check the Terminal to see `{ name: 'jane' }` returned in the command line.

</details>

## 🚀 Independent Practice :: Calculator App

1. Create a `/multiply` route that uses query parameters `x` and `y` to multiply two numbers and send the result back: `"25 is the result"`.


  <details>
  
  <summary>Click for the route:</summary>

  ```js
  // server.js

  app.get('/multiply', (request, response) => {
    let x = request.query.x;
    let y = request.query.y;
    let total = parseInt(x) * parseInt(y);
    response.send( `${total} is the result`);
  });
  ```

  </details>

But what would you type in the browser window? Reset your server and go to [localhost:3000/thank](localhost:3000/multiply?x=5&y=5)

2.  Create an `/add` route, similar to above.

  <details>
  
  <summary>click for answer</summary>

  ```js
  // server.js

app.get('/add', (request, response) => {
  let x = request.query.x;
  let y = request.query.y;
  let total = parseInt(x) + parseInt(y);
  response.send( `${total} is the result`);
});
  ```

  </details>

### Choosing Parameter Types

* **request url parameters:** `http://localhost:3000/icecream/:flavor`

* **query string parameters:** `http://localhost:3000/icecream?flavor=SOMEFLAVOR`

Generally, if the parameter is identifying an individual _entity_ or _resource_, you most likely want request/url parameters.  If it is an optional parameter for a route, you should use query string parameters.

Common cases for **Request URL Parameters**:
* **database/item IDs**            -  GET `/contacts/348`
* **major components of the app**  -  GET `/users/2a98cef`
* **expressing hierarchies**       -  GET `/departments/44/employees/2`

> Request params are not always nonsense IDs. Names can be used in some systems: `/departments/physics/employees/LutherRichard`

Common cases for **Query Parameters**:
* **searches**             -  GET `/?q=kittens`
* **optional selections**  -  GET `/calculator?lang=en`
* **pagination**           -  GET `/articles?start=1&num=10`
* **other limits**         -  GET `/posts?since=2015-11-29`

Of course, you might combine both in some cases: `/posts/33/comments?limit=50`


## Serving an index page (if time permits)

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
**Note:** `__dirname` returns the directory that the currently executing script is in.

Now we can add JavaScript to that HTML file to make requests to our backend.

## POST Route

Up until now, we've used the HTTP method `GET` to _retrieve_ data from web APIs - either third-party APIs or a few very simple ones we've created.  

_But what if we want to let our users store data?_

When one wants to store data - or **create new resources** on a server, the standard is to use `POST`.

```html
<body>
  <form method="POST" action="http://localhost:3000/quotes">
    <input id="quoteContent" name="content" type="text" />
    <input id="quoteAuthor" name="author" type="text" />
    <input id="quoteGenre" name="genre" type="text" />
    <input type="submit" />
  </form>
</body>
```

Either of those options requires an HTML view with a form.  You can also make HTTP requests with a GUI like Postman or a command line tool like `curl`. Specify `application/x-www-form-urlencoded` (or `-d` for `curl`) for easier compatability with our Express server.

#### Server-side `POST` Request Handling

In our Express server, we'll use `app.post` rather than `app.get` to handle `POST` requests.  This way, we can make two routes that use the same path.

In other words, **both the request type and request path must match for the server and client to communicate correctly**.

```js
// server.js
app.post('/quotes', quotesCreate(request, response) => {
  // save the posted data
});
```

### RESTful Routing Preview

Let's look at _some_ routes for a cities **resource**.  

| HTTP Verb | Route       | RESTful description | Purpose |
| :-------- | ----------- | ------------------- | --------------------|
| GET       | /api/quotes     | quotesIndex         | Listing all quotes. |
| GET       | /api/quotes/:id | quotesShow          | Details of one quote. |
| POST      | /api/quotes     | quotesCreate        | Create a new quote. |
| PUT/PATCH  | /api/quotes/:id     | quotesUpdate         | Update one quote. |
| DELETE       | /api/quotes/:id | quotesDestroy          | Delete one quote. |


**REST** is a convention for writing routes in a standard way to make it easier to work with **resources** across the web.  We'll talk more about this, as it's an important theme in modern API design.

## Intro to Middleware and `body-parser`

Middleware allows us to intercept the request and response before they're processed by their actual route handler.

POST requests don't use query parameters like GET requests do.  Instead, they submit data in the body of the request.  This looks similar on the client side (the data can still be sent as `data` in jQuery's `ajax` method).

On the server side, we'll use middleware called **body-parser** to help us parse and make use of data from the body of a request.

#### Setting Up `body-parser`

To add the `body-parser` middleware to your app:  

1. Install the `body-parser` module for the project:

  ```bash
  npm install body-parser
  ```

2. Require `body-parser` in your server file:

  ```js
  const bodyParser = require('body-parser');
  ```

3. Include the middleware in the app with `app.use`. (The url encoding is configuration). The app object registers middleware with the use method. The use method accepts a function as a parameter; this function is middleware.

  ```js
  app.use(bodyParser.urlencoded({ extended: false }));
  ```
When the app receives a request, this middleware will parse the request body as JSON and make it accessible from the request's body property.

#### Using `body-parser`

In any routes receiving `POST`ed data, access that data using `request.body`.

```js
app.post('/api/quotes', function quotesCreate(request, response) {
  let content = request.body.content;
  let author = request.body.author;
  let newQuote = { content: content, author: author };
  // if we have a quotes array in our app (pre-database):
  quotes.push(newQuote);
  response.json(quotes);
});
```

> Note: for most of our Express apps, we'll include `body-parser` as part of the _boilerplate_ of the app.

## 🚀 Independent Practice :: Candies Lab

Click [HERE](./lab/README.md) and follow the instructions.

## Closing Thoughts

* Use dynamic url parameters, like `/api/burgers/:index` and `/api/tacos/:index`, to request data about a specific resource. Access them on the server in the `request.params` object.
* Use query string parameters for dynamic requests to serve up dynamic responses. Access them on the server in the `request.query` object.
* Use `POST` with named form inputs to send data to our Express servers, and use `body-parser` to access that data as part of the `request.body` object.

This will be essential knowledge for building and interacting with applications that contain multiple resources.  

We'll use `PUT` or `PATCH` to send data to update item information on the server side (instead of `POST`), and we'll use `DELETE` to delete items on the server side.

## Additional Resources

0. [In-depth HTTP Intro](http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177)
1. [Starting an Express Project](http://expressjs.com/starter/installing.html)
2. [Express Hello World](http://expressjs.com/starter/hello-world.html)
3. [Express Basic Routing](http://expressjs.com/starter/basic-routing.html)
