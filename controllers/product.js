const express = require('express');
const Product = require('../models/product.js');
const router = express.Router();

// Remember INDUCES

// Index
router.get('/', (req, res) => {
  Product.find({}, (err, foundProduct) => {
    res.json(foundProduct);
  });
});
// New - Will be handled by React application
// Delete
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
    res.json(deletedProduct);
  });
});
// Update
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, UpdatedProduct) => {
      res.json(UpdatedProduct);
    }
  );
});
// Create
router.post('/', (req, res) => {
  Product.create(req.body, (err, createdProduct) => {
    res.json(createdProduct); //.json() will send proper headers in response so client knows it's json coming back
  });
});
// Edit - Will be handled by React application
// Show
router.get('/:id', (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.json(foundProduct);
  });
});

module.exports = router;
