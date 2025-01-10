const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/urlModel');
const app = express();
const PORT = 7000;
const MONGOURL = 'mongodb+srv://azevedodeveloper:ffHiNF2w5Jd1vzgy@clustershortener.x6bgr.mongodb.net/?retryWrites=true&w=majority&appName=clusterShortener'

//Function to connect to the MongoDB Atlas Database
const connectDB = async () => {
  try {
    // mongoDB connection string
    await mongoose.connect(process.env.MONGO_URI || MONGOURL);
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// Execute the connection to mongoDB
connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for handling JSON, URL-encoded data, and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const urls = await Url.find();
    res.render('index', { urls });
  } catch (error) {
    res.status(500).send('Interval server error')
  }
});

app.get('/:shortUrl', async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const url = await Url.find({ shortUrl })
    if (!url) {
      return res.status(400).send('URL not found');
    }
    // Increment the click count and save the updated URL
    url.clicks++;
    url.save();
    res.redirect(url.fullUrl);
  } catch (error) {
    res.status(500).send('URL not found');
  }
});

app.post('/shorten', async (req, res) => {
  try {
    const url = new Url({ fullUrl: req.body.fullUrl });
    await url.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Invalid URL');
  }
});

// start the server and listen on PORT 7000
app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port ${PORT}...`);
});