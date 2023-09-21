const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Orden' }],
  isAdmin: { type: Boolean, default: false },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  articleCategories: [{ type: String, enum: ['clothes', 'shoes', 'jewels', 'electronics'] }],
});

const User = model("User", userSchema);

module.exports = User;
