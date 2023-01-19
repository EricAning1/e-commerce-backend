const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');
const cors = require('cors');
const db = mongoose.connection;
const productData = require('./utilities/data');
const productController = require('./controllers/product');

// Environmental Varibles
const app = express();
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

// Connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true }, () =>
  console.log('MongoDB connection established')
);

// Error / Disconnection
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')); // need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors());

// Routes
app.use('/product', productController); // telling server.js to get the routes from controllers/todos.js

// Seeding the db
app.get('/seed', async (req, res) => {
  await Product.deleteMany({});
  await Product.insertMany(productData);
  res.send('done!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});
