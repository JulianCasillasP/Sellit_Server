const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  condition: {
    type: String,
    enum: ["new", "like new", "used"],
    required: true,
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: {
    type: String,
    enum: ["clothes", "shoes", "jewels", "electronics"],
    required: true,
  },
  image: [String],
});

module.exports = mongoose.model("Article", articleSchema);
