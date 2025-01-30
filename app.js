const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/urlModel');
const app = express();
const PORT = 10000;
var cors = require('cors');
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

app.use(cors({
  origin: 'http://localhost:3000', // Altere para a URL do seu front-end
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

// Middleware for handling JSON, URL-encoded data, and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));

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

app.post('/shorten', cors(), async (req, res) => {
  try {
    const url = new Url({ fullUrl: req.body.fullUrl });
    await url.save();
    res.json({ message: "URL encurtada com sucesso!" });
  } catch (error) {
    res.status(500).send(`Invalid URL: ${req.body.fullUrl}`);
  }
});

// start the server and listen on PORT 7000
app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port ${PORT}...`);
});