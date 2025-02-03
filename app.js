const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/urlModel');
const app = express();
const PORT = 10000;
var cors = require('cors');
const MONGOURL = 'mongodb+srv://azevedodeveloper:ffHiNF2w5Jd1vzgy@clustershortener.x6bgr.mongodb.net/?retryWrites=true&w=majority&appName=clusterShortener'
const CUSTOM_DOMAIN = "http://localhost:10000";

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
    const url = await Url.findOne({ shortUrl }); // Use findOne para obter um único objeto

    if (!url) {
      return res.status(404).send('URL not found');
    }

    url.clicks++;
    await url.save(); // Use await para garantir que a atualização seja salva

    res.redirect(url.fullUrl);
  } catch (error) {
    res.status(500).send('URL not found');
  }
});

app.post('/shorten', cors(), async (req, res) => {
  try {
    const url = new Url({ fullUrl: req.body.fullUrl });
    await url.save();

    // Retorna a URL encurtada com o domínio personalizado
    res.json({ shortUrl: `${CUSTOM_DOMAIN}/${url.shortUrl}` });
  } catch (error) {
    res.status(500).send(`Invalid URL: ${req.body.fullUrl} ${error}`);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port ${process.env.PORT || PORT}...`);
});