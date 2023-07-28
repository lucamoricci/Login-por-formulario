const mongoose = require('mongoose');
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnails: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

