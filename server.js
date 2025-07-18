const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Quote = require('./models/Quote')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

app.get('/', (req, res) => {
    res.render('/quotes');
});

// ROUTES HERE (next step)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
