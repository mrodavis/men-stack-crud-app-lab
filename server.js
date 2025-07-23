const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const app = express();



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// Import the quote model
const Quote = require('./models/quote.js');

// adding middleware for app
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, "public")));

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get('/quotes', async (req, res) => {
    const allQuotes = await Quote.find({});
    console.log(allQuotes);
    res.render('quotes/index.ejs', { quotes: allQuotes});
});

// GET /quotes/new
app.get('/quotes/new', (req, res) => {
    res.render('quotes/new.ejs');
});

app.get("/quotes/:quoteId", async (req, res) => {
  const foundQuote = await Quote.findById(req.params.quoteId);
  res.render("quote/show.ejs", { quote: foundQuote });
});


// POST /quotes
app.post('/quotes', async (req, res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
  res.redirect("/quotes/");
});

// DELETE
app.delete("/quotes/:quoteId", async (req, res) => {
  await Quote.findByIdAndDelete(req.params.quoteId);
  res.redirect("/quotes");
});

app.get("/quotes/:quoteId/edit", async (req, res) => {
  const foundQuote = await Quote.findById(req.params.fruitId);
  res.render("quotes/edit.ejs", {
    quote: foundQuote,
  });
});

// server.js

app.put("/quotes/:quoteId", async (req, res) => {
  // Handle the 'isReadyToEat' checkbox data
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  
  // Update the fruit in the database
  await Quote.findByIdAndUpdate(req.params.quoteId, req.body);

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/quotes/${req.params.quoteId}`);
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});