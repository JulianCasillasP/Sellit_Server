const mongoose = require('mongoose');

const articleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['clothes', 'shoes', 'jewels', 'electronics'], required: true },
  imageUrl: { type: String } 
});

module.exports = mongoose.model('Article', articleSchema);