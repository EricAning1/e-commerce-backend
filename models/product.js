const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter product name'],
    maxLength: [100, 'name cannot exceed 50 characters'],
  },

  price: {
    type: Number,
    maxLength: [5, 'price cannot exceed 5 characters'],
    required: [true, 'please enter product price'],
    default: 0.0,
  },

  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'please select category'],
    enum: {
      values: ['Electronics', 'Food', 'Accessories'],
    },
  },
  seller: {
    type: String,
    required: [true, 'please enter product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'please enter product stock'],
    maxLength: [5, 'stock cannot exceed 5 characters'],
    default: 0,
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
