const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');

const app = express();

// Use the body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://subho:subho2001@cluster0.1cyicwj.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Use the productsRoutes for all product-related endpoints
app.use('/', productsRoutes);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});