const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  profileImage: { type: String }, 
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
});

const User = model("User", userSchema);

module.exports = User;